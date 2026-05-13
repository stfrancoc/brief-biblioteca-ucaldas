export enum EstadoPrestamo {
  ACTIVO = 'ACTIVO',
  VENCIDO = 'VENCIDO',
  DEVUELTO = 'DEVUELTO'
}

export interface Prestamo {
  id: string;
  estudianteId: string;
  ejemplarId: string;
  fechaPrestamo: Date;
  fechaDevolucionEsperada: Date;
  fechaDevolucionReal?: Date;
  estado: EstadoPrestamo;
  renovaciones: number;
}
