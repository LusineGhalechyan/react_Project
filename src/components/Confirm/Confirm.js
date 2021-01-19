import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Confirm = (props) => {
  const { removableTasksCount, onSubmit, onClose } = props;

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Are You sure to remove
          {removableTasksCount === 1
            ? ` a task`
            : ` ${removableTasksCount} tasks`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={onSubmit}>
          Submit
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(Confirm);

Confirm.propTypes = {
  removableTasksCount: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
