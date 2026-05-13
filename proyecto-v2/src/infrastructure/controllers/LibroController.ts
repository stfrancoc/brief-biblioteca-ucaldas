import { Request, Response, NextFunction } from 'express';
import { ILibroRepository } from '../../core/repositories/ILibroRepository';
import { IEjemplarRepository } from '../../core/repositories/IEjemplarRepository';

export class LibroController {
  constructor(
    private libroRepo: ILibroRepository,
    private ejemplarRepo: IEjemplarRepository
  ) {}

  async listarCatalogo(req: Request, res: Response, next: NextFunction) {
    try {
      const libros = await this.libroRepo.findAll();
      const catalogo = await Promise.all(libros.map(async (libro) => {
        const ejemplares = await this.ejemplarRepo.findByLibroId(libro.id);
        return {
          ...libro,
          ejemplares: ejemplares.map(e => ({ id: e.id, estado: e.estado }))
        };
      }));
      res.status(200).json(catalogo);
    } catch (error) {
      next(error);
    }
  }
}
