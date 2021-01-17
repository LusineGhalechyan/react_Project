import { reducer } from "./reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

const middlewareArr = [thunk];

process.env.NODE_ENV === `development` && middlewareArr.push(logger);
export const store = createStore(reducer, applyMiddleware(...middlewareArr));
