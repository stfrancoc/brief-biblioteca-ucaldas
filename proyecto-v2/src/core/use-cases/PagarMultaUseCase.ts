import { IEstudianteRepository } from '../repositories/IEstudianteRepository';
import { EstudianteNoEncontradoError } from '../errors/DomainErrors';

export class PagarMultaUseCase {
  constructor(private estudianteRepo: IEstudianteRepository) {}

  async execute(estudianteId: string): Promise<void> {
    const estudiante = await this.estudianteRepo.findById(estudianteId);
    if (!estudiante) throw new EstudianteNoEncontradoError();

    estudiante.saldoMultas = 0;
    await this.estudianteRepo.update(estudiante);
  }
}
