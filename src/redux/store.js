import { reducer } from "./reducer";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const store = createStore(reducer, applyMiddleware(thunk, logger));
