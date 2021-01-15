import * as actions from "./actionTypes";

const defaultState = {
  tasks: [],
  task: null,
  loading: false,
  errorMessage: null,
  successMessage: null,
  addTaskSuccess: false,
  removeTaskSuccess: false,
  removeSelectedTasksSuccess: false,
  editTaskSuccess: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.LOADING: {
      return {
        ...state,
        loading: true,
        addTaskSuccess: false,
        successMessage: null,
        errorMessage: null,
        removeSelectedTasksSuccess: false,
        editTaskSuccess: false,
        removeTaskSuccess: false,
      };
    }

    case actions.ERROR: {
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error,
        successMessage: false,
      };
    }

    case actions.API_CALL_SUCCESS: {
      const data = action.payload.fetchedData;
      const isDataBaseEmpty =
        !data.length && `💥 Data Base is Empty, nothing to fetch!`;

      return {
        ...state,
        loading: false,
        tasks: data,
        successMessage: isDataBaseEmpty,
      };
    }

    case actions.GET_SINGLE_TASK_SUCCESS: {
      return {
        ...state,
        task: action.payload.singleTask,
        loading: false,
      };
    }

    case actions.ADD_TASK_SUCCESS: {
      const tasks = [...state.tasks, action.payload.data];

      return {
        ...state,
        tasks,
        loading: false,
        successMessage: action.payload.success,
        addTaskSuccess: true,
      };
    }

    case actions.REMOVE_TASK_SUCCESS: {
      const removeTaskCommonParams = {
        ...state,
        loading: false,
        successMessage: action.payload.success,
      };
      const isTaskExists = (task) =>
        task._id !== action.payload.removableTask._id;
      const updatedTasks = state.tasks.filter(isTaskExists);

      if (action.payload.from === `single`) {
        return {
          ...removeTaskCommonParams,
          task: null,
          removeTaskSuccess: true,
          task: null,
        };
      } else {
        return {
          ...removeTaskCommonParams,
          tasks: updatedTasks,
        };
      }
    }

    case actions.REMOVE_SELECTED_TASKS_SUCCESS: {
      let tasks = [...state.tasks];
      const selectedtasksIds = action.payload.selectedTasksIds;
      selectedtasksIds.forEach(
        (_id) => (tasks = tasks.filter((task) => task._id !== _id))
      );

      let successMessageForTasks =
        selectedtasksIds.length > 1
          ? action.payload.success
          : `✔ Selected task removed successfully !!!`;

      return {
        ...state,
        tasks,
        loading: false,
        successMessage: successMessageForTasks,
        removeSelectedTasksSuccess: true,
      };
    }

    case actions.SAVE_EDITED_TASK_SUCCESS: {
      const editTaskCommonParams = {
        ...state,
        loading: false,
        editTaskSuccess: true,
        successMessage: action.payload.success,
      };
      if (action.payload.from === `single`) {
        return {
          ...editTaskCommonParams,
          task: action.payload.editedTask,
        };
      } else {
        let tasks = [...state.tasks];
        const editedTask = action.payload.editedTask;
        const isElementExists = (task) => task._id === editedTask._id;
        const getTasktIndex = tasks.findIndex(isElementExists);
        tasks[getTasktIndex] = editedTask;

        return {
          ...editTaskCommonParams,
          tasks,
        };
      }
    }

    default:
      return state;
  }
};

export { reducer };
