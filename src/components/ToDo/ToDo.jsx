import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import styles from "./toDo.module.css";
import { Container, Row, Col } from "react-bootstrap";
import uuid from "react-uuid";

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

  render() {
    const tasksJSX = this.state.tasks.map((task) => {
      return (
        <Col
          key={task._id}
          xs={12}
          sm={4}
          xl={2}
          className="d-flex justify-content-center my-2"
        >
          <Task task={task} handleDeleteTask={this.handleDeleteTask} />
        </Col>
      );
    });

    return (
      <Container className="w-90 px-4 py-2">
        <Row>
          <Col>
            <h1 className={styles.heading1}>ToDo Component</h1>
            <AddTask handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Row>
          {tasksJSX.length ? (
            tasksJSX
          ) : (
            <Col className="d-flex justify-content-center">NO TASKS !</Col>
          )}
        </Row>
      </Container>
    );
  }
}

export default ToDo;
