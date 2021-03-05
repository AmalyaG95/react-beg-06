import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import uuid from "react-uuid";

const ContainerCls = ["d-flex", "flex-column", "align-content-center", "py-2"];

const delButtonColCls = [
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "mt-2",
  "position-fixed",
  styles.delButton,
];

class ToDo extends React.Component {
  state = {
    tasks: [
      {
        _id: uuid(),
        title: "Task 1 ",
      },
      {
        _id: uuid(),
        title: "Task 2",
      },
      {
        _id: uuid(),
        title: "Task 3",
      },
    ],
    selectedTasksIDs: new Set(),
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push({
      title: value,
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

  render() {
    const { tasks, selectedTasksIDs } = this.state;
    const tasksJSX = tasks.map((task) => {
      return (
        <Col key={task._id} xs={6} sm={3} xl={2} className="my-2 ">
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleSelectTask={this.handleSelectTask}
            isChecked={selectedTasksIDs.has(task._id)}
            isAnyChecked={!!selectedTasksIDs.size}
          />
        </Col>
      );
    });

    return (
      <Container className={ContainerCls.join(" ")}>
        <Row>
          <Col>
            <h1 className={styles.heading1}>ToDo Component</h1>
            <AddTask
              handleSubmit={this.handleSubmit}
              isAnyChecked={!!selectedTasksIDs.size}
            />
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
          <Col className={delButtonColCls.join(" ")}>
            <Button
              variant="danger"
              onClick={this.handleDeleteSelectedTasks}
              className={styles.button}
              disabled={!selectedTasksIDs.size}
            >
              Delete All Selected
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ToDo;
