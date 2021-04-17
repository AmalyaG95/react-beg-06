import { useEffect, memo } from "react";
import { connect } from "react-redux";
import styles from "./singleTask.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner/Spinner";
import AddEditTaskModal from "../../AddEditTaskModal/AddEditTaskModal";
import propTypes from "prop-types";
import types from "../../../Redux/actionsType";
import {
  getSingleTaskThunk,
  deleteSingleTaskThunk,
  editSingleTaskThunk,
  goBackThunk,
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
  goBack,
}) => {
  useEffect(() => {
    getSingleTask(history, match);

    return () => {
      resetData();
    };
  }, [history, match, getSingleTask, resetData]);

  return (
    <>
      {!singleTask ? (
        <Spinner />
      ) : (
        <Container className={ContainerCls}>
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
                    Date: {singleTask.date.slice(0, 10).split("-").join(".")}
                  </Card.Text>
                  <Card.Footer className="d-flex">
                    <Button
                      variant="light"
                      onClick={() => handleDelete(history, match)}
                      className={styles.deleteButton}
                    >
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ fontSize: "15px" }}
                      />
                    </Button>
                    <Button
                      variant="light"
                      onClick={toggleHideAddEditTaskModal}
                      className={styles.editButton}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ fontSize: "15px" }}
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
                onClick={() => goBack(history)}
                style={{ marginTop: "20px" }}
              >
                Go Back
              </Button>
            </Col>
          </Row>
        </Container>
      )}
      {isEditable && (
        <AddEditTaskModal
          editableTask={singleTask}
          onSubmit={handleEdit}
          onHide={toggleHideAddEditTaskModal}
        />
      )}
      {loading && <Spinner />}
    </>
  );
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
  const setSingleTask = (data) => {
    dispatch({ type: types.SET_SINGLE_TASK, data });
  };
  const toggleHideAddEditTaskModal = () => {
    dispatch({ type: types.TOGGLE_HIDE_MODAL });
  };
  const resetData = () => {
    dispatch({ type: types.RESET_SINGLE_TASK_DATA });
  };
  const setLoading = () => {
    dispatch({ type: types.SET_LOADING });
  };
  const removeLoading = () => {
    dispatch({ type: types.REMOVE_LOADING });
  };
  const getSingleTask = (history, match) => {
    dispatch(() => getSingleTaskThunk(history, match, setSingleTask));
  };
  const handleDelete = (history, match) => {
    dispatch(() =>
      deleteSingleTaskThunk(history, match, setLoading, removeLoading)
    );
  };
  const handleEdit = (editableTask, singleTask) => {
    dispatch(() =>
      editSingleTaskThunk(
        singleTask,
        editableTask,
        setLoading,
        removeLoading,
        setSingleTask,
        toggleHideAddEditTaskModal
      )
    );
  };
  const goBack = (history) => {
    dispatch(() => goBackThunk(history));
  };
  return {
    toggleHideAddEditTaskModal,
    resetData,
    getSingleTask,
    handleDelete,
    handleEdit,
    goBack,
  };
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
  goBack: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SingleTaskWithRedux));
