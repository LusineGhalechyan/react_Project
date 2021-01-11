import axios from "axios";
import { baseURL } from "./baseURL";

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
      .then((response) => [response.data]);
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
