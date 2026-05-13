import { IEstudianteRepository } from '../../core/repositories/IEstudianteRepository';
import { Estudiante } from '../../core/entities/Estudiante';
import { InMemoryDatabase } from './InMemoryDatabase';

export class InMemoryEstudianteRepository implements IEstudianteRepository {
  private db = InMemoryDatabase.getInstance();

  async findById(id: string): Promise<Estudiante | null> {
    return this.db.estudiantes.get(id) || null;
  }

  async findByCodigoUnico(codigoUnico: string): Promise<Estudiante | null> {
    return Array.from(this.db.estudiantes.values()).find(e => e.codigoUnico === codigoUnico) || null;
  }

  async save(estudiante: Estudiante): Promise<void> {
    this.db.estudiantes.set(estudiante.id, estudiante);
  }

  async update(estudiante: Estudiante): Promise<void> {
    this.db.estudiantes.set(estudiante.id, estudiante);
  }

  async findAll(): Promise<Estudiante[]> {
    return Array.from(this.db.estudiantes.values());
  }
}
