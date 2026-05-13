import { Request, Response, NextFunction } from 'express';
import { 
  EstudianteNoEncontradoError, 
  EjemplarNoEncontradoError, 
  EjemplarNoDisponibleError, 
  LimitePrestamosExcedidoError, 
  EstudianteBloqueadoError,
  PrestamoNoEncontradoError
} from '../../core/errors/DomainErrors';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error]: ${err.name} - ${err.message}`);

  if (
    err instanceof EstudianteNoEncontradoError || 
    err instanceof EjemplarNoEncontradoError || 
    err instanceof PrestamoNoEncontradoError
  ) {
    return res.status(404).json({ error: err.name, message: err.message });
  }

  if (
    err instanceof LimitePrestamosExcedidoError || 
    err instanceof EstudianteBloqueadoError || 
    err instanceof EjemplarNoDisponibleError
  ) {
    return res.status(403).json({ error: err.name, message: err.message });
  }

  // Errores genéricos
  res.status(500).json({ 
    error: 'InternalServerError', 
    message: 'Ha ocurrido un error inesperado en el servidor.' 
  });
};
