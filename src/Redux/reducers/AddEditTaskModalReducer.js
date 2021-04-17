import types from "../actionsType";

const initialState = {
  title: "", //props.editableTask?.title ||
  description: "", //props.editableTask?.description ||
  date: new Date(), //props.editableTask ? new Date(props.editableTask.date) :
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
