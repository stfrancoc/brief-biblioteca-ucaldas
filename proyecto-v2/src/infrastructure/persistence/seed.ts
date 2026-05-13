import { v4 as uuidv4 } from 'uuid';
import { InMemoryDatabase } from './InMemoryDatabase';
import { TipoEstudiante } from '../../core/entities/Estudiante';
import { EstadoEjemplar } from '../../core/entities/Ejemplar';
import { EstadoPrestamo } from '../../core/entities/Prestamo';

export function seedData() {
  const db = InMemoryDatabase.getInstance();
  db.clear();

  // --- ESTUDIANTES ---
  const estudianteLimpio = {
    id: uuidv4(),
    codigoUnico: 'PRE-001',
    nombre: 'Juan Perez',
    programaAcademico: 'Ingeniería de Sistemas',
    semestre: 5,
    tipo: TipoEstudiante.PREGRADO,
    saldoMultas: 0
  };

  const estudianteFull = {
    id: uuidv4(),
    codigoUnico: 'POS-001',
    nombre: 'Maria Garcia',
    programaAcademico: 'Maestría en IA',
    semestre: 2,
    tipo: TipoEstudiante.POSGRADO,
    saldoMultas: 0
  };

  const estudianteDeuda = {
    id: uuidv4(),
    codigoUnico: 'PRE-002',
    nombre: 'Pedro Lopez',
    programaAcademico: 'Derecho',
    semestre: 8,
    tipo: TipoEstudiante.PREGRADO,
    saldoMultas: 5000
  };

  db.estudiantes.set(estudianteLimpio.id, estudianteLimpio);
  db.estudiantes.set(estudianteFull.id, estudianteFull);
  db.estudiantes.set(estudianteDeuda.id, estudianteDeuda);

  // --- LIBROS Y EJEMPLARES ---
  const librosData = [
    { titulo: 'Clean Code', autor: 'Robert C. Martin', inventario: 'LIB-001', alta: false, copias: 2 },
    { titulo: 'Design Patterns', autor: 'Gang of Four', inventario: 'LIB-002', alta: false, copias: 2 },
    { titulo: 'The Pragmatic Programmer', autor: 'Andrew Hunt', inventario: 'LIB-003', alta: false, copias: 2 },
    { titulo: 'Cracking the Coding Interview', autor: 'Gayle Laakmann', inventario: 'LIB-004', alta: true, copias: 1 },
    { titulo: 'Domain-Driven Design', autor: 'Eric Evans', inventario: 'LIB-005', alta: true, copias: 1 },
  ];

  librosData.forEach(l => {
    const libroId = uuidv4();
    db.libros.set(libroId, {
      id: libroId,
      codigoInventario: l.inventario,
      titulo: l.titulo,
      autor: l.autor,
      sala: 'Sala General',
      esAltaDemanda: l.alta
    });

    for (let i = 0; i < l.copias; i++) {
      const ejemplarId = uuidv4();
      db.ejemplares.set(ejemplarId, {
        id: ejemplarId,
        libroId: libroId,
        estado: EstadoEjemplar.DISPONIBLE
      });
    }
  });

  // --- ESCENARIO: Estudiante de Posgrado con 5 préstamos ---
  // Vamos a tomar 5 ejemplares disponibles y asignarlos al estudianteFull
  const ejemplaresDisponibles = Array.from(db.ejemplares.values()).slice(0, 5);
  
  ejemplaresDisponibles.forEach(ej => {
    const prestamoId = uuidv4();
    const fechaPrestamo = new Date();
    const fechaDevolucion = new Date();
    fechaDevolucion.setDate(fechaPrestamo.getDate() + 15);

    db.prestamos.set(prestamoId, {
      id: prestamoId,
      estudianteId: estudianteFull.id,
      ejemplarId: ej.id,
      fechaPrestamo: fechaPrestamo,
      fechaDevolucionEsperada: fechaDevolucion,
      estado: EstadoPrestamo.ACTIVO,
      renovaciones: 0
    });

    // Cambiar estado del ejemplar a PRESTADO
    const ejemplar = db.ejemplares.get(ej.id)!;
    ejemplar.estado = EstadoEjemplar.PRESTADO;
  });

  console.log('Seed data initialized successfully.');
}
