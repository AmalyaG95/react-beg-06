import React, { Component, createRef } from "react";
import styles from "./addEditTaskModal.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import propTypes from "prop-types";
import DatePicker from "react-datepicker";
import formatDate from "../../utils/formatDate";

class AddEditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = createRef();
    this.state = {
      title: props.editableTask?.title || "",
      description: props.editableTask?.description || "",
      date: props.editableTask ? new Date(props.editableTask.date) : new Date(),
    };
  }

  handleChangeDate = (e) => {
    this.setState({
      date: e,
    });
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleS = ({ key, type }) => {
    const { title, description, date } = this.state;
    const { onSubmit } = this.props;

    if (
      !title.trim() ||
      !description.trim() ||
      (type === "keypress" && key !== "Enter")
    )
      return;

    this.props.editableTask
      ? onSubmit(
          { ...this.state, date: formatDate(date) },
          this.props.editableTask
        )
      : onSubmit({ ...this.state, date: formatDate(date) });
  };

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  render() {
    const { title, description, date } = this.state;
    const { editableTask, onHide } = this.props;

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
            {!editableTask ? "Add Task" : "Edit Task"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {editableTask && (
            <Form.Label htmlFor="title" className="mb-2">
              Title
            </Form.Label>
          )}
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.handleChange}
            onKeyPress={this.handleS}
            ref={this.titleInputRef}
            value={title}
            className={styles.input}
          />
          {editableTask && (
            <Form.Label htmlFor="description" className="my-2">
              Description
            </Form.Label>
          )}
          <Form.Control
            as="textarea"
            name="description"
            placeholder="Description"
            rows={3}
            onChange={this.handleChange}
            onKeyPress={this.handleS}
            value={description}
            className={styles.input}
            style={{ resize: "none" }}
          />
          <DatePicker selected={date} onChange={this.handleChangeDate} />
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
            onClick={this.handleS}
            className={styles.addEditButton}
            disabled={!title.trim() || !description.trim()}
          >
            {!editableTask ? "Add" : "Edit"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddEditTaskModal.propTypes = {
  editableTask: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.instanceOf(null).isRequired,
  ]),
  onSubmit: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
};

export default AddEditTaskModal;
