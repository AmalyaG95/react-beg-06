import types from "../actionTypes";
import validateForm from "../../utils/validation/validateForm";

const initialState = {
  name: {
    value: "",
    isValid: false,
    error: "",
  },
  email: {
    value: "",
    isValid: false,
    error: "",
  },
  message: {
    value: "",
    isValid: false,
    error: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE: {
      const { name, value } = action;
      const error = validateForm(name, value);

      return {
        ...state,
        [name]: {
          value,
          isValid: error ? false : true,
          error,
        },
      };
    }
    case types.RESET_CONTACT_FORM_DATA: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default reducer;
