import React, { PureComponent } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { backendUrl } from "../../../../helpers/backendUrl";
import styles from "./SingleTask.module.scss";
import { formatDate } from "../../../../helpers/utils";
import Spinner from "../../Spinner/Spinner";
// import EditTaskModal from "../../EditTaskModal/EditTaskModal";

class SingleTask extends PureComponent {
  state = {
    task: null,
    // editATask: !!null,
  };

  async componentDidMount() {
    const taskId = this.props.match.params.id;

    try {
      const response = await axios.get(`${backendUrl}${"/task/"}${taskId}`);
      this.setState({ task: response.data });
    } catch (error) {
      console.log(error);
    }
  }

  removeATask = () => {
    const taskId = this.state.task._id;

    axios
      .delete(`${backendUrl}${"/task/"}${taskId}`)
      .then(() => {
        this.props.history.push("/");
      })
      .catch((error) => console.log(error));
  };

  // toggleEditModal = () => {
  //   const { editATask } = this.state;
  //   this.setState({ editATask: !editATask });
  // };

  render() {
    const { task } = this.state;

    return (
      <>
        {!!task ? (
          <div className={styles.singleTaskCardRow}>
            <Card className={styles.singleTaskCardContainer}>
              <Card.Body>
                <Card.Title className={styles.singleTaskCardTitle}>
                  Task Title: {task.title.slice(0, 5) + "..."}
                </Card.Title>
                <Card.Text className={styles.singleTaskCardText}>
                  <strong>Description: </strong>
                  {!!task.description
                    ? task.description
                    : `Task's description isn't mentioned !`}
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
            {/* {editATask && (
              <EditTaskModal
                task={task}
                onSave={this.saveTask}
                onClose={this.toggleEditModal}
              />
            )} */}
          </div>
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

export default SingleTask;
