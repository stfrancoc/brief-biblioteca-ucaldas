export enum EstadoEjemplar {
  DISPONIBLE = 'DISPONIBLE',
  PRESTADO = 'PRESTADO'
}

export interface Ejemplar {
  id: string;
  libroId: string;
  estado: EstadoEjemplar;
}
