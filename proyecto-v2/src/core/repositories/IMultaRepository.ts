import { Multa } from '../entities/Multa';

export interface IMultaRepository {
  findById(id: string): Promise<Multa | null>;
  findByPrestamoId(prestamoId: string): Promise<Multa | null>;
  save(multa: Multa): Promise<void>;
  update(multa: Multa): Promise<void>;
}
