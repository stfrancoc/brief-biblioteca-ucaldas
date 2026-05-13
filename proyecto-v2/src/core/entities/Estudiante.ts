export enum TipoEstudiante {
  PREGRADO = 'PREGRADO',
  POSGRADO = 'POSGRADO'
}

export interface Estudiante {
  id: string;
  codigoUnico: string;
  nombre: string;
  programaAcademico: string;
  semestre: number;
  tipo: TipoEstudiante;
  saldoMultas: number;
}
