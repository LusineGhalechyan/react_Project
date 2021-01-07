import * as actions from "./actionTypes";

const increaseCount = () => ({
  type: actions.INCREASE_COUNT,
});

const decreaseCount = () => ({
  type: actions.DECREASE_COUNT,
});

const saveSelectValue = (data) => ({
  type: actions.SAVE_SELECT_VALUE,
  payload: {
    data,
  },
});

const resetCount = () => ({
  type: actions.RESET_COUNT,
});

export { increaseCount, decreaseCount, saveSelectValue, resetCount };
