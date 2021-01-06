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

const fetchTasks = () => ({
  type: actions.FETCH_TASKS,
});

export {
  increaseCount,
  decreaseCount,
  saveSelectValue,
  resetCount,
  fetchTasks,
};
