import React, { Component, createRef } from "react";
import styles from "./addEditTaskModal.module.css";
import { Modal, Button, Form } from "react-bootstrap";
import propTypes from "prop-types";

export class AddEditTaskModal extends Component {
  constructor(props) {
    super(props);
    this.titleInputRef = createRef();
    this.state = {
      title: "",
      description: "",
      editableTaskTitle: props.editableTask.title,
      editableTaskDescription: props.editableTask.description,
      editableTaskId: props.editableTask._id,
    };
  }

  handleChange = (e) => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  handleS = ({ key, type }) => {
    const {
      title,
      description,
      editableTaskTitle,
      editableTaskDescription,
      editableTaskId,
    } = this.state;
    const {
      clickedButton,
      onSubmitAddTask,
      onSubmitEditTask,
      onHide,
      removeEditableTask,
    } = this.props;

    if (
      !this.state.title ||
      !this.state.description ||
      (type === "keypress" && key !== "Enter")
    )
      return;

    if (clickedButton === "Add Task") {
      const newTaskData = {
        title,
        description,
      };
      onSubmitAddTask(newTaskData);
    } else {
      const editableTask = {
        editableTaskTitle,
        editableTaskDescription,
        editableTaskId,
      };
      onSubmitEditTask(editableTask);
      removeEditableTask();
    }
    onHide();
  };

  componentDidMount() {
    this.titleInputRef.current.focus();
  }

  render() {
    const {
      title,
      description,
      editableTaskTitle,
      editableTaskDescription,
    } = this.state;
    const { onHide, clickedButton } = this.props;

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
            value={clickedButton === "Add Task" ? title : editableTaskTitle}
            className={styles.input}
          />
          {clickedButton !== "Add Task" && (
            <Form.Label htmlFor="description" className="mb-2">
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
            value={
              clickedButton === "Add Task"
                ? description
                : editableTaskDescription
            }
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
  onSubmitAddTask: propTypes.func.isRequired,
  onSubmitEditTask: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
};

export default AddEditTaskModal;

// class EditTaskModal extends Component {
//   constructor(props) {
//     super(props);
//     this.titleInputRef = createRef();
//     this.state = {
//       ...props.editableTask,
//     };
//   }

//   handleChange = (e) => {
//     const { name, value } = e.target;

//     this.setState({
//       [name]: value,
//     });
//   };

//   handleS = ({ key, type }) => {
//     const { onSubmit, onHide, removeEditableTask } = this.props;

//     if (
//       !this.state.title ||
//       !this.state.description ||
//       (type === "keypress" && key !== "Enter")
//     )
//       return;

//     onSubmit(this.state);
//     onHide();
//     removeEditableTask();
//   };

//   componentDidMount() {
//     this.titleInputRef.current.focus();
//   }

//   render() {
//     const { title, description } = this.state;
//     const { onHide } = this.props;

//     return (
//       <>
//         <Modal
//           show={true}
//           size="lg"
//           aria-labelledby="contained-modal-title-vcenter"
//           centered
//           onHide={onHide}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title id="contained-modal-title-vcenter">
//               Edit Task
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <Form.Label htmlFor="selectAll" className="mb-2">
//               Title
//             </Form.Label>
//             <Form.Control
//               type="text"
//               name="title"
//               placeholder="Title"
//               onChange={this.handleChange}
//               onKeyPress={this.handleS}
//               ref={this.titleInputRef}
//               value={title}
//               className={styles.input}
//             />
//             <Form.Label htmlFor="selectAll" className="mb-2">
//               Description
//             </Form.Label>
//             <Form.Control
//               as="textarea"
//               name="description"
//               placeholder="Description"
//               rows={3}
//               onChange={this.handleChange}
//               onKeyPress={this.handleS}
//               value={description}
//               className={styles.input}
//               style={{ resize: "none" }}
//             />
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="secondary"
//               onClick={onHide}
//               className={styles.cancelButton}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="info"
//               onClick={this.handleS}
//               className={styles.addButton}
//               disabled={!title || !description}
//             >
//               Edit
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </>
//     );
//   }
// }

// EditTaskModal.propTypes = {
//   onSubmit: propTypes.func.isRequired,
//   onHide: propTypes.func.isRequired,
// };

// export default EditTaskModal;
