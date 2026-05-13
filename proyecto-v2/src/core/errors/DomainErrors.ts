export class EstudianteNoEncontradoError extends Error {
  constructor() {
    super('Estudiante no encontrado');
    this.name = 'EstudianteNoEncontradoError';
  }
}

export class EjemplarNoDisponibleError extends Error {
  constructor() {
    super('El ejemplar no está disponible para préstamo');
    this.name = 'EjemplarNoDisponibleError';
  }
}

export class LimitePrestamosExcedidoError extends Error {
  constructor(public limite: number, public actuales: number) {
    super(`Límite de préstamos excedido (Límite: ${limite}, Actuales: ${actuales})`);
    this.name = 'LimitePrestamosExcedidoError';
  }
}

export class EstudianteBloqueadoError extends Error {
  constructor(public motivo: string) {
    super(`Estudiante bloqueado: ${motivo}`);
    this.name = 'EstudianteBloqueadoError';
  }
}

export class PrestamoNoEncontradoError extends Error {
  constructor() {
    super('Préstamo no encontrado');
    this.name = 'PrestamoNoEncontradoError';
  }
}

export class EjemplarNoEncontradoError extends Error {
  constructor() {
    super('Ejemplar no encontrado');
    this.name = 'EjemplarNoEncontradoError';
  }
}
