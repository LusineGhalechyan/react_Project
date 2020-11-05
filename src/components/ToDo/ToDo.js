import React, { Component } from "react";
import idGenerator from "../../helpers/idGenerator";
import ArmFlag from "../ArmFlag/ArmFlag";
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
          <Col key={idGenerator()}>
            <Task task={task} />
          </Col>
        ))}
      </ol>
    );

    const formControllClass = styles.formcontrol;
    const splitSecondPart = formControllClass.split("_")[1];
    const getIndex = splitSecondPart.indexOf("c");
    const form = splitSecondPart.substr(0, getIndex);
    const control = splitSecondPart.substr(getIndex);
    const formControl = form + "-" + control;

    console.log("splittedClass", formControl);

    return (
      <div className={styles.toDoContentContainer}>
        <div>
          <ArmFlag />
        </div>
        <Container>
          <Row sm={2}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                value={inputValue}
                aria-label="task's name"
                aria-describedby="data"
                placeholder="Type your task"
                className={formControl}
                onChange={this.handleChangeInput}
              />
              <InputGroup.Append>
                <Button
                  onClick={this.handleAddTask}
                  className={`${styles.addTaskButton} ml-2`}
                >
                  Add task
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Row>
          {addTasks}
        </Container>
      </div>
    );
  }
}

export default ToDo;
