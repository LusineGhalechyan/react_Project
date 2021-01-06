import * as actions from "./actionTypes";

const defaultState = {
  count: 0,
  changeCount: 0,
  selections: [],
  isLoading: false,
  tasks: [],
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

    case actions.FETCH_TASKS:
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
};

export { reducer };
