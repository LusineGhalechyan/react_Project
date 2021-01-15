import React, { PureComponent, createRef } from "react";
import { Modal, Button, Form, FormControl, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { saveEditedTaskMiddleWare } from "../../../redux/actions";

class EditTaskModal extends PureComponent {
  constructor(props) {
    super(props);
    const { date } = props.editTask;
    this.state = {
      ...props.editTask,
      date: date ? new Date(date) : new Date(),
    };

    this.titleRef = createRef(null);
  }

  componentDidMount() {
    this.titleRef.current.focus();
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      date,
    });
  };

  handleSave = () => {
    const { title, date } = this.state;
    const { saveEditedTaskMiddleWare } = this.props;

    if (!title) return;

    const editedTasktoBackend = {
      ...this.state,
      date: date.toISOString().slice(0, 10),
    };
    saveEditedTaskMiddleWare(editedTasktoBackend, null, this.props.from);
  };

  render() {
    const { onClose } = this.props;
    const { title, description, date } = this.state;
    const editTaskModalContent = (
      <>
        <InputGroup className="mb-4">
          <FormControl
            type="text"
            name="title"
            value={title}
            ref={this.titleRef}
            placeholder="Title"
            onChange={this.handleChange}
            onKeyDown={this.handleOnKeyDown}
          />
        </InputGroup>
        <Form.Group controlId="exampleForm.ControlTextarea">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            rows={3}
            as="textarea"
            name="description"
            value={description}
            onChange={this.handleChange}
          />
        </Form.Group>
        <DatePicker
          selected={date}
          onChange={this.handleDateChange}
          minDate={new Date()}
        />
      </>
    );

    return (
      <Modal show onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>{editTaskModalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

EditTaskModal.propTypes = {
  editTask: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  saveEditedTaskMiddleWare,
};

export default connect(null, mapDispatchToProps)(EditTaskModal);
