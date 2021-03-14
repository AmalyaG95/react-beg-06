import React, { Component, createRef } from "react";
import styles from "./addEditTaskModal.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import uuid from "react-uuid";
import propTypes from "prop-types";

export class AddEditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = createRef();
    this.state = {
      title: props.clickedButton === "Add Task" ? "" : props.editableTask.title,
      description:
        props.clickedButton === "Add Task"
          ? ""
          : props.editableTask.description,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleS = ({ key, type }) => {
    const { editableTask, clickedButton, onSubmit, onHide } = this.props;

    if (
      !this.state.title ||
      !this.state.description ||
      (type === "keypress" && key !== "Enter")
    )
      return;

    onSubmit({
      ...this.state,
      _id: clickedButton === "Add Task" ? uuid() : editableTask._id,
    });
    onHide();
  };

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  render() {
    const { title, description } = this.state;
    const { clickedButton, onHide } = this.props;

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
            {clickedButton === "Add Task" ? "Add Task" : "Edit Task"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {clickedButton !== "Add Task" && (
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

          {clickedButton !== "Add Task" && (
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
            disabled={!title || !description}
          >
            {clickedButton === "Add Task" ? "Add" : "Edit"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

AddEditTaskModal.propTypes = {
  clickedButton: propTypes.string.isRequired,
  editableTask: propTypes.oneOfType([
    propTypes.object.isRequired,
    propTypes.instanceOf(null),
  ]),
  onSubmit: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
};

export default AddEditTaskModal;
