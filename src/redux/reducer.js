import * as actions from "./actionTypes";

const defaultState = {
  count: 0,
  disabled: true,
  changeCount: 0,
  selections: [],
  tasks: [],
  loading: false,
  errorMessage: null,
  successMessage: null,
  addTaskSuccess: false,
  removeSelectedTasksSuccess: false,
  editTaskSuccess: false,
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.INCREASE_COUNT:
      return {
        ...state,
        count: state.count + state.selections[state.selections.length - 1],
      };

    case actions.DECREASE_COUNT:
      return {
        ...state,
        count: state.count - state.selections[state.selections.length - 1],
      };

    case actions.SAVE_SELECT_VALUE:
      return {
        ...state,
        selections: [...state.selections, action.payload.data],
      };

    case actions.RESET_COUNT:
      return {
        ...state,
        count: 0,
      };

    case actions.LOADING:
      return {
        ...state,
        loading: true,
        addTaskSuccess: false,
        successMessage: null,
        errorMessage: null,
        removeSelectedTasksSuccess: false,
        editTaskSuccess: false,
      };

    case actions.ERROR:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.error,
        successMessage: false,
      };

    case actions.API_CALL_SUCCESS:
      const isDataBaseEmpty = action.payload.fetchedTasks.length
        ? action.payload.success
        : `💥 Data Base is Empty, nothing to fetch!`;

      return {
        ...state,
        loading: false,
        tasks: action.payload.fetchedTasks,
        successMessage: isDataBaseEmpty,
      };

    case actions.ADD_TASK_SUCCESS:
      const tasks = [...state.tasks, action.payload.data];

      return {
        ...state,
        tasks,
        loading: false,
        successMessage: action.payload.success,
        addTaskSuccess: true,
      };

    case actions.REMOVE_TASK_SUCCESS:
      const isTaskExists = (task) =>
        task._id !== action.payload.removableTask._id;
      const updatedTasks = state.tasks.filter(isTaskExists);

      return {
        ...state,
        loading: false,
        tasks: updatedTasks,
        successMessage: action.payload.success,
      };

    case actions.REMOVE_SELECTED_TASKS_SUCCESS:
      let _tasks = [...state.tasks];
      const selectedtasksIds = action.payload.selectedTasksIds;
      selectedtasksIds.forEach(
        (_id) => (_tasks = _tasks.filter((task) => task._id !== _id))
      );

      let successMessageForTasks =
        selectedtasksIds.length > 1
          ? action.payload.success
          : `✔ Selected task removed successfully !!!`;

      return {
        ...state,
        tasks: _tasks,
        loading: false,
        successMessage: successMessageForTasks,
        removeSelectedTasksSuccess: true,
      };

    case actions.SAVE_EDITED_TASK_SUCCESS:
      let tasksClone = [...state.tasks];
      const editedTask = action.payload.editedTask;
      const isElementExists = (task) => task._id === editedTask._id;
      const getTasktIndex = tasksClone.findIndex(isElementExists);
      tasksClone[getTasktIndex] = editedTask;

      return {
        ...state,
        tasks: tasksClone,
        loading: false,
        editTaskSuccess: true,
        successMessage: action.payload.success,
      };

    default:
      return state;
  }
};

export { reducer };
