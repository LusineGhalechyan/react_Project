import React, { PureComponent } from "react";
import styles from "./NewTasksInput.module.scss";
import idGenerator from "../../../helpers/idGenerator";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import PropTypes from "prop-types";

class NewTasksInput extends PureComponent {
  state = {
    tasks: this.props.tasks,
    inputValue: "",
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleOnKeyDown = (event) => {
    const { inputValue } = this.state;
    return inputValue && event.key === "Enter" ? this.handleAddTask() : 0;
  };

  handleAddTask = () => {
    const { tasks, inputValue } = this.state;
    const { onStateChange } = this.props;

    if (!inputValue) return false;

    const newTask = {
      text: inputValue,
      _id: idGenerator(),
    };

    this.setState(
      {
        tasks: [...tasks, newTask],
        inputValue: "",
      },
      () => {
        onStateChange(this.state.tasks);
      }
    );
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue.length + 1) return false;
  }

  render() {
    const { inputValue } = this.state;
    const { disabled } = this.props;

    return (
      <InputGroup className="mb-4">
        <FormControl
          type="text"
          value={inputValue}
          disabled={disabled}
          onChange={this.handleInputChange}
          onKeyDown={this.handleOnKeyDown}
          aria-label="task's name"
          aria-describedby="data"
          placeholder="Type your task"
        />
        <InputGroup.Append>
          <Button
            type="submit"
            className={`${styles.addTaskButton} ml-2`}
            disabled={disabled}
            onClick={this.handleAddTask}
          >
            Add
          </Button>
        </InputGroup.Append>
      </InputGroup>
    );
  }
}

NewTasksInput.propTypes = {
  tasks: PropTypes.array.isRequired,
  disabled: PropTypes.number,
  onStateChange: PropTypes.func.isRequired,
};

export default NewTasksInput;
