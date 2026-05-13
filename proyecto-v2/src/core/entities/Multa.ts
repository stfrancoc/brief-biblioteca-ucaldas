export enum EstadoMulta {
  PENDIENTE = 'PENDIENTE',
  PAGADA = 'PAGADA'
}

export interface Multa {
  id: string;
  prestamoId: string;
  monto: number;
  fechaPago?: Date;
  estado: EstadoMulta;
}
