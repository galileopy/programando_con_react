export enum Estados {
  Pendiente,
  Hecho,
}
export interface Tarea {
  estado: Estados;
  descripcion: String;
  id: number;
}

export type ListaTarea = Tarea[];
