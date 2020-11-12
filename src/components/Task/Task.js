import React, { PureComponent } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./Task.module.scss";

class Task extends PureComponent {
  state = {
    selected: false,
    className: "",
  };

  handleCheck = () => {
    let { selected, className } = this.state;
    const { onCheck, task } = this.props;

    this.setState({ selected: !selected });

    selected
      ? this.setState({ ...className, className: "" })
      : this.setState({ ...className, className: "selected" });

    onCheck(task._id);
  };

  componentDidUpdate(prevProps) {
    if (typeof prevProps === "object") return false;
  }

  render() {
    const { task, disabled } = this.props;
    const { className } = this.state;
    return (
      <Card className={`${styles[className]} mb-3`}>
        <Card.Body>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" onClick={this.handleCheck} />
          </Form.Group>
          <Card.Title>{task.text.slice(0, 5) + "..."}</Card.Title>
          <Card.Text>{task.text}</Card.Text>
          <Button
            variant="warning"
            className={styles.buttonWarning}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            onClick={() => this.props.onRemove(task)}
            disabled={disabled}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

export default Task;
