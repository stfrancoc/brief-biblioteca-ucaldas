import { Ejemplar } from '../entities/Ejemplar';

export interface IEjemplarRepository {
  findById(id: string): Promise<Ejemplar | null>;
  findByLibroId(libroId: string): Promise<Ejemplar[]>;
  save(ejemplar: Ejemplar): Promise<void>;
  update(ejemplar: Ejemplar): Promise<void>;
}
