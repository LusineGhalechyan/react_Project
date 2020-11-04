import React, { Component } from "react";
import idGenerator from "../../helpers/idGenerator";
import Task from "../Task/Task";

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
  };

  handleChangeInput = (event) => {
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
    const { tasks, inputValue } = this.state;
    const addTasks = (
      <ol>
        {tasks.map((task) => (
          <Task key={idGenerator()} task={task} />
        ))}
      </ol>
    );
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
        {addTasks}
      </div>
    );
  }
}

export default ToDo;
