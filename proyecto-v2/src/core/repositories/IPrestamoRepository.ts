import { Prestamo } from '../entities/Prestamo';

export interface IPrestamoRepository {
  findById(id: string): Promise<Prestamo | null>;
  findActivosByEstudianteId(estudianteId: string): Promise<Prestamo[]>;
  findVencidos(): Promise<Prestamo[]>;
  save(prestamo: Prestamo): Promise<void>;
  update(prestamo: Prestamo): Promise<void>;
  findAll(): Promise<Prestamo[]>;
}
