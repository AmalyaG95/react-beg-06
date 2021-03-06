import React, { Component } from "react";
import styles from "./addTask.module.css";
import { Form, Button } from "react-bootstrap";

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
    };
  }

  handleChange = (e) => {
    const { value } = e.target;

    this.setState({
      inputValue: value,
    });
  };

  handleS = ({ key, type }) => {
    const { handleSubmit } = this.props;

    if (!this.state.inputValue || (type === "keypress" && key !== "Enter"))
      return;

    handleSubmit(this.state.inputValue);
    this.setState({
      inputValue: "",
    });
  };

  render() {
    const { isAnyChecked } = this.props;
    return (
      <div className={styles.AddTask}>
        <Form.Control
          type="text"
          placeholder="Add Task"
          onChange={this.handleChange}
          onKeyPress={this.handleS}
          value={this.state.inputValue}
          className={styles.input}
          disabled={isAnyChecked}
        />
        <Button
          variant="info"
          onClick={this.handleS}
          className={styles.button}
          disabled={isAnyChecked}
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTask;
