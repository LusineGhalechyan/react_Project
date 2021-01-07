import React, { useState, useEffect } from "react";
import Task from "../Task/Task";
import { Col, Row, Container, Button } from "react-bootstrap";
import ArmFlag from "../ArmFlag/ArmFlag";
import NewTasksInput from "../NewTasksInput/NewTasksInput";
import Confirm from "../Confirm/Confirm";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import styles from "../NewTasksInput/NewTasksInput.module.scss";
import ToDoImg from "../ToDoImg/ToDoImg";
import Spinner from "../Spinner/Spinner";
import { api } from "../../../helpers/api";
import { requestMiddleWare } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const ToDo = () => {
  const initialToDoState = {
    selectedTasksIds: new Set(),
    showConfirm: false,
    editTask: null,
    openNewTaskModal: false,
  };

  const [toDoState, setToDoState] = useState(initialToDoState);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(requestMiddleWare());
  }, []);

  const handleAddTask = (newTaskToBackend) => {
    api
      .postTask(newTaskToBackend)
      .then((response) => {
        setToDoState({
          ...toDoState,
          tasks: [...toDoState.tasks, response],
          openNewTaskModal: false,
        });
      })
      .catch((error) => console.log(error, "Failed to fetch data"));
  };

  const handleCheck = (taskId) => {
    const { selectedTasksIds } = toDoState;

    const _selectedTasksIds = new Set(selectedTasksIds);

    _selectedTasksIds.has(taskId)
      ? _selectedTasksIds.delete(taskId)
      : _selectedTasksIds.add(taskId);

    setToDoState({
      ...toDoState,
      selectedTasksIds: _selectedTasksIds,
    });
  };

  const removeTask = (task) => {
    const { tasks } = toDoState;

    api
      .removeTask(`${task._id}`)
      .then(() => {
        const filteredTasks = tasks.filter((t) => t._id !== task._id);

        setToDoState({
          ...toDoState,
          tasks: filteredTasks,
        });
      })
      .catch((error) => console.log(error));
  };

  const removeSelectedTasks = () => {
    let { selectedTasksIds } = toDoState;
    let tasks = [...toDoState.tasks];

    const axiosPatchRequestValue = {
      tasks: [...selectedTasksIds],
    };

    api
      .removeSelectedTasks(axiosPatchRequestValue)
      .then(() => {
        selectedTasksIds.forEach((_id) => {
          tasks = tasks.filter((t) => t._id !== _id);
        });

        setToDoState({
          ...toDoState,
          tasks,
          selectedTasksIds: new Set(),
          showConfirm: false,
        });
      })
      .catch((error) => console.log(error));
  };

  const toggleConfirm = () => {
    setToDoState({
      ...toDoState,
      showConfirm: !toDoState.showConfirm,
    });
  };

  const toggleEditModal = (task) => {
    setToDoState({
      ...toDoState,
      editTask: task,
    });
  };

  const saveTask = (editedTask) => {
    api
      .saveEditedTask(`${editedTask._id}`, editedTask)
      .then((response) => {
        const tasks = [...toDoState.tasks];
        const isElementExists = (task) => task._id === editedTask._id;
        const getTasktIndex = tasks.findIndex(isElementExists);
        tasks[getTasktIndex] = response;

        setToDoState({
          ...toDoState,
          tasks,
          editTask: null,
        });
      })
      .catch((error) => console.log(error));
  };

  const toggleNewTaskModal = () => {
    setToDoState({
      ...toDoState,
      openNewTaskModal: !toDoState.openNewTaskModal,
    });
  };

  const {
    selectedTasksIds,
    showConfirm,
    editTask,
    openNewTaskModal,
  } = toDoState;

  const addTasks = (
    <Row className="mb-4">
      {tasks.map((task) => (
        <Col key={task._id} xs={12} md={4}>
          <Task
            task={task}
            onRemove={removeTask}
            onCheck={handleCheck}
            onEdit={toggleEditModal}
            disabled={selectedTasksIds.size}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <ToDoImg />
      <ArmFlag />
      <Container>
        <Row className="justify-content-center text-center">
          <Col xs={12} md={10} lg={8}>
            <Button
              className={`${styles.addTaskButton} mb-3`}
              onClick={toggleNewTaskModal}
              disabled={selectedTasksIds.size}
            >
              Add new task
            </Button>
          </Col>
        </Row>
        <Row className="text-center mb-3">
          <Col>
            <Button
              variant="danger"
              onClick={toggleConfirm}
              disabled={!selectedTasksIds.size}
            >
              Remove selected
            </Button>
          </Col>
        </Row>
        {!tasks.length ? <Spinner /> : addTasks}
      </Container>
      {showConfirm && (
        <Confirm
          removableTasksCount={selectedTasksIds.size}
          onSubmit={removeSelectedTasks}
          onClose={toggleConfirm}
        />
      )}
      {!!editTask && (
        <EditTaskModal
          editTask={editTask}
          onSave={saveTask}
          onClose={() => toggleEditModal(null)}
        />
      )}
      {openNewTaskModal && (
        <NewTasksInput onAddTask={handleAddTask} onClose={toggleNewTaskModal} />
      )}
    </>
  );
};

export default ToDo;
