import React from "react";

import TareaHeader from "./TareaHeader";
import TareaList from "./TareaList";
import TareaFooter from "./TareaFooter";

export default () => (
  <section className="todoapp">
    <TareaHeader />
    <TareaList />
    <TareaFooter />
  </section>
);
