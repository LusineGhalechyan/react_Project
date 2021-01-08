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
  type: actions.TASK_TASKS_FETCHED,
  payload: {
    fetchedTasks,
  },
});

const requestMiddleWare = (taskId) => async (dispatch) => {
  try {
    if (!taskId) {
      const response = await api.getTasks();
      dispatch(tasksFetched(response));
    } else {
      const response = await api.getTasks(taskId);
      dispatch(tasksFetched(response));
    }
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
