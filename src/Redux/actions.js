import types from "./actionsType";
import formatDate from "../utils/formatDate";
const API_HOST = "http://localhost:3001";

// ToDo actions
export const getTasksThunk = (dispatch) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  fetch(`${API_HOST}/task`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      dispatch({ type: types.SET_TASKS, data });
    })
    .catch((error) => {
      dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
    })
    .finally(() => {
      dispatch({ type: types.REMOVE_LOADING });
    });
};

export const addTaskThunk = (dispatch, newTaskData) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  fetch(`${API_HOST}/task`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(newTaskData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      dispatch({ type: types.ADD_TASK, data });
      dispatch({
        type: types.SET_SUCCESS_MESSAGE,
        successMessage: "Task was added successfully",
      });
    })
    .catch((error) => {
      dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
    })
    .finally(() => {
      dispatch({ type: types.REMOVE_LOADING });
      dispatch({ type: types.SET_IS_OPEN_TASK_MODAL });
    });
};

export const editTaskThunk = (dispatch, editableTask, editableTaskData) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  fetch(`${API_HOST}/task/${editableTask._id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(editableTaskData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      dispatch({ type: types.EDIT_TASK, data });
      dispatch({
        type: types.SET_SUCCESS_MESSAGE,
        successMessage: "Task was edited successfully",
      });
      dispatch({ type: types.SET_EDITABLE_TASK, editableTask: null });
    })
    .catch((error) => {
      dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
    })
    .finally(() => {
      dispatch({ type: types.REMOVE_LOADING });
      dispatch({ type: types.SET_IS_OPEN_TASK_MODAL });
    });
};

export const deleteTaskThunk = (dispatch, _id) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  fetch(`${API_HOST}/task/${_id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      dispatch({ type: types.DELETE_TASK, _id });
      dispatch({
        type: types.SET_SUCCESS_MESSAGE,
        successMessage: "Task was deleted successfully",
      });
    })
    .catch((error) => {
      dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
    })
    .finally(() => {
      dispatch({ type: types.REMOVE_LOADING });
    });
};

export const deleteSelectedTasksThunk = (dispatch, selectedTasksIDs) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  fetch(`${API_HOST}/task`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ tasks: Array.from(selectedTasksIDs) }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      dispatch({ type: types.DELETE_SELECTED_TASKS });
      dispatch({
        type: types.SET_SUCCESS_MESSAGE,
        successMessage: "Selected tasks were deleted successfully",
      });
    })
    .catch((error) => {
      dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
    })
    .finally(() => {
      dispatch({ type: types.REMOVE_LOADING });
    });
};

export const changeTaskStatusThunk = async (dispatch, task) => {
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
    dispatch({ type: types.EDIT_TASK, data });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  }
};

// SingleTask actions
export const getSingleTaskThunk = async (dispatch, history, match) => {
  const { id } = match.params;

  try {
    const data = await fetch(`${API_HOST}/task/${id}`).then((res) =>
      res.json()
    );
    if (data.error) throw data.error;
    dispatch({ type: types.SET_SINGLE_TASK, data });
  } catch (error) {
    history.push(`/error/${error.status}`);
  }
};

export const deleteSingleTaskThunk = async (dispatch, history, match) => {
  const { id } = match.params;

  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    console.log("DELETE data", data);
    history.push("/");
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
  }
};

export const editSingleTaskThunk = async (
  dispatch,
  singleTask,
  editableTask
) => {
  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  try {
    const data = await fetch(`${API_HOST}/task/${singleTask._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editableTask),
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    console.log("SET_SINGLE_TASK", data);
    dispatch({ type: types.SET_SINGLE_TASK, data });
    dispatch({
      type: types.SET_SUCCESS_MESSAGE,
      successMessage: "Task was edited successfully",
    });
  } catch (error) {
    dispatch({ type: types.SET_ERROR_MESSAGE, errorMessage: error.message });
  } finally {
    dispatch({ type: types.REMOVE_LOADING });
    dispatch({ type: types.TOGGLE_HIDE_MODAL });
  }
};

export const goBackThunk = (history) => {
  history.goBack();
};

// ContactForm actions
export const submitContactFormThunk = (dispatch, history, formData) => {
  const formDataCopy = { ...formData };

  for (let key in formDataCopy) {
    formDataCopy[key] = formDataCopy[key].value;
  }

  dispatch({ type: types.SET_LOADING });
  dispatch({ type: types.REMOVE_ERROR_MESSAGE });
  dispatch({ type: types.REMOVE_SUCCESS_MESSAGE });
  (async () => {
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
      console.log(error);
      dispatch({ type: types.REMOVE_LOADING });
      dispatch({
        type: types.SET_ERROR_MESSAGE,
        errorMessage:
          error.name === "ValidationError"
            ? error.message.slice(6, error.message.length)
            : error.message,
      });
    }
  })();
};
// AddEditTaskModal actions
export const submitTask = (type, key, formData, editableTask, onSubmit) => {
  const { title, description, date } = formData;

  if (
    !title.trim() ||
    !description.trim() ||
    (type === "keypress" && key !== "Enter")
  )
    return;

  editableTask
    ? onSubmit({ ...formData, date: formatDate(date) }, editableTask)
    : onSubmit({ ...formData, date: formatDate(date) });
};
