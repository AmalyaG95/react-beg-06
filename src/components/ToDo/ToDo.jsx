import React from "react";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import uuid from "react-uuid";
import Task from "../Task/Task";
// import AddTaskModal from "../AddTaskModal/AddTaskModal";
// import EditTaskModal from "../EditTaskModal/EditTaskModal";
import AddEditTaskModal from "../AddEditTaskModal/AddEditTaskModal";

import ConfirmModal from "../ConfirmModal/ConfirmModal";

const ContainerCls = ["d-flex", "flex-column", "align-content-center", "py-2"];

const delSelButtonsColCls = [
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "mt-2",
  "position-fixed",
  styles.delSelButtons,
];

class ToDo extends React.Component {
  state = {
    tasks: [
      {
        _id: uuid(),
        title: "Task 1 ",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        _id: uuid(),
        title: "Task 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        _id: uuid(),
        title: "Task 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    ],
    selectedTasksIDs: new Set(),
    // isOpenAddTaskModal: false,
    // isOpenEditTaskModal: false,
    isOpenAddEditTaskModal: false,
    isOpenConfirmModal: false,
    editableTask: null,
    clickedButton: null,
  };

  handleAddTask = (inputsData) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      title: inputsData.title,
      description: inputsData.description,
      _id: uuid(),
    });

    this.setState({
      tasks,
    });
  };

  handleDeleteTask = (_id) => {
    const tasks = [...this.state.tasks].filter((task) => task._id !== _id);

    this.setState({
      tasks,
    });
  };

  handleSelectTask = (_id) => {
    const selectedTasksIDs = new Set(this.state.selectedTasksIDs);
    if (selectedTasksIDs.has(_id)) {
      selectedTasksIDs.delete(_id);
      this.handleSelectAllTasks();
    } else {
      selectedTasksIDs.add(_id);
    }

    this.setState({
      selectedTasksIDs,
    });
  };

  handleSelectAllTasks = () => {
    const selectedTasksIDs = new Set(this.state.selectedTasksIDs);
    this.state.tasks.forEach((task) => {
      if (!selectedTasksIDs.has(task._id)) selectedTasksIDs.add(task._id);
    });

    this.setState({
      selectedTasksIDs:
        this.state.selectedTasksIDs.size !== this.state.tasks.length
          ? selectedTasksIDs
          : new Set(),
    });
  };

  handleDeleteSelectedTasks = () => {
    const { selectedTasksIDs } = this.state;
    const tasks = [...this.state.tasks].filter(
      (task) => !selectedTasksIDs.has(task._id)
    );

    this.setState({
      tasks,
      selectedTasksIDs: new Set(),
    });
  };

  handleEditTask = (editableTask) => {
    const tasks = [...this.state.tasks];
    const ind = tasks.findIndex((task) => task._id === editableTask._id);
    tasks[ind] = editableTask;

    this.setState({
      tasks,
    });
  };

  // toggleHideAddTaskModal = () => {
  //   this.setState({ isOpenAddTaskModal: !this.state.isOpenAddTaskModal });
  // };

  // toggleHideEditTaskModal = () => {
  //   this.setState({
  //     isOpenEditTaskModal: !this.state.isOpenEditTaskModal,
  //   });
  // };

  toggleHideAddEditTaskModal = () => {
    this.setState({
      isOpenAddEditTaskModal: !this.state.isOpenAddEditTaskModal,
    });
  };

  toggleHideConfirmModal = () => {
    this.setState({ isOpenConfirmModal: !this.state.isOpenConfirmModal });
  };

  getSelectedSingleTask = () => {
    const { tasks, selectedTasksIDs } = this.state;
    let id = null;

    if (selectedTasksIDs.size !== 1) return;
    selectedTasksIDs.forEach((_id) => {
      id = _id;
    });

    return tasks.find((task) => task._id === id);
  };

  setEditableTask = (editableTask, clickedButton) => {
    this.setState({
      editableTask,
      clickedButton,
    });
  };

  handleAdd = (e) => {
    this.toggleHideAddEditTaskModal();
    console.log(e.currentTarget.value);
    this.setState({
      clickedButton: e.currentTarget.value,
    });
  };

  removeEditableTask = () => {
    this.setState({
      editableTask: null,
    });
  };

  render() {
    const {
      tasks,
      selectedTasksIDs,
      editableTask,
      clickedButton,
      // isOpenAddTaskModal,
      // isOpenEditTaskModal,
      isOpenAddEditTaskModal,
      isOpenConfirmModal,
    } = this.state;

    //console.log(clickedButton);

    const tasksJSX = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} md={4} xl={3} className="my-2 ">
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleSelectTask={this.handleSelectTask}
            setEditableTask={this.setEditableTask}
            onHide={this.toggleHideAddEditTaskModal}
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
        <Container className={ContainerCls.join(" ")}>
          <Row>
            <Col>
              <h1 className={styles.heading1}>ToDo Component</h1>
              <Button
                variant="info"
                onClick={this.handleAdd}
                className={styles.addTaskButton}
                disabled={!!selectedTasksIDs.size}
                value="Add Task"
              >
                Add Task
              </Button>
            </Col>
          </Row>

          <Row className="mt-1 mb-5">
            {tasksJSX.length ? (
              tasksJSX
            ) : (
              <Col className="align-self-center mt-5">NO TASKS !</Col>
            )}
          </Row>

          <Row className="justify-content-center">
            <Col className={delSelButtonsColCls.join(" ")}>
              <div className={styles.select}>
                <Form.Label htmlFor="selectAll" className="mr-2">
                  Select All
                </Form.Label>
                <Form.Check
                  type="checkbox"
                  id="selectAll"
                  onChange={this.handleSelectAllTasks}
                  checked={
                    tasks.length && selectedTasksIDs.size === tasks.length
                  }
                  disabled={!tasks.length}
                />
              </div>
              <Button
                variant="danger"
                onClick={this.toggleHideConfirmModal}
                disabled={!selectedTasksIDs.size}
              >
                Delete All Selected
              </Button>
            </Col>
          </Row>
        </Container>

        {/* {isOpenAddTaskModal && (
          <AddTaskModal
            onSubmit={this.handleSubmit}
            onHide={this.toggleHideAddTaskModal}
          />
        )}

        {isOpenAddTaskModal && (
          <EditTaskModal
            editableTask={editableTask}
            onSubmit={this.handleEditTask}
            onHide={this.toggleHideEditTaskModal}
            removeEditableTask={this.removeEditableTask}
          />
        )} */}

        {isOpenAddEditTaskModal && (
          <AddEditTaskModal
            editableTask={editableTask}
            clickedButton={clickedButton}
            onSubmitAddTask={this.handleAddTask}
            onSubmitEditTask={this.handleEditTask}
            onHide={this.toggleHideAddEditTaskModal}
            removeEditableTask={this.removeEditableTask}
          />
        )}

        {isOpenConfirmModal && (
          <ConfirmModal
            onSubmit={this.handleDeleteSelectedTasks}
            onHide={this.toggleHideConfirmModal}
            countOrOneTaskTitle={
              selectedTasksIDs.size > 1
                ? selectedTasksIDs.size
                : this.getSelectedSingleTask().title
            }
          />
        )}
      </>
    );
  }
}

export default ToDo;
