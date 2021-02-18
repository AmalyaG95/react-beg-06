import React from "react";
import AddNewTask from "./AddNewTask";

class ToDo extends React.Component {
  state = {
    tasks: ["Task 1", "Task 2", "Task 3"],
    inputValue: "",
  };

  setInputValue = (value) => {
    this.setState({ inputValue: value });
  };

  render() {
    console.log(this.state.inputValue);

    return (
      <div>
        <h1>ToDo Component</h1>
        <AddNewTask setInputValue={this.setInputValue} />
      </div>
    );
  }
}

export default ToDo;
