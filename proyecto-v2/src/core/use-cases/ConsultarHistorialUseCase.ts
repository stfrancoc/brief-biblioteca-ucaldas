import { IPrestamoRepository } from '../repositories/IPrestamoRepository';
import { IEstudianteRepository } from '../repositories/IEstudianteRepository';
import { EstudianteNoEncontradoError } from '../errors/DomainErrors';

export class ConsultarHistorialUseCase {
  constructor(
    private prestamoRepo: IPrestamoRepository,
    private estudianteRepo: IEstudianteRepository
  ) {}

  async execute(estudianteId: string): Promise<any> {
    const estudiante = await this.estudianteRepo.findById(estudianteId);
    if (!estudiante) throw new EstudianteNoEncontradoError();

    const prestamos = await this.prestamoRepo.findAll();
    const historial = prestamos.filter(p => p.estudianteId === estudianteId);

    return {
      estudiante,
      historial
    };
  }
}
