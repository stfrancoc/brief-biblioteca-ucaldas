import { IEjemplarRepository } from '../../core/repositories/IEjemplarRepository';
import { Ejemplar } from '../../core/entities/Ejemplar';
import { InMemoryDatabase } from './InMemoryDatabase';

export class InMemoryEjemplarRepository implements IEjemplarRepository {
  private db = InMemoryDatabase.getInstance();

  async findById(id: string): Promise<Ejemplar | null> {
    return this.db.ejemplares.get(id) || null;
  }

  async findByLibroId(libroId: string): Promise<Ejemplar[]> {
    return Array.from(this.db.ejemplares.values()).filter(e => e.libroId === libroId);
  }

  async save(ejemplar: Ejemplar): Promise<void> {
    this.db.ejemplares.set(ejemplar.id, ejemplar);
  }

  async update(ejemplar: Ejemplar): Promise<void> {
    this.db.ejemplares.set(ejemplar.id, ejemplar);
  }
}
