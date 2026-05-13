import { Estudiante } from '../../core/entities/Estudiante';
import { Libro } from '../../core/entities/Libro';
import { Ejemplar } from '../../core/entities/Ejemplar';
import { Prestamo } from '../../core/entities/Prestamo';
import { Multa } from '../../core/entities/Multa';

export class InMemoryDatabase {
  private static instance: InMemoryDatabase;
  
  public estudiantes: Map<string, Estudiante> = new Map();
  public libros: Map<string, Libro> = new Map();
  public ejemplares: Map<string, Ejemplar> = new Map();
  public prestamos: Map<string, Prestamo> = new Map();
  public multas: Map<string, Multa> = new Map();

  private constructor() {}

  public static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  public clear(): void {
    this.estudiantes.clear();
    this.libros.clear();
    this.ejemplares.clear();
    this.prestamos.clear();
    this.multas.clear();
  }
}
