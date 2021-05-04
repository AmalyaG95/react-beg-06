import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "./addEditTaskModal.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import types from "../../Redux/actionTypes";
import formatDate from "../../utils/formatDate";

const AddEditTaskModalWithRedux = ({
  SingleTaskState,
  AddEditTaskModalState,
  AddEditTaskModalState: { title, description, date },
  editableTask,
  onHide,
  onSubmit,
  handleChange,
  handleChangeDate,
  resetData,
  setEditableTaskData,
}) => {
  const titleInputRef = useRef();

  useEffect(() => {
    titleInputRef.current.focus();

    return () => {
      resetData();
    };
  }, [resetData]);

  useEffect(() => {
    if (editableTask) {
      const editableTaskData = {
        title: editableTask.title,
        description: editableTask.description,
        date: new Date(editableTask.date),
      };
      setEditableTaskData(editableTaskData);
    }
  }, [editableTask, setEditableTaskData]);

  const handleSubmit = ({ key, type }) => {
    if (
      !title.trim() ||
      !description.trim() ||
      (type === "keypress" && key !== "Enter")
    )
      return;

    onSubmit(
      { ...AddEditTaskModalState, date: formatDate(date) },
      editableTask
    );
  };

  return (
    <Modal
      className={styles.modal}
      show={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {!(editableTask || SingleTaskState.isEditable)
            ? "Add Task"
            : "Edit Task"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {(editableTask || SingleTaskState.isEditable) && (
          <Form.Label htmlFor="title" className="mb-2">
            Title
          </Form.Label>
        )}
        <Form.Control
          id="title"
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          onKeyPress={handleSubmit}
          ref={titleInputRef}
          value={title}
          className={styles.input}
        />
        {(editableTask || SingleTaskState.isEditable) && (
          <Form.Label htmlFor="description" className="my-2">
            Description
          </Form.Label>
        )}
        <Form.Control
          id="description"
          as="textarea"
          name="description"
          placeholder="Description"
          rows={3}
          onChange={handleChange}
          onKeyPress={handleSubmit}
          value={description}
          className={styles.input}
          style={{ resize: "none" }}
        />
        <Form.Label htmlFor="date" className="my-2 px-2">
          <FontAwesomeIcon
            icon={faCalendarDay}
            style={{
              fontSize: "15px",
              color: " rgb(5, 112, 112)",
            }}
          />
        </Form.Label>
        <DatePicker
          id="date"
          placeholderText="MM/DD/YY"
          selected={date}
          onChange={handleChangeDate}
        />
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
          className={styles.cancelButton}
        >
          Cancel
        </Button>
        <Button
          variant="info"
          onClick={handleSubmit}
          className={styles.addEditButton}
          disabled={!title.trim() || !description.trim()}
        >
          {!(editableTask || SingleTaskState.isEditable) ? "Add" : "Edit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { AddEditTaskModalState, ToDoState, SingleTaskState } = state;
  return {
    AddEditTaskModalState,
    ToDoState,
    SingleTaskState,
  };
};

AddEditTaskModalWithRedux.propTypes = {
  AddEditTaskModalState: propTypes.shape({
    title: propTypes.string,
    description: propTypes.string,
    date: propTypes.instanceOf(Date),
  }),
  onSubmit: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  handleChangeDate: propTypes.func.isRequired,
  resetData: propTypes.func.isRequired,
  setEditableTaskData: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  const handleChange = (e) => {
    dispatch({ type: types.CHANGE_TASK, e });
  };
  const handleChangeDate = (date) => {
    dispatch({ type: types.CHANGE_DATE, date });
  };
  const resetData = () => {
    dispatch({ type: types.RESET_MODAL_DATA });
  };
  const setEditableTaskData = (editableTaskData) => {
    dispatch({ type: types.SET_EDITABLE_TASK_DATA, editableTaskData });
  };

  return {
    handleChange,
    handleChangeDate,
    resetData,
    setEditableTaskData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditTaskModalWithRedux);
