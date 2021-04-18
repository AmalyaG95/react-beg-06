import types from "../actionsType";

const initialState = {
  title: "",
  description: "",
  date: new Date(),
};

const reducer = (state = initialState, action) => {
  const { editableTaskData } = action;

  switch (action.type) {
    case types.SET_EDITABLE_TASK_DATA: {
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
        date: action.e,
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
