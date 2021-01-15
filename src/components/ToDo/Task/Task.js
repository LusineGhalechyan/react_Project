import React, { PureComponent } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Task.module.scss";
import PropTypes from "prop-types";
import { formatDate } from "../../../helpers/utils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  removeTaskMiddleWare,
  changeTaskStatusMiddleWare,
} from "../../../redux/actions";
import { trimString } from "../../../helpers/trimString";

class Task extends PureComponent {
  state = {
    isSelected: this.props.isSelected,
    selected: false,
    className: "",
    taskStatusClassName: "",
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

  render() {
    const { task, disabled, onEdit } = this.props;
    const { className, taskStatusClassName } = this.state;
    task.status === "active" &&
      this.setState({ taskStatusClassName: "cardTextStatusActive" });
    task.status === "done" &&
      this.setState({ taskStatusClassName: "cardTextStatusDone" });

    return (
      <Card className={`${styles[className]} mb-3`}>
        <Card.Body>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" onClick={this.handleCheck} />
          </Form.Group>
          <Card.Title>
            <Link to={`${"/task/"}${task._id}`} className={styles.taskCardLink}>
              {trimString(task.title, 20)}
            </Link>
          </Card.Title>
          <Card.Text
            className={`${styles.cardTextDate} ${styles.limitTextLength}`}
          >
            <strong>Description: </strong>
            {task.description}
          </Card.Text>
          <Card.Text className={styles[taskStatusClassName]}>
          {/* <Card.Text className={styles.cardTextStatusActive}> */}
            <strong> Status: {task.status}</strong>
          </Card.Text>
          <Card.Text className={styles.cardTextDate}>
            <strong> Date: </strong> {formatDate(task.date)}
          </Card.Text>
          <Card.Text className={styles.cardTextDate}>
            <strong>Created_at: </strong> {formatDate(task.created_at)}
          </Card.Text>
          {task.status === "active" ? (
            <Button
              variant="success"
              disabled={disabled}
              onClick={() =>
                this.props.changeTaskStatusMiddleWare(
                  task,
                  { status: "done" },
                  "tasks"
                )
              }
              className={`${styles.buttonStatusActive}`}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          ) : (
            <Button
              variant="warning"
              disabled={disabled}
              onClick={() =>
                this.props.changeTaskStatusMiddleWare(
                  task,
                  { status: "active" },
                  "tasks"
                )
              }
              className={`${styles.buttonStatusDone}`}
            >
              <FontAwesomeIcon icon={faHistory} />
            </Button>
          )}

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
            onClick={() => this.props.removeTaskMiddleWare(task)}
            // className={styles.buttonDanger}
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
  onCheck: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  disabled: PropTypes.number.isRequired,
};

const mapDispatchToProps = {
  removeTaskMiddleWare,
  changeTaskStatusMiddleWare,
};

export default connect(null, mapDispatchToProps)(Task);
