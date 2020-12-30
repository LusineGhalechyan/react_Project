import * as actions from "./actionTypes";

const INCREASE_COUNT = () => ({
  type: actions.INCREASE_COUNT,
});

const DECREASE_COUNT = () => ({
  type: actions.DECREASE_COUNT,
});

const SAVE_SELECT_VALUE = (data) => ({
  type: actions.SAVE_SELECT_VALUE,
  payload: {
    data,
  },
});

const RESET_COUNT = () => ({
  type: actions.RESET_COUNT,
});

export { INCREASE_COUNT, DECREASE_COUNT, SAVE_SELECT_VALUE, RESET_COUNT };
