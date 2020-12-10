import React, { PureComponent } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import styles from "./Task.module.scss";
import PropTypes from "prop-types";
import { formatDate } from "../../../helpers/utils";
import { Link } from "react-router-dom";

class Task extends PureComponent {
  state = {
    isSelected: this.props.isSelected,
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
    const { task, disabled, onEdit } = this.props;
    const { className } = this.state;

    return (
      <Card className={`${styles[className]} mb-3`}>
        <Card.Body>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" onClick={this.handleCheck} />
          </Form.Group>
          <Card.Title>
            <Link to={`${"/task/"}${task._id}`} className={styles.taskCardLink}>
              {task.title.slice(0, 5) + "..."}
            </Link>
          </Card.Title>
          <Card.Text className={styles.cardTextDate}>
            <strong>Description: </strong>
            {task.description}
          </Card.Text>
          <Card.Text className={styles.cardTextDate}>
            <strong> Date: </strong> {formatDate(task.date)}
          </Card.Text>
          <Card.Text className={styles.cardTextDate}>
            <strong>Created_at: </strong> {formatDate(task.created_at)}
          </Card.Text>
          <Button
            variant="warning"
            disabled={disabled}
            onClick={() => onEdit(task)}
            className={styles.buttonWarning}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
          <Button
            variant="danger"
            disabled={disabled}
            onClick={() => this.props.onRemove(task)}
            className={styles.buttonDanger}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  disabled: PropTypes.number.isRequired,
};

export default Task;
