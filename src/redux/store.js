import { reducer } from "./reducer";
import { createStore } from "redux";

export const store = createStore(reducer);

const subscribe = store.subscribe(() =>
  console.log("State after dispatch: ", store.getState())
);
console.log("subscribe", subscribe);
