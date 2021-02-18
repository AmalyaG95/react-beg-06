import React, { Component } from "react";

class AddNewTask extends Component {
  state = { inputValue: "" };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({
      inputValue: value,
    });
  };

  handleSubmit = () => {
    const { setInputValue } = this.props;
    setInputValue(this.state.inputValue);
  };

  render() {
    return (
      <div>
        <h2>AddNewTask Component</h2>
        <div>
          <input
            style={{ margin: "10px" }}
            type="text"
            placeholder="Add Task"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Add</button>
        </div>
      </div>
    );
  }
}

export default AddNewTask;
