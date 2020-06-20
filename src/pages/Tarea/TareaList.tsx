import React from "react";
import { connect, ConnectedProps } from "react-redux";

import TareaItem from "./TareaItem";

import { Creadores } from "../../redux/actions";
import { RootState } from "../../redux/reducers";
import { Estados } from "../../types/Tarea";
import { invertirEstado } from "../../state/Tarea";

const mapState = (state: RootState) => ({
  lista: state.tarea.lista,
  filtro: state.tarea.filtro,
  marcador: state.tarea.marcador,
});

const mapDispatch = {
  marcarTodas: Creadores.marcarTodas,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector>;
// debe recibir la lista de tareas y todos los handlers

const TareaList = (props: Props) => {
  const { filtro, lista, marcador, marcarTodas } = props;
  if (lista.length === 0) return null;
  const marcadas = marcador === Estados.Hecho;
  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={marcadas}
        onChange={() => marcarTodas({ estado: invertirEstado(marcador) })}
      />
      <label htmlFor="toggle-all">Finalizar todas</label>
      <ul className="todo-list">
        {lista
          .filter((tarea) => tarea.estado & filtro)
          .map((tarea) => (
            <TareaItem key={tarea.id.toString()} tarea={tarea} />
          ))}
      </ul>
    </section>
  );
};

export default connector(TareaList);
