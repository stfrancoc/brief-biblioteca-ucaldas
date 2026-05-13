import { IPrestamoRepository } from '../../core/repositories/IPrestamoRepository';
import { Prestamo, EstadoPrestamo } from '../../core/entities/Prestamo';
import { InMemoryDatabase } from './InMemoryDatabase';

export class InMemoryPrestamoRepository implements IPrestamoRepository {
  private db = InMemoryDatabase.getInstance();

  async findById(id: string): Promise<Prestamo | null> {
    return this.db.prestamos.get(id) || null;
  }

  async findActivosByEstudianteId(estudianteId: string): Promise<Prestamo[]> {
    return Array.from(this.db.prestamos.values()).filter(
      (p) => p.estudianteId === estudianteId && p.estado === EstadoPrestamo.ACTIVO
    );
  }

  async findVencidos(): Promise<Prestamo[]> {
    const now = new Date();
    return Array.from(this.db.prestamos.values()).filter(
      (p) => p.estado === EstadoPrestamo.ACTIVO && p.fechaDevolucionEsperada < now
    );
  }

  async save(prestamo: Prestamo): Promise<void> {
    this.db.prestamos.set(prestamo.id, prestamo);
  }

  async update(prestamo: Prestamo): Promise<void> {
    this.db.prestamos.set(prestamo.id, prestamo);
  }

  async findAll(): Promise<Prestamo[]> {
    return Array.from(this.db.prestamos.values());
  }
}
