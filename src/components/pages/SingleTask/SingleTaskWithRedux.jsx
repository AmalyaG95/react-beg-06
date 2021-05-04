import { useEffect, memo } from "react";
import { connect } from "react-redux";
import styles from "./singleTask.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner/Spinner";
import AddEditTaskModalWithRedux from "../../AddEditTaskModal/AddEditTaskModalWithRedux";
import propTypes from "prop-types";
import types from "../../../Redux/actionTypes";
import {
  getSingleTaskThunk,
  deleteTaskThunk,
  editTaskThunk,
  changeTaskStatusThunk,
} from "../../../Redux/actions";

const ContainerCls = [
  "d-flex flex-column",
  "align-items-center",
  "justify-content-center",
  "mt-5",
  "py-4",
];
const CardBodyCls = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "justify-content-center",
  "py-1",
];

const SingleTaskWithRedux = ({
  match,
  history,
  SingleTaskState: { singleTask, isEditable },
  loading,
  toggleHideAddEditTaskModal,
  resetData,
  getSingleTask,
  handleDelete,
  handleEdit,
  handleChangeTaskStatus,
}) => {
  useEffect(() => {
    getSingleTask(history, match.params.id);

    return () => {
      resetData();
    };
  }, [history, match.params.id, getSingleTask, resetData]);

  const handleChange = () => {
    handleChangeTaskStatus(singleTask);
  };

  return (
    <>
      {!singleTask ? (
        <Spinner />
      ) : (
        <Container className={ContainerCls.join(" ")}>
          <Row className={styles.singleTaskSection}>
            <Col>
              <Card className={styles.card}>
                <Card.Body className={CardBodyCls.join(" ")}>
                  <Card.Title
                    style={{
                      fontSize: "30px",
                      fontWeight: "600",
                    }}
                  >
                    {singleTask.title}
                  </Card.Title>
                  <Card.Text className={styles.description}>
                    {singleTask.description}
                  </Card.Text>
                  <Card.Text className={styles.date}>
                    Date:{" "}
                    {singleTask.date
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join(".")}
                  </Card.Text>
                  <Card.Footer className="d-flex">
                    <Button
                      variant="light"
                      onClick={() => handleDelete(match.params.id, history)}
                      className="deleteButton"
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ fontSize: "15px" }}
                      />
                    </Button>
                    <Button
                      variant="light"
                      onClick={toggleHideAddEditTaskModal}
                      className="editButton"
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ fontSize: "15px" }}
                      />
                    </Button>
                    <Button
                      variant={"light"}
                      onClick={handleChange}
                      className="editButton"
                    >
                      <FontAwesomeIcon
                        icon={
                          singleTask.status === "done"
                            ? faCheck
                            : faHourglassHalf
                        }
                        style={{
                          fontSize: "15px",
                        }}
                      />
                    </Button>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Button
                variant="secondary"
                onClick={() => history.goBack()}
                style={{ marginTop: "20px" }}
              >
                Go Back
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {isEditable && (
        <AddEditTaskModalWithRedux
          editableTask={singleTask}
          onSubmit={handleEdit}
          onHide={toggleHideAddEditTaskModal}
        />
      )}
      {loading && <Spinner />}
    </>
  );
};

SingleTaskWithRedux.propTypes = {
  history: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
  singleTask: propTypes.object,
  isEditable: propTypes.bool,
  loading: propTypes.bool.isRequired,
  toggleHideAddEditTaskModal: propTypes.func.isRequired,
  resetData: propTypes.func.isRequired,
  getSingleTask: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired,
  handleEdit: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    SingleTaskState,
    globalState: { loading },
  } = state;

  return {
    SingleTaskState,
    loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  const toggleHideAddEditTaskModal = () =>
    dispatch({ type: types.TOGGLE_HIDE_MODAL });

  const getSingleTask = (history, _id) =>
    dispatch(() => getSingleTaskThunk(dispatch, history, _id));

  const handleDelete = (_id, history) =>
    dispatch(() => deleteTaskThunk(dispatch, _id, history));

  const handleEdit = (editableTaskData, editableTask) =>
    dispatch(() =>
      editTaskThunk(dispatch, editableTaskData, editableTask, "SingleTask")
    );

  const handleChangeTaskStatus = (task) =>
    dispatch(() => changeTaskStatusThunk(dispatch, task, "SingleTask"));

  const resetData = () => dispatch({ type: types.RESET_SINGLE_TASK_DATA });

  return {
    toggleHideAddEditTaskModal,
    resetData,
    getSingleTask,
    handleDelete,
    handleEdit,
    handleChangeTaskStatus,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SingleTaskWithRedux));
