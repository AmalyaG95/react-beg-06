import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import globalReducer from "./globalReducer";
import ToDoReducer from "./ToDoReducer";
import SingleTaskReducer from "./SingleTaskReducer";
import ContactFormReducer from "./ContactFormReducer";

const reducer = combineReducers({
  globalState: globalReducer,
  ToDoState: ToDoReducer,
  SingleTaskState: SingleTaskReducer,
  ContactFormState: ContactFormReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk, logger));
