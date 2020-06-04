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
  id: number,
  descripcion: string,
  estado = Estados.Pendiente
): Tarea => ({
  id,
  descripcion,
  estado,
});

const invertirEstado = (estado: Estados): Estados => {
  switch (estado) {
    case Estados.Pendiente:
      return Estados.Hecho;
    case Estados.Hecho:
      return Estados.Pendiente;
  }
};

const cambiarEstado = (tarea: Tarea): Tarea =>
  merge(tarea, { estado: invertirEstado(tarea.estado) });

const cambiarDescripcion = (tarea: Tarea, descripcion: string): Tarea =>
  merge(tarea, { descripcion });

const mismoId = (t1: Tarea) => (t2: Tarea) => t1.id === t2.id;

const agregarTarea = (
  lista: ListaTarea,
  id: number,
  descripcion: string
): ListaTarea => concat(lista, [nuevaTarea(lista.length, descripcion)]);

const actualizarLista = (lista: ListaTarea, tarea: Tarea) => {
  const indice = findIndex(lista, mismoId(tarea));
  flatten([take(lista, indice), [tarea], drop(indice + 1)]);
};

const actualizarDescripcion = (
  lista: ListaTarea,
  tarea: Tarea,
  descripcion: string
) => actualizarLista(lista, cambiarDescripcion(tarea, descripcion));

const actualizarEstado = (lista: ListaTarea, tarea: Tarea) =>
  actualizarLista(lista, cambiarEstado(tarea));

const moverTarea = (lista: ListaTarea, tarea: Tarea, indice: number) => {
  const [pre, post] = splitAt(lista, indice);
  return flatten([
    reject(pre, mismoId(tarea)),
    [tarea],
    reject(post, mismoId(tarea)),
  ]);
};
