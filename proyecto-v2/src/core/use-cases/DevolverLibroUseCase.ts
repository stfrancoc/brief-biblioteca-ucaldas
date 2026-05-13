import { IPrestamoRepository } from '../repositories/IPrestamoRepository';
import { IEstudianteRepository } from '../repositories/IEstudianteRepository';
import { IEjemplarRepository } from '../repositories/IEjemplarRepository';
import { IMultaRepository } from '../repositories/IMultaRepository';
import { EstadoPrestamo } from '../entities/Prestamo';
import { EstadoEjemplar } from '../entities/Ejemplar';
import { EstadoMulta, Multa } from '../entities/Multa';
import { PrestamoNoEncontradoError } from '../errors/DomainErrors';
import { v4 as uuidv4 } from 'uuid';

export class DevolverLibroUseCase {
  constructor(
    private prestamoRepo: IPrestamoRepository,
    private estudianteRepo: IEstudianteRepository,
    private ejemplarRepo: IEjemplarRepository,
    private multaRepo: IMultaRepository
  ) {}

  async execute(prestamoId: string, fechaDevolucionReal: Date): Promise<any> {
    const prestamo = await this.prestamoRepo.findById(prestamoId);
    if (!prestamo || prestamo.estado === EstadoPrestamo.DEVUELTO) {
      throw new PrestamoNoEncontradoError();
    }

    const estudiante = await this.estudianteRepo.findById(prestamo.estudianteId);
    const ejemplar = await this.ejemplarRepo.findById(prestamo.ejemplarId);

    // Actualizar préstamo
    prestamo.fechaDevolucionReal = fechaDevolucionReal;
    prestamo.estado = EstadoPrestamo.DEVUELTO;
    await this.prestamoRepo.update(prestamo);

    // Liberar ejemplar
    if (ejemplar) {
      ejemplar.estado = EstadoEjemplar.DISPONIBLE;
      await this.ejemplarRepo.update(ejemplar);
    }

    // RN6: Cálculo de multa
    let multaGenerada = null;
    if (fechaDevolucionReal > prestamo.fechaDevolucionEsperada) {
      const diffTime = Math.abs(fechaDevolucionReal.getTime() - prestamo.fechaDevolucionEsperada.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const montoMulta = diffDays * 2000;

      multaGenerada = {
        id: uuidv4(),
        prestamoId: prestamo.id,
        monto: montoMulta,
        estado: EstadoMulta.PENDIENTE
      };

      await this.multaRepo.save(multaGenerada);

      // Actualizar saldo del estudiante
      if (estudiante) {
        estudiante.saldoMultas += montoMulta;
        await this.estudianteRepo.update(estudiante);
      }
    }

    return {
      prestamo,
      multa: multaGenerada
    };
  }
}
