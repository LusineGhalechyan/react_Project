import React, { PureComponent } from "react";
import Task from "./Task/Task";
import { Col, Row, Container, Button } from "react-bootstrap";
import ArmFlag from "./ArmFlag/ArmFlag";
import NewTasksInput from "./NewTasksInput/NewTasksInput";
import Confirm from "./Confirm/Confirm";
import EditTaskModal from "./EditTaskModal/EditTaskModal";
import axios from "axios";
import { backendUrl } from "../../helpers/backendUrl";

class ToDo extends PureComponent {
  state = {
    tasks: [],
    selectedTasksIds: new Set(),
    showConfirm: false,
    editTask: null,
  };

  async componentDidMount() {
    try {
      const response = await axios.get(`${backendUrl}${"/task"}`);
      if (!response.data.length)
        throw new Error("There is no any task in DataBase");
      this.setState({
        tasks: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleAddTask = (newTask) => {
    axios
      .post(`${backendUrl}${"/task"}`, newTask)
      .then((response) => {
        this.setState({
          tasks: [...this.state.tasks, response.data],
        });
      })
      .catch((error) => console.log(error, "Failed to fetch data"));
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

  removeTask = (task) => {
    const { tasks } = this.state;

    axios
      .delete(`${backendUrl}${"/task/"}${task._id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    const filteredTasks = tasks.filter((t) => t._id !== task._id);
    this.setState({
      tasks: filteredTasks,
    });
  };

  removeSelectedTasks = () => {
    let { selectedTasksIds } = this.state;
    let tasks = [...this.state.tasks];

    const axiosPatchRequestValue = {
      tasks: [...selectedTasksIds],
    };
    axios
      .patch(`${backendUrl}${"/task/"}`, axiosPatchRequestValue)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));

    selectedTasksIds.forEach((id) => {
      tasks = tasks.filter((t) => t._id !== id);
    });

    this.setState({
      tasks,
      selectedTasksIds: new Set(),
      showConfirm: false,
    });
  };

  toggleConfirm = () => {
    this.setState({
      showConfirm: !this.state.showConfirm,
    });
  };

  toggleEditModal = (task) => {
    this.setState({ editTask: task });
  };

  saveTask = (editedTask) => {
    axios
      .put(`${backendUrl}${"/task/"}${editedTask._id}`, editedTask)
      .then((response) => {
        const tasks = [...this.state.tasks];
        const isElementExists = (task) => task._id === editedTask._id;
        const getTasktIndex = tasks.findIndex(isElementExists);
        tasks[getTasktIndex] = response.data;

        this.setState({
          tasks,
          editTask: null,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    const { tasks, selectedTasksIds, showConfirm, editTask } = this.state;

    const addTasks = (
      <Row>
        {tasks.map((task) => (
          <Col key={task._id} xs={12} md={4}>
            <Task
              task={task}
              onRemove={this.removeTask}
              onCheck={this.handleCheck}
              onEdit={this.toggleEditModal}
              disabled={selectedTasksIds.size}
            />
          </Col>
        ))}
      </Row>
    );

    return (
      <>
        <ArmFlag />
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={8}>
              <NewTasksInput
                onAddTask={this.handleAddTask}
                disabled={selectedTasksIds.size}
              />
            </Col>
          </Row>
          {addTasks}
          <Row className="text-center">
            <Col>
              <Button
                variant="danger"
                onClick={this.toggleConfirm}
                disabled={!selectedTasksIds.size}
              >
                Remove selected
              </Button>
            </Col>
          </Row>
        </Container>
        {showConfirm && (
          <Confirm
            removableTasksCount={selectedTasksIds.size}
            onSubmit={this.removeSelectedTasks}
            onClose={this.toggleConfirm}
          />
        )}
        {!!editTask && (
          <EditTaskModal
            editTask={editTask}
            onSave={this.saveTask}
            onClose={() => this.toggleEditModal(null)}
          />
        )}
      </>
    );
  }
}

export default ToDo;
