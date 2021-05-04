import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import globalReducer from "./reducers/globalReducer";
import ToDoReducer from "./reducers/ToDoReducer";
import SingleTaskReducer from "./reducers/SingleTaskReducer";
import ContactFormReducer from "./reducers/ContactFormReducer";
import AddEditTaskModalReducer from "./reducers/AddEditTaskModalReducer";
import SearchReducer from "./reducers/SearchReducer";

const reducer = combineReducers({
  globalState: globalReducer,
  ToDoState: ToDoReducer,
  SingleTaskState: SingleTaskReducer,
  ContactFormState: ContactFormReducer,
  AddEditTaskModalState: AddEditTaskModalReducer,
  SearchState: SearchReducer,
});

const middlewares = [thunk, logger];

export const store = createStore(reducer, applyMiddleware(...middlewares));
