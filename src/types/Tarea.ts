export enum Estados {
  Pendiente = 1 << 0, // 001
  Hecho = 1 << 1, // 010
}

export enum FiltroTarea {
  Ninguno = 0,
  Pendiente = 1 << 0,
  Hecho = 1 << 1,
  Todos = ~(~0 << 2),
}

export interface Tarea {
  estado: Estados;
  descripcion: string;
  id: string;
}

export type ListaTarea = Tarea[];

export interface EstadoLista {
  lista: ListaTarea;
  filtro: FiltroTarea;
  marcador: Estados;
}
