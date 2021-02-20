import React from "react";
import Task from "../Task/Task";
import AddTask from "../AddTask/AddTask";
import styles from "./toDo.module.css";

class ToDo extends React.Component {
  state = {
    tasks: ["Task 1", "Task 2", "Task 3"],
  };

  handleSubmit = (value) => {
    const tasks = [...this.state.tasks];
    tasks.push(value);

    this.setState({
      tasks,
    });
  };

  render() {
    const tasksJSX = this.state.tasks.map(function (task, index) {
      return <Task key={index} task={task} />;
    });
    return (
      <div className={styles.ToDo}>
        <h1 className={styles.heading1}>ToDo Component</h1>
        <AddTask handleSubmit={this.handleSubmit} />
        <div className={styles.tasks_wrapper}>{tasksJSX}</div>
      </div>
    );
  }
}

export default ToDo;
