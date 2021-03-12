import { Modal, Button } from "react-bootstrap";
import propTypes from "prop-types";

const ConfirmModal = ({ countOrOneTaskTitle, onSubmit, onHide }) => {
  const handleSubmit = () => {
    onSubmit();
    onHide();
  };

  return (
    <Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          Do You want to delete {countOrOneTaskTitle} of Tasks
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSubmit}>
          Delete All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  countOrOneTaskTitle: propTypes.oneOfType([
    propTypes.number.isRequired,
    propTypes.string.isRequired,
  ]).isRequired,
  onSubmit: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
};

export default ConfirmModal;
