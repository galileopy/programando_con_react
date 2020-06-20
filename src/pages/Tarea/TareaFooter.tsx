import React from "react";
import { ListaTarea, Estados, FiltroTarea } from "../../types/Tarea";
import { connect, ConnectedProps } from "react-redux";
import { Creadores } from "../../redux/actions";
import { RootState } from "../../redux/reducers";

const mapState = (state: RootState) => ({
  lista: state.tarea.lista,
  filtro: state.tarea.filtro,
});

const mapDispatch = {
  filtrar: Creadores.filtrarTareas,
  eliminarFinalizadas: Creadores.eliminarFinalizadas,
};

const connector = connect(mapState, mapDispatch);

// debe recibir el cambio de filtros
// necesitamos una que elmine las terminadas
type Props = ConnectedProps<typeof connector>;

const TareasFooter = (props: Props) => {
  const { lista, filtrar, eliminarFinalizadas } = props;
  if (lista.length === 0) return null;
  const pendientes = lista.filter((tarea) => tarea.estado === Estados.Pendiente)
    .length;
  const completas = lista.filter((tarea) => tarea.estado === Estados.Hecho)
    .length;

  const filtrarTodas = () => filtrar({ filtro: FiltroTarea.Todos });
  const filtrarHechas = () => filtrar({ filtro: FiltroTarea.Hecho });
  const filtrarPendientes = () => filtrar({ filtro: FiltroTarea.Pendiente });

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{pendientes}</strong> tareas pendientes
      </span>
      <ul className="filters">
        <li>
          <button className="selected" onClick={filtrarTodas}>
            Todas
          </button>
        </li>
        <li>
          <button onClick={filtrarPendientes}>Pendientes</button>
        </li>
        <li>
          <button onClick={filtrarHechas}>Terminadas</button>
        </li>
      </ul>
      {completas > 0 ? (
        <button
          onClick={() => eliminarFinalizadas()}
          className="clear-completed"
        >
          Eliminar terminadas
        </button>
      ) : null}
    </footer>
  );
};

export default connector(TareasFooter);
