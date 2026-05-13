import { SolicitarPrestamoUseCase } from '../../src/core/use-cases/SolicitarPrestamoUseCase';
import { DevolverLibroUseCase } from '../../src/core/use-cases/DevolverLibroUseCase';
import { InMemoryEstudianteRepository } from '../../src/infrastructure/persistence/InMemoryEstudianteRepository';
import { InMemoryPrestamoRepository } from '../../src/infrastructure/persistence/InMemoryPrestamoRepository';
import { InMemoryEjemplarRepository } from '../../src/infrastructure/persistence/InMemoryEjemplarRepository';
import { InMemoryLibroRepository } from '../../src/infrastructure/persistence/InMemoryLibroRepository';
import { InMemoryMultaRepository } from '../../src/infrastructure/persistence/InMemoryMultaRepository';
import { seedData } from '../../src/infrastructure/persistence/seed';
import { InMemoryDatabase } from '../../src/infrastructure/persistence/InMemoryDatabase';

describe('Flujo Completo de Préstamo y Devolución', () => {
  const estudianteRepo = new InMemoryEstudianteRepository();
  const prestamoRepo = new InMemoryPrestamoRepository();
  const ejemplarRepo = new InMemoryEjemplarRepository();
  const libroRepo = new InMemoryLibroRepository();
  const multaRepo = new InMemoryMultaRepository();

  const solicitarPrestamo = new SolicitarPrestamoUseCase(prestamoRepo, estudianteRepo, ejemplarRepo, libroRepo);
  const devolverLibro = new DevolverLibroUseCase(prestamoRepo, estudianteRepo, ejemplarRepo, multaRepo);

  beforeEach(() => {
    seedData();
  });

  it('debería permitir un préstamo, cobrar multa por retraso y bloquear nuevos préstamos hasta el pago', async () => {
    // 1. Obtener estudiante limpio
    const estudiantes = await estudianteRepo.findAll();
    const estudiante = estudiantes.find(e => e.codigoUnico === 'PRE-001')!;

    // 2. Obtener ejemplar disponible
    const libros = await libroRepo.findAll();
    const libroStandard = libros.find(l => !l.esAltaDemanda)!;
    const ejemplares = await ejemplarRepo.findByLibroId(libroStandard.id);
    const ejemplar = ejemplares[0];

    // 3. Realizar préstamo exitoso
    const prestamo = await solicitarPrestamo.execute(estudiante.id, ejemplar.id);
    expect(prestamo.estado).toBe('ACTIVO');

    // 4. Devolver con retraso (Simular fecha 5 días después de la esperada)
    const fechaReal = new Date(prestamo.fechaDevolucionEsperada);
    fechaReal.setDate(fechaReal.getDate() + 5); // 5 días de retraso

    const resultadoDevolucion = await devolverLibro.execute(prestamo.id, fechaReal);
    expect(resultadoDevolucion.multa).toBeDefined();
    expect(resultadoDevolucion.multa.monto).toBe(10000); // 5 días * 2000

    // 5. Verificar que el estudiante tiene saldo pendiente
    const estudianteActualizado = await estudianteRepo.findById(estudiante.id);
    expect(estudianteActualizado?.saldoMultas).toBe(10000);

    // 6. Intentar nuevo préstamo (Debería fallar por RN2)
    const otroLibro = libros.find(l => l.id !== libroStandard.id)!;
    const otrosEjemplares = await ejemplarRepo.findByLibroId(otroLibro.id);
    
    await expect(solicitarPrestamo.execute(estudiante.id, otrosEjemplares[0].id))
      .rejects.toThrow('Estudiante bloqueado');
  });
});
