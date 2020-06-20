import React from "react";
import Tareas from "./pages/Tarea";
export default () => {
  return (
    <div>
      <Tareas />
      <footer className="info">
        <p>Doble Click para editar una Tarea</p>
        <p>
          Template by <a href="http://sindresorhus.com">Sindre Sorhus</a>
        </p>
        <p>
          Creado por <a href="https://galileopy.com">Galileo Sánchez</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};
