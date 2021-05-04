import types from "../actionTypes";

const initialState = {
  status: "",
  search: "",
  create_lte: null,
  create_gte: null,
  complete_lte: null,
  complete_gte: null,
  sort: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SEARCH: {
      return {
        ...state,
        search: action.value,
      };
    }
    case types.CHANGE_DROPDOWN_VALUE: {
      const { dropdown, value } = action;
      return {
        ...state,
        [dropdown]: value,
      };
    }
    case types.CHANGE_FILTER_DATE: {
      const { name, date } = action;

      return {
        ...state,
        [name]: date,
      };
    }
    case types.RESET_SEARCH_DATA: {
      return {
        ...initialState,
      };
    }

    default:
      return state;
  }
};

export default reducer;
