import types from "./actionTypes";
const API_HOST = process.env.REACT_APP_API_URL;

// ToDo actions
const getTasksThunk = async (dispatch) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task`).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    dispatch({ type: types.SET_TASKS, data });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
    dispatch({ type: types.SET_IS_REQUEST_ENDED });
  }
};

const addTaskThunk = async (dispatch, newTaskData) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTaskData),
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    dispatch({ type: types.ADD_TASK, data });
    dispatch({
      type: types.SET_SUCCESS_MESSAGE,
      successMessage: "Task was added successfully",
    });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
    dispatch({ type: types.SET_IS_OPEN_TASK_MODAL });
  }
};

const editTaskThunk = async (
  dispatch,
  editableTaskData,
  editableTask,
  page
) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task/${editableTask._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editableTaskData),
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    if (page === "ToDo") dispatch({ type: types.EDIT_TASK, data });
    else dispatch({ type: types.SET_SINGLE_TASK, data });
    dispatch({
      type: types.SET_SUCCESS_MESSAGE,
      successMessage: "Task was edited successfully",
    });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    if (page === "ToDo") {
      dispatch({ type: types.SET_IS_OPEN_TASK_MODAL });
      dispatch({ type: types.SET_EDITABLE_TASK, editableTask: null });
    } else {
      dispatch({ type: types.TOGGLE_HIDE_MODAL });
    }
    dispatch({ type: types.REMOVE_LOADING });
  }
};

const deleteTaskThunk = async (dispatch, _id, history = null) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    if (history) history.push("/");
    else {
      dispatch({ type: types.DELETE_TASK, _id });
      dispatch({
        type: types.SET_SUCCESS_MESSAGE,
        successMessage: "Task was deleted successfully",
      });
    }
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
  }
};

const deleteSelectedTasksThunk = async (dispatch, selectedTasksIDs) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tasks: Array.from(selectedTasksIDs) }),
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    dispatch({ type: types.DELETE_SELECTED_TASKS });
    dispatch({
      type: types.SET_SUCCESS_MESSAGE,
      successMessage: "Selected tasks were deleted successfully",
    });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
  }
};

const changeTaskStatusThunk = async (dispatch, task, page) => {
  const status = task.status === "done" ? "active" : "done";

  try {
    const data = await fetch(`${API_HOST}/task/${task._id}`, {
      method: "put",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ status }),
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    if (page === "ToDo") dispatch({ type: types.EDIT_TASK, data });
    else dispatch({ type: types.SET_SINGLE_TASK, data });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  }
};

// SingleTask actions
const getSingleTaskThunk = async (dispatch, history, _id) => {
  try {
    const data = await fetch(`${API_HOST}/task/${_id}`).then((res) =>
      res.json()
    );
    if (data.error) throw data.error;
    dispatch({ type: types.SET_SINGLE_TASK, data });
  } catch (error) {
    history.push(`/error/${error.status}`);
  }
};

// ContactForm actions
const submitContactFormThunk = async (dispatch, history, formData) => {
  const formDataCopy = { ...formData };

  for (let key in formDataCopy) {
    formDataCopy[key] = formDataCopy[key].value;
  }

  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/form`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formDataCopy),
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    dispatch({
      type: types.SET_SUCCESS_MESSAGE,
      successMessage: "Your message was sent successfully",
    });
    history.push("/");
  } catch (error) {
    dispatch({ type: types.REMOVE_LOADING });
    dispatch({
      type: types.SET_ERROR_MESSAGE,
      errorMessage:
        error.name === "ValidationError"
          ? error.message.slice(6, error.message.length)
          : error.message,
    });
  }
};

// Search actions
const submitSearchThunk = async (dispatch, type, key, filterData) => {
  const filteredData = Object.entries(filterData).filter(
    (item) => !!item[1] === true
  );
  if (filteredData.length === 0 || (type === "keypress" && key !== "Enter"))
    return;

  let query = "?";
  filteredData.forEach((item) => {
    query += `${item[0]}=${item[1]}&`;
  });

  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  try {
    const data = await fetch(
      `${API_HOST}/task${query.slice(0, query.length - 1)}`
    ).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    dispatch({ type: types.SET_TASKS, data });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
  }
};

export {
  getTasksThunk,
  addTaskThunk,
  editTaskThunk,
  deleteTaskThunk,
  deleteSelectedTasksThunk,
  changeTaskStatusThunk,
  getSingleTaskThunk,
  submitContactFormThunk,
  submitSearchThunk,
};
