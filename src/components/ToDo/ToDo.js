import React, { Component } from "react";
import idGenerator from "../../helpers/idGenerator";
import Task from "../Task/Task";
import styles from "./ToDo.module.scss";
import {
  Col,
  Row,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import ArmFlag from "../ArmFlag/ArmFlag";

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
    selectedTasksIds: new Set(),
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

    const newTask = {
      text: inputValue,
      _id: idGenerator(),
    };

    this.setState({
      tasks: [...tasks, newTask],
      inputValue: "",
    });
  };

  removeTask = (task) => {
    const { tasks } = this.state;
    const filteredTasks = tasks.filter((t) => t._id !== task._id);
    this.setState({
      tasks: filteredTasks,
    });
  };

  handleCheck = (taskId) => {
    const { selectedTasksIds } = this.state;

    const _selectedTasksIds = new Set(selectedTasksIds);

    _selectedTasksIds.has(taskId)
      ? _selectedTasksIds.delete(taskId)
      : _selectedTasksIds.add(taskId);

    this.setState({
      selectedTasksIds: _selectedTasksIds,
    });
  };

  removeSelectedTasks = () => {
    let { tasks, selectedTasksIds } = this.state;

    selectedTasksIds.forEach((id) => {
      tasks = tasks.filter((t) => t._id !== id);
    });

    this.setState({
      tasks,
      selectedTasksIds: new Set(),
    });
  };

  render() {
    const { tasks, inputValue, selectedTasksIds } = this.state;
    const addTasks = (
      <Row>
        {tasks.map((task) => (
          <Col key={task._id} xs={12} md={4}>
            <Task
              task={task}
              onRemove={this.removeTask}
              onCheck={this.handleCheck}
              disabled={selectedTasksIds.size}
            />
          </Col>
        ))}
      </Row>
    );

    return (
      <Container>
        <Row className="justify-content-center">
          <ArmFlag />
          <Col xs={12} md={10} lg={8}>
            <InputGroup className="mb-4">
              <FormControl
                type="text"
                value={inputValue}
                disabled={selectedTasksIds.size}
                aria-label="task's name"
                aria-describedby="data"
                placeholder="Type your task"
                onChange={this.handleInputChange}
                onKeyDown={this.handleOnKeyDown}
              />
              <InputGroup.Append>
                <Button
                  type="submit"
                  className={`${styles.addTaskButton} ml-2`}
                  disabled={!inputValue}
                >
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        {addTasks}
        <Row className="text-center">
          <Col>
            <Button
              variant="danger"
              onClick={this.removeSelectedTasks}
              disabled={!selectedTasksIds.size}
            >
              Remove selected
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ToDo;
