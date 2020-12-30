import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// import { createStore } from "redux";
import { store } from "./components/ToDo/redux/store";
// import store from "./components/ToDo/redux/store";

const defaultState = {
  count: 0,
  changeCount: 0,
  // counts: [
  //   { id: 0, count: "Count" },
  //   { id: 1, count: "one" },
  //   { id: 5, count: "five" },
  //   { id: 10, count: "ten" },
  // ],
};

// const update = (state, mutations) => {
//   Object.assign({}, state, mutations);
// };

// export const incrementAction = () => ({
//   type: INCREMENT_COUNT,
//   payload:
// });

// export const decrementAction = () => ({
//   type: DECREMENT_COUNT,
// });

// const reducer = (state = defaultState, action) => {
//   if (action.type === "CHANGE_COUNT") {
//     return { ...state, count: state.count + action.value };
//   }
//   if (action.type === "RESET_COUNT") {
//     return { ...state, count: 0 };
//   }
//   return state;
// };

// const store = createStore(reducer);

// console.log("store", store);

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
