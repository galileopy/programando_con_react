import { combineReducers } from "redux";

import tarea from "./tarea";
const rootReducer = combineReducers({
  tarea,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
