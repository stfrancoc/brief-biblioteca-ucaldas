import { Request, Response, NextFunction } from 'express';
import { ConsultarHistorialUseCase } from '../../core/use-cases/ConsultarHistorialUseCase';
import { PagarMultaUseCase } from '../../core/use-cases/PagarMultaUseCase';

export class EstudianteController {
  constructor(
    private historialUseCase: ConsultarHistorialUseCase,
    private pagarMultaUseCase: PagarMultaUseCase
  ) {}

  async consultarHistorial(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const historial = await this.historialUseCase.execute(id);
      res.status(200).json(historial);
    } catch (error) {
      next(error);
    }
  }

  async pagarMultas(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await this.pagarMultaUseCase.execute(id);
      res.status(200).json({ message: 'Multas pagadas correctamente. Estudiante habilitado para préstamos.' });
    } catch (error) {
      next(error);
    }
  }
}
