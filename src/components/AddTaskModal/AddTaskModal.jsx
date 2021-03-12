import React, { Component, createRef } from "react";
import styles from "./addTaskModal.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import propTypes from "prop-types";

class AddTaskModal extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = createRef();
    this.state = {
      title: "",
      description: "",
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  };

  handleS = ({ key, type }) => {
    const { onSubmit, onHide } = this.props;

    if (
      !this.state.title ||
      !this.state.description ||
      (type === "keypress" && key !== "Enter")
    )
      return;

    onSubmit(this.state);
    onHide();
    this.setState({
      titleInput: "",
      descriptionInput: "",
    });
  };

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  render() {
    const { title, description } = this.state;
    const { onHide } = this.props;
    return (
      <>
        <Modal
          show={true}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          onHide={onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Add Task
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              className={styles.addButton}
              disabled={!title || !description}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

AddTaskModal.propTypes = {
  onSubmit: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
};

export default AddTaskModal;
