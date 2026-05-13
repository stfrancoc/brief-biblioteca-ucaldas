import { Request, Response, NextFunction } from 'express';
import { SolicitarPrestamoUseCase } from '../../core/use-cases/SolicitarPrestamoUseCase';
import { DevolverLibroUseCase } from '../../core/use-cases/DevolverLibroUseCase';
import { RenovarPrestamoUseCase } from '../../core/use-cases/RenovarPrestamoUseCase';

export class PrestamoController {
  constructor(
    private solicitarUseCase: SolicitarPrestamoUseCase,
    private devolverUseCase: DevolverLibroUseCase,
    private renovarUseCase: RenovarPrestamoUseCase
  ) {}

  async solicitar(req: Request, res: Response, next: NextFunction) {
    try {
      const { estudianteId, ejemplarId } = req.body;
      if (!estudianteId || !ejemplarId) {
        return res.status(400).json({ error: 'estudianteId y ejemplarId son obligatorios' });
      }
      const prestamo = await this.solicitarUseCase.execute(estudianteId, ejemplarId);
      res.status(201).json(prestamo);
    } catch (error) {
      next(error);
    }
  }

  async devolver(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { fechaDevolucionReal } = req.body;
      const result = await this.devolverUseCase.execute(id, fechaDevolucionReal ? new Date(fechaDevolucionReal) : new Date());
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async renovar(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const prestamo = await this.renovarUseCase.execute(id);
      res.status(200).json(prestamo);
    } catch (error) {
      next(error);
    }
  }
}
