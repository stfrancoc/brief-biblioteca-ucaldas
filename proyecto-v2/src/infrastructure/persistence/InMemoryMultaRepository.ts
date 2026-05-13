import { IMultaRepository } from '../../core/repositories/IMultaRepository';
import { Multa } from '../../core/entities/Multa';
import { InMemoryDatabase } from './InMemoryDatabase';

export class InMemoryMultaRepository implements IMultaRepository {
  private db = InMemoryDatabase.getInstance();

  async findById(id: string): Promise<Multa | null> {
    return this.db.multas.get(id) || null;
  }

  async findByPrestamoId(prestamoId: string): Promise<Multa | null> {
    return Array.from(this.db.multas.values()).find(m => m.prestamoId === prestamoId) || null;
  }

  async save(multa: Multa): Promise<void> {
    this.db.multas.set(multa.id, multa);
  }

  async update(multa: Multa): Promise<void> {
    this.db.multas.set(multa.id, multa);
  }
}
