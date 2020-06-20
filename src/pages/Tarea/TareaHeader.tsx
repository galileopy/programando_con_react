import React, { useState } from "react";
import { connect, ConnectedProps } from "react-redux";

// tiene que recibir el dispatcher para crear una nueva tarea
import { Creadores } from "../../redux/actions";

const ENTER_KEY = 13;

const mapDispatch = {
  agregar: Creadores.agregarTarea,
};

const connector = connect(null, mapDispatch);

type Props = ConnectedProps<typeof connector>;

const TareaHeader = (props: Props) => {
  const { agregar } = props;
  const [descripcion, setDescripcion] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescripcion(e.target.value);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === ENTER_KEY) {
      agregar({ descripcion });
      setDescripcion("");
    }
  };
  return (
    <header className="header">
      <h1>tareas</h1>
      <input
        className="new-todo"
        value={descripcion}
        placeholder="Qué tienes que hacer?"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </header>
  );
};

export default connector(TareaHeader);
