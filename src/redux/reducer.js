import * as actions from "./actionTypes";

const defaultState = {
  count: 0,
  disabled: true,
  changeCount: 0,
  selections: [],
  tasks: [],
  error: null,
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

    case actions.TASKS_FETCHED:
      return {
        ...state,
        tasks: action.payload.fetchedTasks,
      };

    case actions.FAILURE_TO_FETCH_TASKS:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
};

export { reducer };
