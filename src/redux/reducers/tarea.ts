import { Acciones } from "../actions";
import { IdsAcciones } from "../actionTypes";
import { EstadoLista, Estados } from "../../types/Tarea";
import { merge } from "remeda";
import { v1 as uuid } from "uuid";
import {
  agregarTarea,
  actualizarEstado,
  actualizarDescripcion,
  moverTarea,
  eliminarFinalizadas,
  eliminarTarea,
  marcarTodas,
} from "../../state/Tarea";

const init: EstadoLista = {
  filtro: Estados.Hecho | Estados.Pendiente,
  lista: [],
  marcador: Estados.Pendiente,
};

export default (estado = init, accion: Acciones.Tareas): EstadoLista => {
  switch (accion.type) {
    case IdsAcciones.TAREAS_AGREGAR:
      return merge(estado, {
        lista: agregarTarea(estado.lista, uuid(), accion.contenido.descripcion),
      });
    case IdsAcciones.TAREAS_FILTRAR:
      return merge(estado, { filtro: accion.contenido.filtro });
    case IdsAcciones.TAREAS_MARCAR_TODAS:
      return merge(estado, {
        marcador: accion.contenido.estado,
        lista: marcarTodas(estado.lista, accion.contenido.estado),
      });
    case IdsAcciones.TAREA_CAMBIAR_ESTADO: {
      let lista = actualizarEstado(estado.lista, accion.contenido.tarea);
      return merge(estado, {
        lista,
        marcador: lista.every((tarea) => tarea.estado === Estados.Pendiente)
          ? Estados.Pendiente
          : lista.every((tarea) => tarea.estado === Estados.Hecho)
          ? Estados.Hecho
          : estado.marcador,
      });
    }
    case IdsAcciones.TAREA_EDITAR:
      return merge(estado, {
        lista: actualizarDescripcion(
          estado.lista,
          accion.contenido.tarea,
          accion.contenido.descripcion
        ),
      });
    case IdsAcciones.TAREAS_ELIMINAR_FINALIZADAS: {
      const lista = eliminarFinalizadas(estado.lista);
      return merge(estado, {
        lista,
        marcador: lista.length === 0 ? Estados.Pendiente : estado.marcador,
      });
    }
    case IdsAcciones.TAREA_ELIMINAR:
      const lista = eliminarTarea(estado.lista, accion.contenido.tarea);
      return merge(estado, {
        lista,
        marcador: lista.length === 0 ? Estados.Pendiente : estado.marcador,
      });
    case IdsAcciones.TAREA_MOVER:
      return merge(estado, {
        lista: moverTarea(
          estado.lista,
          accion.contenido.tarea,
          accion.contenido.posicion
        ),
      });
    default:
      return estado;
  }
};
