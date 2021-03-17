import React from "react";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import uuid from "react-uuid";
import Task from "../Task/Task";
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
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        _id: uuid(),
        title: "Task 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
      {
        _id: uuid(),
        title: "Task 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      },
    ],
    selectedTasksIDs: new Set(),
    isOpenAddEditTaskModal: false,
    isOpenConfirmModal: false,
    editableTask: null,
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

  toggleSetEditableTask = (editableTask = null) => {
    this.setState({
      editableTask,
    });
  };

  handleSubmit = (taskData) => {
    const tasks = [...this.state.tasks];
    if (!this.state.editableTask) {
      tasks.push(taskData);
    } else {
      const ind = tasks.findIndex((task) => task._id === taskData._id);
      tasks[ind] = taskData;
      this.toggleSetEditableTask();
    }
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
      selectedTasksIDs.add(task._id);
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

  toggleHideAddEditTaskModal = () => {
    this.setState({
      isOpenAddEditTaskModal: !this.state.isOpenAddEditTaskModal,
    });
    if (this.state.editableTask) this.toggleSetEditableTask();
  };

  toggleHideConfirmModal = () => {
    this.setState({ isOpenConfirmModal: !this.state.isOpenConfirmModal });
  };

  render() {
    const {
      tasks,
      selectedTasksIDs,
      editableTask,
      isOpenAddEditTaskModal,
      isOpenConfirmModal,
    } = this.state;

    const tasksJSX = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} md={4} xl={3} className="my-2 ">
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleSelectTask={this.handleSelectTask}
            setEditableTask={this.toggleSetEditableTask}
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
                onClick={this.toggleHideAddEditTaskModal}
                className={styles.addTaskButton}
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

        {isOpenAddEditTaskModal && (
          <AddEditTaskModal
            editableTask={editableTask}
            onSubmit={this.handleSubmit}
            onHide={this.toggleHideAddEditTaskModal}
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
