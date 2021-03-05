import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import uuid from "react-uuid";

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
            isAllChecked={
              this.state.selectedTasksIDs.size &&
              this.state.selectedTasksIDs.size === this.state.tasks.length
            }
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
          {/* <Row className={styles.delSelButtons}> */}
          <Col className={delSelButtonsColCls.join(" ")}>
            <div className={styles.select}>
              <Form.Label htmlFor="selectAll" className="mr-1">
                Select All
              </Form.Label>
              <Form.Check
                type="checkbox"
                id="selectAll"
                onChange={this.handleSelectAllTasks}
                checked={
                  this.state.tasks.length &&
                  this.state.selectedTasksIDs.size === this.state.tasks.length
                }
                disabled={!this.state.tasks.length}
              />
            </div>
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
