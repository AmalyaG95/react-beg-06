import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from "./addEditTaskModal.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import propTypes from "prop-types";
import DatePicker from "react-datepicker";
import types from "../../Redux/actionsType";
import { submitTask } from "../../Redux/actions";

const AddEditTaskModalWithRedux = ({
  ToDoState,
  SingleTaskState,
  AddEditTaskModalState,
  AddEditTaskModalState: { title, description, date },
  onHide,
  onSubmit,
  handleChange,
  handleChangeDate,
  resetData,
  handleSubmit,
  setEditableTaskData,
}) => {
  const titleInputRef = useRef();
  const editableTask =
    ToDoState.editableTask ?? SingleTaskState.singleTask ?? null;

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

  return (
    <Modal
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
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => handleChange(e)}
          onKeyPress={({ type, key }) =>
            handleSubmit(
              type,
              key,
              AddEditTaskModalState,
              editableTask,
              onSubmit
            )
          }
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
          as="textarea"
          name="description"
          placeholder="Description"
          rows={3}
          onChange={(e) => handleChange(e)}
          onKeyPress={({ type, key }) =>
            handleSubmit(
              type,
              key,
              AddEditTaskModalState,
              editableTask,
              onSubmit
            )
          }
          value={description}
          className={styles.input}
          style={{ resize: "none" }}
        />
        <DatePicker selected={date} onChange={(e) => handleChangeDate(e)} />
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
          onClick={({ type, key }) =>
            handleSubmit(
              type,
              key,
              AddEditTaskModalState,
              editableTask,
              onSubmit
            )
          }
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

const mapDispatchToProps = (dispatch) => {
  const handleChange = (e) => {
    dispatch({ type: types.CHANGE_TASK, e });
  };
  const handleChangeDate = (e) => {
    dispatch({ type: types.CHANGE_DATE, e });
  };
  const resetData = () => {
    dispatch({ type: types.RESET_MODAL_DATA });
  };
  const setEditableTaskData = (editableTaskData) => {
    dispatch({ type: types.SET_EDITABLE_TASK_DATA, editableTaskData });
  };
  const handleSubmit = (type, key, formData, editableTask, onSubmit) => {
    dispatch(() => submitTask(type, key, formData, editableTask, onSubmit));
  };

  return {
    handleChange,
    handleChangeDate,
    resetData,
    setEditableTaskData,
    handleSubmit,
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
  handleSubmit: propTypes.func.isRequired,
  setEditableTaskData: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditTaskModalWithRedux);
