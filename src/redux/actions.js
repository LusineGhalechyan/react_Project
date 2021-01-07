import * as actions from "./actionTypes";
import { api } from "../helpers/api";

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

const tasksFetched = (fetchedTasks) => ({
  type: actions.TASKS_FETCHED,
  payload: {
    fetchedTasks,
  },
});

const requestMiddleWare = () => async (dispatch) => {
  try {
    const response = await api.getTasks();
    dispatch(tasksFetched(response));
  } catch (error) {
    dispatch({ type: actions.FAILURE_TO_FETCH_TASKS, payload: error });
  }
};

export {
  increaseCount,
  decreaseCount,
  saveSelectValue,
  resetCount,
  tasksFetched,
  requestMiddleWare,
};
