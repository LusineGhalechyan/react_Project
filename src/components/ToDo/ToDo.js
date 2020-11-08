import React, { Component } from "react";
import idGenerator from "../../helpers/idGenerator";
import Task from "../Task/Task";
import styles from "./ToDo.module.scss";
import {
  Col,
  Row,
  Container,
  Form,
  InputGroup,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import ArmFlag from "../ArmFlag/ArmFlag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

class ToDo extends Component {
  state = {
    tasks: [],
    inputValue: "",
  };

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  // handleOnKeyDown = (event) => {
  //   return event.key === "Enter" ? this.handleAddTask() : null;
  // };

  handleAddTask = (event) => {
    event.preventDefault();

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

  render() {
    const { tasks, inputValue } = this.state;
    const addTasks = (
      <Row>
        {tasks.map((task) => (
          <Col key={task._id} xs={12} md={4}>
            <Card className="mb-3">
              <Form.Group
                controlId="formBasicCheckbox"
                className={styles.checkBox}
              >
                <Form.Check type="checkbox" />
              </Form.Group>
              <Card.Body>
                <Card.Title>{task.text.slice(0, 5) + "..."}</Card.Title>
                <Card.Text>
                  <Task task={task.text} />
                </Card.Text>
                <Button variant="warning" className={styles.buttonWarning}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" onClick={() => this.removeTask(task)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    );

    return (
      <Container>
        <Row className="justify-content-center">
          <ArmFlag />
          <Col xs={12} md={10} lg={8}>
            <Form onSubmit={this.handleAddTask}>
              <InputGroup className="mb-4">
                <FormControl
                  type="text"
                  value={inputValue}
                  aria-label="task's name"
                  aria-describedby="data"
                  placeholder="Type your task"
                  onChange={this.handleInputChange}
                  // onKeyDown={this.handleOnKeyDown}
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
            </Form>
          </Col>
        </Row>
        {addTasks}
      </Container>
    );
  }
}

export default ToDo;
