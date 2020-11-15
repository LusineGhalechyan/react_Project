import React, { PureComponent } from "react";
import { Modal, Button, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";

class EditTaskModal extends PureComponent {
  state = {
    ...this.props.editTask,
  };

  handleChange = (event) => {
    this.setState({ text: event.target.value });
  };

  handleSave = () => {
    const { text } = this.state;
    const { onSave } = this.props;

    if (!text) return;

    onSave(this.state);
  };

  render() {
    const { props } = this;
    const { text } = this.state;

    return (
      <Modal show onHide={props.onClose} centered>
        <Modal.Header closeButton className="close-modal">
          <Modal.Title>Edit task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            value={text}
            onChange={this.handleChange}
            aria-label="task's name"
            aria-describedby="data"
            placeholder="Type your task"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.handleSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={props.onClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditTaskModal;

EditTaskModal.propTypes = {
  editTask: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
