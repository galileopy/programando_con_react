import { Tarea, Estados, ListaTarea } from "../types/Tarea";
import {
  concat,
  merge,
  take,
  drop,
  flatten,
  findIndex,
  splitAt,
  reject,
} from "remeda";

const nuevaTarea = (
  id: string,
  descripcion: string,
  estado = Estados.Pendiente
): Tarea => ({
  id,
  descripcion,
  estado,
});

export const invertirEstado = (estado: Estados): Estados => {
  switch (estado) {
    case Estados.Pendiente:
      return Estados.Hecho;
    case Estados.Hecho:
      return Estados.Pendiente;
    default:
      throw new Error("Estado no es ninguno de los estados esperados");
  }
};

const cambiarDescripcion = (tarea: Tarea, descripcion: string): Tarea =>
  merge(tarea, { descripcion });

const mismoId = (t1: Tarea) => (t2: Tarea) => t1.id === t2.id;

const actualizarLista = (lista: ListaTarea, tarea: Tarea) => {
  const indice = findIndex(lista, mismoId(tarea));
  return flatten([take(lista, indice), [tarea], drop(lista, indice + 1)]);
};

export const agregarTarea = (
  lista: ListaTarea,
  id: string,
  descripcion: string
): ListaTarea => concat(lista, [nuevaTarea(id, descripcion)]);

export const actualizarDescripcion = (
  lista: ListaTarea,
  tarea: Tarea,
  descripcion: string
) => actualizarLista(lista, cambiarDescripcion(tarea, descripcion));

export const cambiarEstado = (tarea: Tarea): Tarea =>
  merge(tarea, { estado: invertirEstado(tarea.estado) });

export const actualizarEstado = (lista: ListaTarea, tarea: Tarea) =>
  actualizarLista(lista, cambiarEstado(tarea));

export const marcarTodas = (lista: ListaTarea, estado: Estados) =>
  lista.map((tarea) => merge(tarea, { estado }));

export const comprobarEstados = (lista: ListaTarea, marcador: Estados) =>
  lista.every((tarea) => tarea.estado === Estados.Pendiente)
    ? Estados.Pendiente
    : lista.every((tarea) => tarea.estado === Estados.Hecho)
    ? Estados.Hecho
    : marcador;

export const eliminarFinalizadas = (lista: ListaTarea) =>
  reject(lista, (tarea) => tarea.estado === Estados.Hecho);

export const eliminarTarea = (lista: ListaTarea, tarea: Tarea) =>
  reject(lista, mismoId(tarea));

export const moverTarea = (lista: ListaTarea, tarea: Tarea, indice: number) => {
  const [pre, post] = splitAt(lista, indice);
  return flatten([
    reject(pre, mismoId(tarea)),
    [tarea],
    reject(post, mismoId(tarea)),
  ]);
};
