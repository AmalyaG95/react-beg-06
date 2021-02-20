import React, { Component } from "react";
import styles from "./addTask.module.css";

class AddTask extends Component {
  state = {
    inputValue: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
    });
  };

  handleS = () => {
    const { handleSubmit } = this.props;

    if (!this.state.inputValue) return;
    handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    return (
      <div>
        <h1 style={{ marginTop: "10px" }}>AddTask Component</h1>
        <div className={styles.AddTask}>
          <input
            type="text"
            placeholder="Add Task"
            onChange={this.handleChange}
            value={this.state.inputValue}
            className={styles.input}
          />
          <button onClick={this.handleS} className={styles.button}>
            Add
          </button>
        </div>
      </div>
    );
  }
}

export default AddTask;
