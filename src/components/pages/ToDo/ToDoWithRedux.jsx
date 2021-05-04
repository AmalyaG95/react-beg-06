import { useEffect, memo } from "react";
import { connect } from "react-redux";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../../Task/Task";
import Search from "../../Search/Search";
import AddEditTaskModalWithRedux from "../../AddEditTaskModal/AddEditTaskModalWithRedux";
import Spinner from "../../Spinner/Spinner";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";
import propTypes from "prop-types";
import types from "../../../Redux/actionTypes";
import {
  getTasksThunk,
  addTaskThunk,
  editTaskThunk,
  deleteTaskThunk,
  deleteSelectedTasksThunk,
  changeTaskStatusThunk,
} from "../../../Redux/actions";

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
    isRequestEnded,
  },
  loading,
  // functions
  toggleHideAddEditTaskModal,
  toggleHideConfirmModal,
  toggleSetEditableTask,
  selectTask,
  selectAllTasks,
  handleChangeTaskStatus,
  resetData,
  getTasks,
  handleAddTask,
  handleEditTask,
  handleDeleteTask,
  handleDeleteSelectedTasks,
}) => {
  useEffect(() => {
    getTasks();
    return () => {
      resetData();
    };
  }, [getTasks, resetData]);

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
          handleChangeTaskStatus={handleChangeTaskStatus}
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
      <Container className={ContainerCls} fluid>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <Button
              variant="info"
              onClick={toggleHideAddEditTaskModal}
              className={styles.addTaskButton}
            >
              Add Task
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Search />
          </Col>
        </Row>
        <Row className="mt-1 mb-5 justify-content-center">
          {!!tasksJSX.length && tasksJSX}
          {isRequestEnded && !tasksJSX.length && (
            <Col className={noTasksCls.join(" ")}> NO TASKS !</Col>
          )}
        </Row>
        {!!selectedTasksIDs.size && (
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
                  checked={
                    tasks.length && selectedTasksIDs.size === tasks.length
                  }
                />
              </div>
              <Button variant="danger" onClick={toggleHideConfirmModal}>
                Delete All Selected
              </Button>
            </Col>
          </Row>
        )}
      </Container>

      {isOpenAddEditTaskModal && (
        <AddEditTaskModalWithRedux
          editableTask={editableTask}
          onSubmit={editableTask ? handleEditTask : handleAddTask}
          onHide={() => toggleHideAddEditTaskModal(editableTask)}
        />
      )}

      {isOpenConfirmModal && (
        <ConfirmModal
          onSubmit={() => handleDeleteSelectedTasks(selectedTasksIDs)}
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
  selectTask: propTypes.func.isRequired,
  selectAllTasks: propTypes.func.isRequired,
  handleChangeTaskStatus: propTypes.func.isRequired,
  resetData: propTypes.func.isRequired,
  getTasks: propTypes.func.isRequired,
  handleAddTask: propTypes.func.isRequired,
  handleEditTask: propTypes.func.isRequired,
  handleDeleteTask: propTypes.func.isRequired,
  handleDeleteSelectedTasks: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    ToDoState,
    globalState: { loading },
  } = state;

  return {
    ToDoState,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const toggleHideAddEditTaskModal = (editableTask) => {
    dispatch({ type: types.SET_IS_OPEN_TASK_MODAL });
    if (editableTask)
      dispatch({ type: types.SET_EDITABLE_TASK, editableTask: null });
  };
  const toggleHideConfirmModal = () => {
    dispatch({ type: types.SET_IS_OPEN_CONFIRM_MODAL });
  };
  const toggleSetEditableTask = (editableTask = null) => {
    dispatch({ type: types.SET_EDITABLE_TASK, editableTask });
  };
  const selectTask = (_id) => {
    dispatch({ type: types.SELECT_TASK, _id });
  };
  const selectAllTasks = (_id) => {
    dispatch({ type: types.SELECT_ALL_TASKS, _id });
  };
  const handleChangeTaskStatus = (task) => {
    dispatch(() => changeTaskStatusThunk(dispatch, task, "ToDo"));
  };
  const resetData = () => {
    dispatch({ type: types.RESET_TODO_DATA });
  };
  const getTasks = () => {
    dispatch(getTasksThunk);
  };
  const handleAddTask = (newTaskData) => {
    dispatch(() => addTaskThunk(dispatch, newTaskData));
  };
  const handleEditTask = (editableTaskData, editableTask) => {
    dispatch(() =>
      editTaskThunk(dispatch, editableTaskData, editableTask, "ToDo")
    );
  };
  const handleDeleteTask = (_id) => {
    dispatch(() => deleteTaskThunk(dispatch, _id));
  };
  const handleDeleteSelectedTasks = (selectedTasksIDs) => {
    dispatch(() => deleteSelectedTasksThunk(dispatch, selectedTasksIDs));
  };

  return {
    toggleHideAddEditTaskModal,
    toggleHideConfirmModal,
    toggleSetEditableTask,
    selectTask,
    selectAllTasks,
    handleChangeTaskStatus,
    resetData,
    getTasks,
    handleAddTask,
    handleEditTask,
    handleDeleteTask,
    handleDeleteSelectedTasks,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ToDoWithRedux));
