import { Libro } from '../entities/Libro';

export interface ILibroRepository {
  findById(id: string): Promise<Libro | null>;
  findByCodigoInventario(codigoInventario: string): Promise<Libro | null>;
  findAll(): Promise<Libro[]>;
  save(libro: Libro): Promise<void>;
}
