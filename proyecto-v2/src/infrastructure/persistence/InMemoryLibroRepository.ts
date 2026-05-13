import { ILibroRepository } from '../../core/repositories/ILibroRepository';
import { Libro } from '../../core/entities/Libro';
import { InMemoryDatabase } from './InMemoryDatabase';

export class InMemoryLibroRepository implements ILibroRepository {
  private db = InMemoryDatabase.getInstance();

  async findById(id: string): Promise<Libro | null> {
    return this.db.libros.get(id) || null;
  }

  async findByCodigoInventario(codigoInventario: string): Promise<Libro | null> {
    return Array.from(this.db.libros.values()).find(l => l.codigoInventario === codigoInventario) || null;
  }

  async findAll(): Promise<Libro[]> {
    return Array.from(this.db.libros.values());
  }

  async save(libro: Libro): Promise<void> {
    this.db.libros.set(libro.id, libro);
  }
}
