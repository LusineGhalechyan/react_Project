import axios from "axios";
import { baseURL } from "./baseURL";
import { useDispatch } from "react-redux";
import { fetchTasks } from "../redux/actions";

const dispatch = useDispatch();

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getTasks(taskId) {
    if (!taskId)
      return instance.get(`${"/task"}`).then((response) => response.data);
    return instance
      .get(`${"/task/"}${taskId}`)
      .then((response) => response.data);
  },

  postTask(newTaskToBackend) {
    return instance
      .post(`${"/task"}`, newTaskToBackend)
      .then((response) => response.data);
  },

  removeTask(taskId) {
    return instance.delete(`${"/task/"}${taskId}`);
  },

  removeSelectedTasks(axiosPatchRequestValue) {
    return instance.patch(`${"/task/"}`, axiosPatchRequestValue);
  },

  saveEditedTask(editedTaskId, editedTask) {
    return instance
      .put(`${"/task/"}${editedTaskId}`, editedTask)
      .then((response) => response.data);
  },
};

export const request = async (dispatch) => {
  dispatch(fetchTasks());
  try {
    const response = await api.getTasks();
  } catch (error) {
    console.log(error);
  }
};
