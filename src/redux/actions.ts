import { IdsAcciones } from "./actionTypes";
import { FiltroTarea, Tarea, Estados } from "../types/Tarea";

export declare namespace Acciones {
  export interface AgregarTarea {
    type: typeof IdsAcciones.TAREAS_AGREGAR;
    contenido: { descripcion: string };
  }
  export interface MarcarTareas {
    type: typeof IdsAcciones.TAREAS_MARCAR_TODAS;
    contenido: { estado: Estados };
  }
  export interface FiltrarTareas {
    type: typeof IdsAcciones.TAREAS_FILTRAR;
    contenido: {
      filtro: FiltroTarea;
    };
  }
  export interface CambiarEstado {
    type: typeof IdsAcciones.TAREA_CAMBIAR_ESTADO;
    contenido: {
      tarea: Tarea;
    };
  }
  export interface EditarTarea {
    type: typeof IdsAcciones.TAREA_EDITAR;
    contenido: {
      tarea: Tarea;
      descripcion: string;
    };
  }
  export interface MoverTarea {
    type: typeof IdsAcciones.TAREA_MOVER;
    contenido: {
      tarea: Tarea;
      posicion: number;
    };
  }
  export interface EliminarTarea {
    type: typeof IdsAcciones.TAREA_ELIMINAR;
    contenido: {
      tarea: Tarea;
    };
  }
  export interface EliminarFinalizadas {
    type: typeof IdsAcciones.TAREAS_ELIMINAR_FINALIZADAS;
    contenido: null;
  }

  export type Tareas =
    | MoverTarea
    | EditarTarea
    | CambiarEstado
    | FiltrarTareas
    | MarcarTareas
    | AgregarTarea
    | EliminarFinalizadas
    | EliminarTarea;
}

const agregarTarea = (datos: {
  descripcion: string;
}): Acciones.AgregarTarea => ({
  type: IdsAcciones.TAREAS_AGREGAR,
  contenido: datos,
});
const marcarTodas = (datos: { estado: Estados }): Acciones.MarcarTareas => ({
  type: IdsAcciones.TAREAS_MARCAR_TODAS,
  contenido: datos,
});
const filtrarTareas = (datos: {
  filtro: FiltroTarea;
}): Acciones.FiltrarTareas => ({
  type: IdsAcciones.TAREAS_FILTRAR,
  contenido: datos,
});
const cambiarEstado = (datos: { tarea: Tarea }): Acciones.CambiarEstado => ({
  type: IdsAcciones.TAREA_CAMBIAR_ESTADO,
  contenido: datos,
});
const editarTarea = (datos: {
  tarea: Tarea;
  descripcion: string;
}): Acciones.EditarTarea => ({
  type: IdsAcciones.TAREA_EDITAR,
  contenido: datos,
});

const moverTarea = (datos: {
  tarea: Tarea;
  posicion: number;
}): Acciones.MoverTarea => ({
  type: IdsAcciones.TAREA_MOVER,
  contenido: datos,
});
const eliminarFinalizadas = (): Acciones.EliminarFinalizadas => ({
  type: IdsAcciones.TAREAS_ELIMINAR_FINALIZADAS,
  contenido: null,
});

const eliminarTarea = (datos: { tarea: Tarea }): Acciones.EliminarTarea => ({
  type: IdsAcciones.TAREA_ELIMINAR,
  contenido: datos,
});

export const Creadores = {
  agregarTarea,
  marcarTodas,
  filtrarTareas,
  cambiarEstado,
  editarTarea,
  moverTarea,
  eliminarTarea,
  eliminarFinalizadas,
};
