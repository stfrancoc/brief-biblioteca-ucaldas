import { IPrestamoRepository } from '../repositories/IPrestamoRepository';
import { ILibroRepository } from '../repositories/ILibroRepository';
import { IEjemplarRepository } from '../repositories/IEjemplarRepository';
import { EstadoPrestamo } from '../entities/Prestamo';
import { PrestamoNoEncontradoError, EstudianteBloqueadoError } from '../errors/DomainErrors';

export class RenovarPrestamoUseCase {
  constructor(
    private prestamoRepo: IPrestamoRepository,
    private ejemplarRepo: IEjemplarRepository,
    private libroRepo: ILibroRepository
  ) {}

  async execute(prestamoId: string): Promise<any> {
    const prestamo = await this.prestamoRepo.findById(prestamoId);
    if (!prestamo || prestamo.estado !== EstadoPrestamo.ACTIVO) {
      throw new PrestamoNoEncontradoError();
    }

    const ejemplar = await this.ejemplarRepo.findById(prestamo.ejemplarId);
    if (!ejemplar) throw new Error('Ejemplar no encontrado');

    const libro = await this.libroRepo.findById(ejemplar.libroId);

    // RN4: No renovar si es alta demanda
    if (libro?.esAltaDemanda) {
      throw new EstudianteBloqueadoError('No se permiten renovaciones para libros de alta demanda.');
    }

    // Calcular nueva fecha (extender por el plazo original)
    // En este sistema el plazo original se deduce del tipo de libro
    const diasExtension = 15; // Ya sabemos que no es alta demanda por el check anterior
    const nuevaFecha = new Date(prestamo.fechaDevolucionEsperada);
    nuevaFecha.setDate(nuevaFecha.getDate() + diasExtension);

    prestamo.fechaDevolucionEsperada = nuevaFecha;
    prestamo.renovaciones += 1;

    await this.prestamoRepo.update(prestamo);

    return prestamo;
  }
}
