import axios from "axios";
import { REACT_APP_API_URL } from "./baseURL";

const instance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  getTasks(taskId, data = {}) {
    let query = `?`;

    for (let key in data) {
      let value = data[key];
      query = `${query}${key}=${value}&`;
    }

    if (query === `?`) {
      query = ``;
    }

    if (!taskId && data) {
      return instance
        .get(`${"/task"}${query}`)
        .then((response) => response.data);
    }
    return instance
      .get(`${"/task/"}${taskId}`)
      .then((response) => response.data);
  },

  postTask(newTaskToBackend) {
    return instance
      .post(`${"/task"}`, newTaskToBackend)
      .then((response) => response.data);
  },

  postForm(formValues) {
    return instance
      .post(`${"/form"}`, formValues)
      .then((response) => response.data);
  },

  removeTask(taskId) {
    return instance.delete(`${"/task/"}${taskId}`);
  },

  removeSelectedTasks(axiosPatchRequestValue) {
    return instance.patch(`${"/task/"}`, axiosPatchRequestValue);
  },

  saveEditedTask(editedTask, status) {
    if (editedTask && !status) {
      return instance
        .put(`${"/task/"}${editedTask._id}`, editedTask)
        .then((response) => response.data);
    }
    if (editedTask && status) {
      return instance
        .put(`${"/task/"}${editedTask._id}`, status)
        .then((response) => response.data);
    }
  },
};
