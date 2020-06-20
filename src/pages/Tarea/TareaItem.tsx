import React, { useState } from "react";
import { Tarea, Estados } from "../../types/Tarea";
import { Creadores } from "../../redux/actions";
import { ConnectedProps, connect } from "react-redux";

const ENTER_KEY = 13;

const mapDispatch = {
  cambiarEstado: Creadores.cambiarEstado,
  actualizarDescripcion: Creadores.editarTarea,
  eliminarTarea: Creadores.eliminarTarea,
};

const connector = connect(null, mapDispatch);

type LocalProps = {
  tarea: Tarea;
};

type Props = LocalProps & ConnectedProps<typeof connector>;

/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */
const TareaItem = (props: Props) => {
  const { tarea, cambiarEstado, actualizarDescripcion, eliminarTarea } = props;
  const [editando, setEditando] = useState(false);
  const activarEditar = () => setEditando(true);
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY) {
      setEditando(false);
    }
  };
  const onCambiarEstado = () => cambiarEstado({ tarea });
  const onEdicion = (e: React.ChangeEvent<HTMLInputElement>) =>
    actualizarDescripcion({ tarea, descripcion: e.target.value });

  const hecho = tarea.estado === Estados.Hecho;
  const itemClass = editando ? "editing" : hecho ? "completed" : "";

  return (
    <li className={itemClass}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={hecho}
          onChange={onCambiarEstado}
        />
        <label onDoubleClick={activarEditar}>{tarea.descripcion}</label>
        <button
          className="destroy"
          onClick={() => eliminarTarea({ tarea })}
        ></button>
      </div>
      <input
        className="edit"
        value={tarea.descripcion}
        onChange={onEdicion}
        onKeyUp={onEnter}
      />
    </li>
  );
};

export default connector(TareaItem);
