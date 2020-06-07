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
export type FiltroTarea = Estados;

export interface EstadoLista {
  lista: ListaTarea;
  filtro: FiltroTarea;
}
