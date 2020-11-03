import React, { Component } from "react";
import Task from "../Tasks/Task/Task";

// document.addEventListener("DOMContentLoaded", () => {
//   document.querySelector("p").innerHTML = null;
// });

class ToDo extends Component {
  state = {
    tasks: [""],
    inputValue: "",
  };

  handleChangeInput = (event) => {
    // console.log("event.target.value", event.target.value);
    this.setState({ inputValue: event.target.value });
  };

  handleAddTask = () => {
    const { tasks, inputValue } = this.state;
    this.setState({
      tasks: [...tasks, inputValue],
      inputValue: "",
    });
  };
  render() {
    // console.log("tasks", this.state.tasks);
    // console.log("input", this.state.inputValue);
    const { tasks, inputValue } = this.state;
    return (
      <div>
        <div>
          <span role="img" aria-label="ArmenianFlag">
            💖💙🧡
          </span>
        </div>
        <input
          type="text"
          value={inputValue}
          style={{ marginTop: "5px" }}
          placeholder="Type your task"
          onChange={this.handleChangeInput}
        />
        <button onClick={this.handleAddTask}>Add task</button>
        {tasks.map((task, index) => (
          <Task key={index} task={task}></Task>
        ))}
      </div>
    );
  }
}

export default ToDo;
