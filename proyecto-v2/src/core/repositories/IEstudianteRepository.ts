import { Estudiante } from '../entities/Estudiante';

export interface IEstudianteRepository {
  findById(id: string): Promise<Estudiante | null>;
  findByCodigoUnico(codigoUnico: string): Promise<Estudiante | null>;
  save(estudiante: Estudiante): Promise<void>;
  update(estudiante: Estudiante): Promise<void>;
  findAll(): Promise<Estudiante[]>;
}
