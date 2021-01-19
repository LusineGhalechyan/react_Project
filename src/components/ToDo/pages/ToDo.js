import React, { useState, useEffect } from "react";
import Task from "../Task/Task";
import { Col, Row, Container, Button } from "react-bootstrap";
import ArmFlag from "../ArmFlag/ArmFlag";
import NewTasksInput from "../NewTasksInput/NewTasksInput";
import Confirm from "../Confirm/Confirm";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import styles from "../NewTasksInput/NewTasksInput.module.scss";
import ToDoImg from "../ToDoImg/ToDoImg";
import { baseURL } from "../../../helpers/baseURL";
import { requestMiddleWare } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { removeSelectedTasksMiddleWare } from "../../../redux/actions";
import SearchSortFilter from "../SearchSortFilter/SearchSortFilter";
import Footer from "../../../Footer/Footer";

const ToDo = () => {
  const initialToDoState = {
    selectedTasksIds: new Set(),
    showConfirm: false,
    editTask: null,
    openNewTaskModal: false,
  };

  const [toDoState, setToDoState] = useState(initialToDoState);
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      tasks: state.tasks,
      addTaskSuccess: state.addTaskSuccess,
      editTaskSuccess: state.editTaskSuccess,
      removeSelectedTasksSuccess: state.removeSelectedTasksSuccess,
    };
  });
  const {
    tasks,
    addTaskSuccess,
    editTaskSuccess,
    removeSelectedTasksSuccess,
  } = state;

  useEffect(() => {
    dispatch(requestMiddleWare());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  useEffect(() => {
    addTaskSuccess && toggleNewTaskModal();
    removeSelectedTasksSuccess &&
      setToDoState({ showConfirm: false, selectedTasksIds: new Set() });
    editTaskSuccess &&
      setToDoState({ editTask: null, selectedTasksIds: new Set() });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTaskSuccess, removeSelectedTasksSuccess, editTaskSuccess]);

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

  const removeSelectedTasks = () => {
    const { selectedTasksIds } = toDoState;
    dispatch(removeSelectedTasksMiddleWare(selectedTasksIds));
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
      <nav className="navbar">
        <ToDoImg />
        <SearchSortFilter />
      </nav>
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
        {addTasks}
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
          from="tasks"
          onClose={() => toggleEditModal(null)}
        />
      )}
      {openNewTaskModal && <NewTasksInput onClose={toggleNewTaskModal} />}
      <Footer />
    </>
  );
};

export default React.memo(ToDo);
