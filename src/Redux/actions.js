const API_HOST = "http://localhost:3001";

// ToDo actions
export const getTasksThunk = (setTasks, setLoading, removeLoading) => {
  setLoading();
  fetch(`${API_HOST}/task`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      setTasks(data);
    })
    .catch((error) => {
      console.log("Get all tasks Error", error);
    })
    .finally(() => {
      removeLoading();
    });
};

export const addTaskThunk = (
  newTaskData,
  addTask,
  setLoading,
  removeLoading,
  toggleHideAddEditTaskModal
) => {
  setLoading();
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
      addTask(data);
    })
    .catch((error) => {
      console.log("Add a task Error", error);
    })
    .finally(() => {
      removeLoading();
      toggleHideAddEditTaskModal();
    });
};

export const editTaskThunk = (
  editableTask,
  editableTaskData,
  editTask,
  toggleSetEditableTask,
  setLoading,
  removeLoading,
  toggleHideAddEditTaskModal
) => {
  setLoading();
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
      editTask(data);
      toggleSetEditableTask();
    })
    .catch((error) => {
      console.log("Edit a task Error", error);
    })
    .finally(() => {
      removeLoading();
      toggleHideAddEditTaskModal();
    });
};

export const deleteTaskThunk = (_id, deleteTask, setLoading, removeLoading) => {
  setLoading();
  fetch(`${API_HOST}/task/${_id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw data.error;
      }
      deleteTask(_id);
    })
    .catch((error) => {
      console.log("Delete a task Error", error);
    })
    .finally(() => {
      removeLoading();
    });
};

export const deleteSelectedTasksThunk = (
  selectedTasksIDs,
  deleteSelectedTasks,
  setLoading,
  removeLoading
) => {
  setLoading();
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
      deleteSelectedTasks();
    })
    .catch((error) => {
      console.log("Delete selected tasks Error", error);
    })
    .finally(() => {
      removeLoading();
    });
};

// SingleTask actions
export const getSingleTaskThunk = async (history, match, setSingleTask) => {
  const { id } = match.params;

  try {
    const data = await fetch(`${API_HOST}/task/${id}`).then((res) =>
      res.json()
    );
    if (data.error) throw data.error;
    setSingleTask(data);
  } catch (error) {
    console.log("Get the single task Error ", error);
    history.push(`/error/${error.status}`);
  }
};

export const deleteSingleTaskThunk = async (
  history,
  match,
  setLoading,
  removeLoading
) => {
  const { id } = match.params;

  setLoading();
  try {
    const data = await fetch(`${API_HOST}/task/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());

    if (data.error) {
      throw data.error;
    }
    history.push("/");
  } catch (error) {
    console.log("Delete the single task Error", error);
  } finally {
    removeLoading();
  }
};

export const editSingleTaskThunk = async (
  singleTask,
  editableTask,
  setLoading,
  removeLoading,
  setSingleTask,
  toggleHideAddEditTaskModal
) => {
  setLoading();
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
    setSingleTask(data);
  } catch (error) {
    console.log("Edit the single task Error", error);
  } finally {
    removeLoading();
    toggleHideAddEditTaskModal();
  }
};

export const goBackThunk = (history) => {
  history.goBack();
};

// ContactForm actions
export const submitContactFormThunk = (
  history,
  formData,
  setLoading,
  removeLoading,
  setErrorMessage,
  removeErrorMessage,
  openErrorMessageAlert
) => {
  const formDataCopy = { ...formData };
  for (let key in formDataCopy) {
    formDataCopy[key] = formDataCopy[key].value;
  }

  setLoading();
  removeErrorMessage();
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
      history.push("/");
    } catch (error) {
      console.log("Send Contact Form data Error", error);
      removeLoading();
      setErrorMessage(error);
      openErrorMessageAlert();
    }
  })();
};
