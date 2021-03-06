import types from "../actionTypes";

const initialState = {
  singleTask: null,
  isEditable: false,
};

const reducer = (state = initialState, action) => {
  const { isEditable } = state;

  switch (action.type) {
    case types.SET_SINGLE_TASK: {
      return {
        ...state,
        singleTask: action.data,
      };
    }
    case types.TOGGLE_HIDE_MODAL: {
      return {
        ...state,
        isEditable: !isEditable,
      };
    }
    case types.RESET_SINGLE_TASK_DATA: {
      return {
        ...initialState,
        isEditable,
      };
    }
    default:
      return state;
  }
};

export default reducer;
