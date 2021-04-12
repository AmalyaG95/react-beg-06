import { useEffect, useCallback, memo } from "react";
import { connect } from "react-redux";
import styles from "./singleTask.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner/Spinner";
import AddEditTaskModal from "../../AddEditTaskModal/AddEditTaskModal";
import propTypes from "prop-types";
import types from "../../../Redux/actionsType";

const API_HOST = "http://localhost:3001";
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
  setSingleTask,
  removeSingleTask,
  toggleHideAddEditTaskModal,
  setLoading,
  removeLoading,
}) => {
  useEffect(() => {
    const { id } = match.params;
    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${id}`).then((res) =>
          res.json()
        );
        if (data.error) throw data.error;
        setSingleTask(data);
      } catch (error) {
        console.log("Get the single task Error ", error);
        history.push(`/error/${error.status}`);
      }
    })();
  }, [match.params, history]);

  const handleDelete = useCallback(async () => {
    const { id } = match.params;

    setLoading();
    try {
      const data = await fetch(`${API_HOST}/task/${id}`, {
        method: "DELETE",
      }).then((res) => res.json());

      if (data.error) {
        throw data.error;
      }
      history.push("/");
      removeSingleTask();
    } catch (error) {
      console.log("Delete the single task Error", error);
    } finally {
      removeLoading();
    }
  }, [match.params, history]); // ???????????????????????????????????

  const handleEdit = useCallback(
    async (editableTask) => {
      setLoading();
      try {
        const data = await fetch(`${API_HOST}/task/${singleTask._id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(editableTask),
        }).then((res) => res.json());

        if (data.error) {
          throw data.error;
        }
        setSingleTask(data);
      } catch (error) {
        console.log("Edit the single task Error", error);
      } finally {
        removeLoading();
        toggleHideAddEditTaskModal();
      }
    },
    [singleTask] // ???????????????????????????????????
  );

  const goBack = useCallback(() => {
    history.goBack();
    removeSingleTask();
  }, [history]); // ???????????????????????????????????

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
                      onClick={handleDelete}
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
                onClick={goBack}
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
  const { SingleTaskState, loading } = state;

  return {
    SingleTaskState,
    loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  const setSingleTask = (data) => {
    dispatch({ type: types.SET_SINGLE_TASK, data });
  };
  const removeSingleTask = () => {
    dispatch({ type: types.REMOVE_SINGLE_TASK });
  };
  const toggleHideAddEditTaskModal = () => {
    dispatch({ type: types.TOGGLE_HIDE_MODAL });
  };
  const setLoading = () => {
    dispatch({ type: types.SET_LOADING });
  };
  const removeLoading = () => {
    dispatch({ type: types.REMOVE_LOADING });
  };
  return {
    setSingleTask,
    removeSingleTask,
    toggleHideAddEditTaskModal,
    setLoading,
    removeLoading,
  };
};

SingleTaskWithRedux.propTypes = {
  history: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
  singleTask: propTypes.object,
  isEditable: propTypes.bool,
  loading: propTypes.bool.isRequired,
  setSingleTask: propTypes.func.isRequired,
  removeSingleTask: propTypes.func.isRequired,
  toggleHideAddEditTaskModal: propTypes.func.isRequired,
  setLoading: propTypes.func.isRequired,
  removeLoading: propTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(SingleTaskWithRedux));
