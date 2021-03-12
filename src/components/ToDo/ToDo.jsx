import React from "react";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import uuid from "react-uuid";
import Task from "../Task/Task";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
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
        description: "Task 1 description",
      },
      {
        _id: uuid(),
        title: "Task 2",
        description: "Task 2 description",
      },
      {
        _id: uuid(),
        title: "Task 3",
        description: "Task 3 description",
      },
    ],
    selectedTasksIDs: new Set(),
    isOpenAddTaskModal: false,
    isOpenConfirmModal: false,
  };

  handleSubmit = (inputsData) => {
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

  toggleHideAddTaskModal = () => {
    this.setState({ isOpenAddTaskModal: !this.state.isOpenAddTaskModal });
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

  render() {
    const {
      tasks,
      selectedTasksIDs,
      isOpenAddTaskModal,
      isOpenConfirmModal,
    } = this.state;

    const tasksJSX = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} sm={3} xl={2} className="my-2 ">
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleSelectTask={this.handleSelectTask}
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
                onClick={this.toggleHideAddTaskModal}
                className={styles.addTaskButton}
                disabled={!!selectedTasksIDs.size}
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

        {isOpenAddTaskModal && (
          <AddTaskModal
            onSubmit={this.handleSubmit}
            onHide={this.toggleHideAddTaskModal}
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
