import { useEffect, useCallback, memo } from "react";
import { connect } from "react-redux";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../../Task/Task";
import AddEditTaskModal from "../../AddEditTaskModal/AddEditTaskModal";
import Spinner from "../../Spinner/Spinner";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import propTypes from "prop-types";
import types from "../../../Redux/actionsType";

const API_HOST = "http://localhost:3001";
const ContainerCls = ["d-flex ", "flex-column", "align-content-center", "py-4"];
const delSelButtonsColCls = [
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "mt-2",
  "position-fixed",
  styles.delSelButtons,
];
const noTasksCls = ["align-self-center mt-5", styles.noTasks];

const ToDoWithRedux = ({
  ToDoState: {
    tasks,
    selectedTasksIDs,
    isOpenAddEditTaskModal,
    isOpenConfirmModal,
    editableTask,
    selectedSingleTask,
  },
  loading,
  // functions
  toggleHideAddEditTaskModal,
  toggleHideConfirmModal,
  toggleSetEditableTask,
  addTask,
  editTask,
  deleteTask,
  selectTask,
  selectAllTasks,
  deleteSelectedTasks,
  setTasks,
  setLoading,
  removeLoading,
}) => {
  useEffect(() => {
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
  }, []);

  const handleAddTask = useCallback((newTaskData) => {
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
  }, []);

  const handleEditTask = useCallback(
    (editableTaskData) => {
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
    },
    [editableTask]
  );

  const handleDeleteTask = useCallback((_id) => {
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
  }, []);

  const handleDeleteSelectedTasks = useCallback(() => {
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
  }, [selectedTasksIDs]);

  const tasksJSX = tasks.map((task) => {
    return (
      <Col
        key={task._id}
        xs={12}
        className="d-flex my-2 justify-content-center"
      >
        <Task
          task={task}
          handleDeleteTask={handleDeleteTask}
          handleSelectTask={selectTask}
          setEditableTask={toggleSetEditableTask}
          onHide={toggleHideAddEditTaskModal}
          isChecked={selectedTasksIDs.has(task._id)}
          isAnyChecked={!!selectedTasksIDs.size}
          isAllChecked={
            !!selectedTasksIDs.size && selectedTasksIDs.size === tasks.length
          }
        />
      </Col>
    );
  });

  return (
    <>
      <Container className={ContainerCls}>
        <Row>
          <Col>
            <Button
              variant="info"
              onClick={toggleHideAddEditTaskModal}
              className={styles.addTaskButton}
            >
              Add Task
            </Button>
          </Col>
        </Row>

        <Row className="mt-1 mb-5 justify-content-center">
          {!!tasksJSX.length && tasksJSX}
          {!loading && !tasksJSX.length && (
            <Col className={noTasksCls.join(" ")}> NO TASKS !</Col>
          )}
        </Row>

        <Row className="justify-content-center">
          <Col className={delSelButtonsColCls.join(" ")}>
            <div className={styles.select}>
              <label htmlFor="selectAll" className="mr-2">
                Select All
              </label>
              <input
                type="checkbox"
                id="selectAll"
                onChange={selectAllTasks}
                checked={tasks.length && selectedTasksIDs.size === tasks.length}
                disabled={!tasks.length}
              />
            </div>
            <Button
              variant="danger"
              onClick={toggleHideConfirmModal}
              disabled={!selectedTasksIDs.size}
            >
              Delete All Selected
            </Button>
          </Col>
        </Row>
      </Container>

      {isOpenAddEditTaskModal && (
        <AddEditTaskModal
          editableTask={editableTask}
          onSubmit={editableTask ? handleEditTask : handleAddTask}
          onHide={toggleHideAddEditTaskModal}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          onSubmit={handleDeleteSelectedTasks}
          onHide={toggleHideConfirmModal}
          countOrOneTaskTitle={
            selectedTasksIDs.size > 1
              ? selectedTasksIDs.size
              : selectedSingleTask.title
          }
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { ToDoState, loading } = state;

  return {
    ToDoState,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const toggleHideAddEditTaskModal = () => {
    dispatch({ type: types.SET_IS_OPEN_TASK_MODAL });
  };
  const toggleHideConfirmModal = () => {
    dispatch({ type: types.SET_IS_OPEN_CONFIRM_MODAL });
  };
  const toggleSetEditableTask = (editableTask = null) => {
    dispatch({ type: types.SET_EDITABLE_TASK, editableTask });
  };
  const addTask = (data) => {
    dispatch({ type: types.ADD_TASK, data });
  };
  const editTask = (data) => {
    dispatch({ type: types.EDIT_TASK, data });
  };
  const deleteTask = (_id) => {
    dispatch({ type: types.DELETE_TASK, _id });
  };
  const selectTask = (_id) => {
    dispatch({ type: types.SELECT_TASK, _id });
  };
  const selectAllTasks = (_id) => {
    dispatch({ type: types.SELECT_ALL_TASKS, _id });
  };
  const deleteSelectedTasks = (_id) => {
    dispatch({ type: types.DELETE_SELECTED_TASKS });
  };
  const setTasks = (data) => {
    dispatch({ type: types.SET_TASKS, data });
  };
  const setLoading = () => {
    dispatch({ type: types.SET_LOADING });
  };
  const removeLoading = () => {
    dispatch({ type: types.REMOVE_LOADING });
  };

  return {
    toggleHideAddEditTaskModal,
    toggleHideConfirmModal,
    toggleSetEditableTask,
    addTask,
    editTask,
    deleteTask,
    selectTask,
    selectAllTasks,
    deleteSelectedTasks,
    setTasks,
    setLoading,
    removeLoading,
  };
};

ToDoWithRedux.propTypes = {
  tasks: propTypes.array,
  selectedTasksIDs: propTypes.instanceOf(Set),
  isOpenAddEditTaskModal: propTypes.bool,
  isOpenConfirmModal: propTypes.bool,
  editableTask: propTypes.object,
  selectedSingleTask: propTypes.object,
  loading: propTypes.bool.isRequired,
  toggleHideAddEditTaskModal: propTypes.func.isRequired,
  toggleHideConfirmModal: propTypes.func.isRequired,
  toggleSetEditableTask: propTypes.func.isRequired,
  addTask: propTypes.func.isRequired,
  editTask: propTypes.func.isRequired,
  deleteTask: propTypes.func.isRequired,
  selectTask: propTypes.func.isRequired,
  selectAllTasks: propTypes.func.isRequired,
  deleteSelectedTasks: propTypes.func.isRequired,
  setTasks: propTypes.func.isRequired,
  setLoading: propTypes.func.isRequired,
  removeLoading: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ToDoWithRedux));
