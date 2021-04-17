import types from "./actionsType";

const initialState = {
  loading: false,
  errorMessage: "",
  isOpenErrorMessageAlert: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.REMOVE_LOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.SET_ERROR_MESSAGE:
      const { errorMessage } = action;
      return {
        ...state,
        errorMessage,
      };
    case types.REMOVE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    case types.OPEN_ERROR_MESSAGE_ALERT:
      return {
        ...state,
        isOpenErrorMessageAlert: true,
      };
    case types.CLOSE_ERROR_MESSAGE_ALERT:
      return {
        ...state,
        isOpenErrorMessageAlert: false,
      };
    default:
      return state;
  }
};

export default reducer;
