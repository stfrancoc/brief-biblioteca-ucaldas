import { IPrestamoRepository } from '../repositories/IPrestamoRepository';
import { IEstudianteRepository } from '../repositories/IEstudianteRepository';
import { IEjemplarRepository } from '../repositories/IEjemplarRepository';
import { ILibroRepository } from '../repositories/ILibroRepository';
import { Prestamo, EstadoPrestamo } from '../entities/Prestamo';
import { EstadoEjemplar } from '../entities/Ejemplar';
import { TipoEstudiante } from '../entities/Estudiante';
import { 
  EstudianteNoEncontradoError, 
  EjemplarNoEncontradoError, 
  EjemplarNoDisponibleError, 
  LimitePrestamosExcedidoError, 
  EstudianteBloqueadoError 
} from '../errors/DomainErrors';
import { v4 as uuidv4 } from 'uuid';

export class SolicitarPrestamoUseCase {
  constructor(
    private prestamoRepo: IPrestamoRepository,
    private estudianteRepo: IEstudianteRepository,
    private ejemplarRepo: IEjemplarRepository,
    private libroRepo: ILibroRepository
  ) {}

  async execute(estudianteId: string, ejemplarId: string): Promise<Prestamo> {
    const estudiante = await this.estudianteRepo.findById(estudianteId);
    if (!estudiante) throw new EstudianteNoEncontradoError();

    const ejemplar = await this.ejemplarRepo.findById(ejemplarId);
    if (!ejemplar) throw new EjemplarNoEncontradoError();

    const libro = await this.libroRepo.findById(ejemplar.libroId);

    // RN5: Disponibilidad del ejemplar
    if (ejemplar.estado !== EstadoEjemplar.DISPONIBLE) {
      throw new EjemplarNoDisponibleError();
    }

    // RN2: Bloqueo por multas o mora
    const prestamosVencidos = await this.prestamoRepo.findVencidos();
    const tieneMora = prestamosVencidos.some(p => p.estudianteId === estudianteId);
    if (tieneMora || estudiante.saldoMultas > 0) {
      throw new EstudianteBloqueadoError('El estudiante tiene préstamos vencidos o multas pendientes.');
    }

    // RN1: Límites de préstamos
    const prestamosActivos = await this.prestamoRepo.findActivosByEstudianteId(estudianteId);
    const limite = estudiante.tipo === TipoEstudiante.PREGRADO ? 3 : 5;
    if (prestamosActivos.length >= limite) {
      throw new LimitePrestamosExcedidoError(limite, prestamosActivos.length);
    }

    // RN3: Plazo de préstamo
    const diasPlazo = libro?.esAltaDemanda ? 3 : 15;
    const fechaPrestamo = new Date();
    const fechaDevolucionEsperada = new Date();
    fechaDevolucionEsperada.setDate(fechaPrestamo.getDate() + diasPlazo);

    const nuevoPrestamo: Prestamo = {
      id: uuidv4(),
      estudianteId,
      ejemplarId,
      fechaPrestamo,
      fechaDevolucionEsperada,
      estado: EstadoPrestamo.ACTIVO,
      renovaciones: 0
    };

    // Persistir cambios
    await this.prestamoRepo.save(nuevoPrestamo);
    
    ejemplar.estado = EstadoEjemplar.PRESTADO;
    await this.ejemplarRepo.update(ejemplar);

    return nuevoPrestamo;
  }
}
