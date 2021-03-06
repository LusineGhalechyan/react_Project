import React, { PureComponent } from "react";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./SingleTask.module.scss";
import { formatDate } from "../../../helpers/utils";
import EditTaskModal from "../../EditTaskModal/EditTaskModal";
import { connect } from "react-redux";
import {
  requestSingleTaskMiddleWare,
  removeTaskMiddleWare,
  changeTasksStatusMiddleWare,
} from "../../../redux/actions";
import NotFoundTask from "../NotFound/NotFoundPage/NotFoundTask/NotFoundTask";

class SingleTask extends PureComponent {
  state = {
    editATask: !!null,
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;
    this.props.requestSingleTaskMiddleWare(taskId);
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({ editATask: !!null });
    }

    if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
      this.props.history.push("/profile");
    }
  }

  removeATask = () => {
    const removableTask = this.props.task;
    const from = `single`;
    this.props.removeTaskMiddleWare(removableTask, from);
  };

  toggleEditModal = () => {
    const { editATask } = this.state;
    this.setState({ editATask: !editATask });
  };

  render() {
    const { editATask } = this.state;
    const { task } = this.props;

    return (
      <>
        {!!task ? (
          <div className={styles.singleTaskCardRow}>
            <Card className={styles.singleTaskCardContainer}>
              <Card.Body>
                <Card.Title className={styles.singleTaskCardTitle}>
                  Task Title: {task.title}
                </Card.Title>
                <Card.Text className={styles.singleTaskCardText}>
                  <strong>Description: </strong>
                  {!!task.description
                    ? task.description
                    : `Task's description isn't mentioned !`}
                </Card.Text>

                <Card.Text
                  className={
                    task.status === "active"
                      ? `${styles.singleTaskCardTextStatusActive}`
                      : `${styles.singleTaskCardTextStatusDone}`
                  }
                >
                  <strong> Status: {task.status}</strong>
                </Card.Text>

                <Card.Text className={styles.singleTaskCardText}>
                  <strong> Date: </strong>
                  {!!task.date
                    ? formatDate(task.date)
                    : `The deadline for completing the task isn't specified !`}
                </Card.Text>
                <Card.Text className={styles.singleTaskCardText}>
                  <strong>Created_at: </strong> {formatDate(task.created_at)}
                </Card.Text>

                {task.status === "active" ? (
                  <Button
                    variant="success"
                    onClick={() =>
                      this.props.changeTasksStatusMiddleWare(
                        task,
                        { status: "done" },
                        "single"
                      )
                    }
                    className={`${styles.singleTaskButtonStatusActive}`}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    onClick={() =>
                      this.props.changeTasksStatusMiddleWare(
                        task,
                        { status: "active" },
                        "single"
                      )
                    }
                    className={`${styles.singleTaskButtonStatusDone}`}
                  >
                    <FontAwesomeIcon icon={faHistory} />
                  </Button>
                )}

                <Button
                  variant="warning"
                  onClick={this.toggleEditModal}
                  className={styles.singleTaskCardButtonWarning}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
                <Button variant="danger" onClick={this.removeATask}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </Card.Body>
            </Card>
            {editATask && (
              <EditTaskModal
                editTask={task}
                from="single"
                onClose={this.toggleEditModal}
              />
            )}
          </div>
        ) : (
          <NotFoundTask />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    task: state.task,
    editTaskSuccess: state.editTaskSuccess,
    removeTaskSuccess: state.removeTaskSuccess,
  };
};

const mapDispatchToProps = {
  requestSingleTaskMiddleWare,
  removeTaskMiddleWare,
  changeTasksStatusMiddleWare,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
