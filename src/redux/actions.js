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

const loading = () => ({
  type: actions.LOADING,
});

const apiCallSuccess = (fetchedTasks) => ({
  type: actions.API_CALL_SUCCESS,
  payload: {
    fetchedTasks,
    success: `🎉 Congratulations, Tasks fetched successfully !!!`,
  },
});

const errorInfetchingData = () => ({
  type: actions.ERROR,
  payload: {
    error: `🚫 Failed to fetch data !`,
  },
});

const addNewTaskSuccess = (data) => ({
  type: actions.ADD_TASK_SUCCESS,
  payload: {
    data,
    success: `🎉 Congratulations, Task fetched successfully !!!`,
  },
});

const removeTaskSuccess = (removableTask) => ({
  type: actions.REMOVE_TASK_SUCCESS,
  payload: {
    removableTask,
    success: `🎉 Task removed successfully !!!`,
  },
});

const removeSelectedTasksSuccess = (selectedTasksIds) => ({
  type: actions.REMOVE_SELECTED_TASKS_SUCCESS,
  payload: {
    selectedTasksIds: [...selectedTasksIds],
    success: `✔✔✔ Selected tasks removed successfully !!!`,
  },
});

const saveEditedTaskSuccess = (editedTask) => ({
  type: actions.SAVE_EDITED_TASK_SUCCESS,
  payload: {
    editedTask,
    success: `✍ Task edited successfully !!!`,
  },
});

const requestMiddleWare = (taskId) => async (dispatch) => {
  dispatch(loading());
  try {
    if (!taskId) {
      const response = await api.getTasks();
      dispatch(apiCallSuccess(response));
    } else {
      const response = await api.getTasks(taskId);
      dispatch(apiCallSuccess(response));
    }
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

const addNewTaskMiddleWare = (newTaskToBackend) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await api.postTask(newTaskToBackend);
    dispatch(addNewTaskSuccess(response));
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

const removeTaskMiddleWare = (task) => async (dispatch) => {
  dispatch(loading());
  try {
    await api.removeTask(task._id);
    dispatch(removeTaskSuccess(task));
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

const removeSelectedTasksMiddleWare = (selectedTasksIds) => async (
  dispatch
) => {
  dispatch(loading());
  try {
    await api.removeSelectedTasks({ tasks: [...selectedTasksIds] });
    dispatch(removeSelectedTasksSuccess(selectedTasksIds));
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

const saveEditedTaskMiddleWare = (editedTask) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await api.saveEditedTask(editedTask);
    dispatch(saveEditedTaskSuccess(response));
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

export {
  increaseCount,
  decreaseCount,
  saveSelectValue,
  resetCount,
  loading,
  apiCallSuccess,
  errorInfetchingData,
  requestMiddleWare,
  addNewTaskMiddleWare,
  removeTaskMiddleWare,
  removeSelectedTasksMiddleWare,
  saveEditedTaskMiddleWare,
};
