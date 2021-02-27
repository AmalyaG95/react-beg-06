import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import styles from "./toDo.module.css";
import { Container, Row, Col } from "react-bootstrap";

class ToDo extends React.Component {
  state = {
    tasks: ["Task 1", "Task 2", "Task 3"],
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks, value];

    this.setState({
      tasks,
    });
  };

  render() {
    const tasksJSX = this.state.tasks.map((task, index) => {
      return (
        <Col
          key={index}
          xs={12}
          sm={4}
          xl={2}
          className="d-flex justify-content-center my-2"
        >
          <Task task={task} />
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
        <Row>{tasksJSX}</Row>
      </Container>
    );
  }
}

export default ToDo;
