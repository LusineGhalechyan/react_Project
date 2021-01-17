import * as actions from "./actionTypes";
import { api } from "../helpers/api";

const loading = () => ({
  type: actions.LOADING,
});

const errorInfetchingData = () => ({
  type: actions.ERROR,
  payload: {
    error: `🚫 Failed to fetch data !`,
  },
});

const apiCallSuccess = (fetchedData) => ({
  type: actions.API_CALL_SUCCESS,
  payload: {
    fetchedData,
  },
});

const getSingleTaskSuccess = (singleTask) => ({
  type: actions.GET_SINGLE_TASK_SUCCESS,
  payload: {
    singleTask,
  },
});

const addNewTaskSuccess = (data) => ({
  type: actions.ADD_TASK_SUCCESS,
  payload: {
    data,
    success: `🎉 Congratulations, Task fetched successfully !!!`,
  },
});

const removeTaskSuccess = (removableTask, from) => ({
  type: actions.REMOVE_TASK_SUCCESS,
  payload: {
    removableTask,
    from,
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

const saveEditedTaskSuccess = (editedTask, from) => ({
  type: actions.SAVE_EDITED_TASK_SUCCESS,
  payload: {
    editedTask,
    from,
    success: `✍ Task edited successfully !!!`,
  },
});

const requestMiddleWare = (data) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await api.getTasks(null, data);
    dispatch(apiCallSuccess(response));
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

const requestSingleTaskMiddleWare = (taskId) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await api.getTasks(taskId);
    dispatch(getSingleTaskSuccess(response));
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

const removeTaskMiddleWare = (task, from) => async (dispatch) => {
  dispatch(loading());
  try {
    await api.removeTask(task._id);
    dispatch(removeTaskSuccess(task, from));
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

const saveEditedTaskMiddleWare = (editedTask, from) => async (dispatch) => {
  dispatch(loading());
  try {
    const response = await api.saveEditedTask(editedTask);
    dispatch(saveEditedTaskSuccess(response, from));
  } catch (error) {
    dispatch(errorInfetchingData());
  }
};

export {
  loading,
  apiCallSuccess,
  errorInfetchingData,
  requestMiddleWare,
  requestSingleTaskMiddleWare,
  addNewTaskMiddleWare,
  removeTaskMiddleWare,
  removeSelectedTasksMiddleWare,
  saveEditedTaskMiddleWare,
};
