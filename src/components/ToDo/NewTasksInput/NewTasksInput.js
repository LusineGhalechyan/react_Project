import React, { PureComponent } from "react";
import { InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { jsDateformatter } from "../../../helpers/jsDateFormatter";

class NewTasksInput extends PureComponent {
  state = {
    title: "",
    description: "",
    date: jsDateformatter(),
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleOnKeyDown = (event) => {
    const { title } = this.state;
    return title && event.key === "Enter" ? this.handleAddTask() : 0;
  };

  handleAddTask = () => {
    const { title, description, date } = this.state;
    const { onAddTask } = this.props;

    if (!title) return false;

    const newTask = {
      title,
      description,
      date,
    };

    onAddTask(newTask);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.title.length + 1) return false;
  }

  render() {
    const { onClose } = this.props;
    const addTaskModalContent = (
      <>
        <InputGroup className="mb-4">
          <FormControl
            type="text"
            name="title"
            value={this.state.value}
            placeholder="Title"
            onChange={this.handleChange}
            onKeyDown={this.handleOnKeyDown}
          />
        </InputGroup>
        <Form.Group controlId="exampleForm.ControlTextarea">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="dob">
          <Form.Label>Select Date</Form.Label>
          <Form.Control type="date" name="date" onChange={this.handleChange} />
        </Form.Group>
      </>
    );

    return (
      <Modal show onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add new task</Modal.Title>
        </Modal.Header>
        <Modal.Body>{addTaskModalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={this.handleAddTask}>
            Add
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

NewTasksInput.propTypes = {
  onAddTask: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NewTasksInput;
