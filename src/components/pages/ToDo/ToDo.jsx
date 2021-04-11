import React from "react";
import styles from "./toDo.module.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import Task from "../../Task/Task";
import AddEditTaskModal from "../../AddEditTaskModal/AddEditTaskModal";
import Spinner from "../../Spinner/Spinner";
import ConfirmModal from "../../ConfirmModal/ConfirmModal";

const API_HOST = "http://localhost:3001";
const ContainerCls = ["d-flex ", "flex-column", "align-content-center", "py-4"];
const delSelButtonsColCls = [
  "d-flex",
  "justify-content-center",
  "align-items-center",
  "mt-2",
  "position-fixed",
  styles.delSelButtons,
];
const noTasksCls = ["align-self-center mt-5", styles.noTasks];

class ToDo extends React.Component {
  state = {
    tasks: [],
    selectedTasksIDs: new Set(),
    isOpenAddEditTaskModal: false,
    isOpenConfirmModal: false,
    editableTask: null,
    loading: false,
  };

  toggleHideAddEditTaskModal = () => {
    this.setState({
      isOpenAddEditTaskModal: !this.state.isOpenAddEditTaskModal,
    });
  };

  toggleHideConfirmModal = () => {
    this.setState({ isOpenConfirmModal: !this.state.isOpenConfirmModal });
  };

  toggleSetEditableTask = (editableTask = null) => {
    this.setState({
      editableTask,
    });
  };

  handleAddTask = (newTaskData) => {
    const tasks = [...this.state.tasks];

    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTaskData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }

        tasks.push(data);
        this.setState({
          tasks,
        });
      })
      .catch((error) => {
        console.log("Add a task Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
        this.toggleHideAddEditTaskModal();
      });
  };

  handleEditTask = (editableTaskData) => {
    const tasks = [...this.state.tasks];

    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task/${this.state.editableTask._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editableTaskData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        const ind = tasks.findIndex((task) => task._id === data._id);

        tasks[ind] = data;
        this.setState({
          tasks,
        });
        this.toggleSetEditableTask();
      })
      .catch((error) => {
        console.log("Edit a task Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
        this.toggleHideAddEditTaskModal();
      });
  };

  handleDeleteTask = (_id) => {
    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        const tasks = [...this.state.tasks].filter((task) => task._id !== _id);

        this.setState({
          tasks,
        });
      })
      .catch((error) => {
        console.log("Delete a task Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleSelectTask = (_id) => {
    const selectedTasksIDs = new Set(this.state.selectedTasksIDs);

    if (selectedTasksIDs.has(_id)) {
      selectedTasksIDs.delete(_id);
    } else {
      selectedTasksIDs.add(_id);
    }

    this.setState({
      selectedTasksIDs,
    });
  };

  handleSelectAllTasks = () => {
    const selectedTasksIDs = new Set(this.state.selectedTasksIDs);

    this.state.tasks.forEach((task) => {
      selectedTasksIDs.add(task._id);
    });

    this.setState({
      selectedTasksIDs:
        this.state.selectedTasksIDs.size !== this.state.tasks.length
          ? selectedTasksIDs
          : new Set(),
    });
  };

  getSelectedSingleTask = () => {
    const { tasks, selectedTasksIDs } = this.state;
    let id = null;

    if (selectedTasksIDs.size !== 1) return;
    selectedTasksIDs.forEach((_id) => {
      id = _id;
    });

    return tasks.find((task) => task._id === id);
  };

  handleDeleteSelectedTasks = () => {
    const { selectedTasksIDs } = this.state;

    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ tasks: Array.from(selectedTasksIDs) }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }

        const tasks = [...this.state.tasks].filter(
          (task) => !selectedTasksIDs.has(task._id)
        );

        this.setState({
          tasks,
          selectedTasksIDs: new Set(),
        });
      })
      .catch((error) => {
        console.log("Delete selected tasks Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }

        this.setState({
          tasks: data,
        });
      })
      .catch((error) => {
        console.log("Get all tasks Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const {
      tasks,
      selectedTasksIDs,
      editableTask,
      isOpenAddEditTaskModal,
      isOpenConfirmModal,
      loading,
    } = this.state;

    const tasksJSX = tasks.map((task) => {
      return (
        <Col
          key={task._id}
          xs={12}
          className="d-flex my-2 justify-content-center"
        >
          <Task
            task={task}
            handleDeleteTask={this.handleDeleteTask}
            handleSelectTask={this.handleSelectTask}
            setEditableTask={this.toggleSetEditableTask}
            onHide={this.toggleHideAddEditTaskModal}
            isChecked={selectedTasksIDs.has(task._id)}
            isAnyChecked={!!selectedTasksIDs.size}
            isAllChecked={
              !!selectedTasksIDs.size && selectedTasksIDs.size === tasks.length
            }
          />
        </Col>
      );
    });

    return (
      <>
        <Container className={ContainerCls}>
          <Row>
            <Col>
              <Button
                variant="info"
                onClick={this.toggleHideAddEditTaskModal}
                className={styles.addTaskButton}
              >
                Add Task
              </Button>
            </Col>
          </Row>

          <Row className="mt-1 mb-5 justify-content-center">
            {!!tasksJSX.length && tasksJSX}
            {!loading && !tasksJSX.length && (
              <Col className={noTasksCls.join(" ")}> NO TASKS !</Col>
            )}
          </Row>

          <Row className="justify-content-center">
            <Col className={delSelButtonsColCls.join(" ")}>
              <div className={styles.select}>
                <label htmlFor="selectAll" className="mr-2">
                  Select All
                </label>
                <input
                  type="checkbox"
                  id="selectAll"
                  onChange={this.handleSelectAllTasks}
                  checked={
                    tasks.length && selectedTasksIDs.size === tasks.length
                  }
                  disabled={!tasks.length}
                />
              </div>
              <Button
                variant="danger"
                onClick={this.toggleHideConfirmModal}
                disabled={!selectedTasksIDs.size}
              >
                Delete All Selected
              </Button>
            </Col>
          </Row>
        </Container>

        {isOpenAddEditTaskModal && (
          <AddEditTaskModal
            editableTask={editableTask}
            onSubmit={editableTask ? this.handleEditTask : this.handleAddTask}
            onHide={this.toggleHideAddEditTaskModal}
          />
        )}

        {isOpenConfirmModal && (
          <ConfirmModal
            onSubmit={this.handleDeleteSelectedTasks}
            onHide={this.toggleHideConfirmModal}
            countOrOneTaskTitle={
              selectedTasksIDs.size > 1
                ? selectedTasksIDs.size
                : this.getSelectedSingleTask().title
            }
          />
        )}
        {loading && <Spinner />}
      </>
    );
  }
}

export default ToDo;
