import types from "../actionTypes";

const initialState = {
  title: "",
  description: "",
  date: new Date(),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EDITABLE_TASK_DATA: {
      const { editableTaskData } = action;

      return {
        ...(editableTaskData ? editableTaskData : state),
      };
    }
    case types.CHANGE_TASK: {
      const { name, value } = action.e.target;

      return {
        ...state,
        [name]: value,
      };
    }
    case types.CHANGE_DATE: {
      return {
        ...state,
        date: action.date,
      };
    }
    case types.RESET_MODAL_DATA: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
