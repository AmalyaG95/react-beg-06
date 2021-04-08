import { useEffect, useReducer, useCallback, memo } from "react";
import styles from "./singleTask.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../../Spinner/Spinner";
import AddEditTaskModal from "../../AddEditTaskModal/AddEditTaskModal";
import propTypes from "prop-types";

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

const initialSingleTask = null;
const initialRestState = {
  loading: false,
  isEditable: false,
};

const singleTaskReducer = (singleTask = initialSingleTask, action) => {
  switch (action.type) {
    case "SET_SINGLE_TASK":
      return action.data;
    default:
      return singleTask;
  }
};

const restStateReducer = (restState = initialRestState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...restState,
        loading: true,
      };
    case "REMOVE_LOADING":
      return {
        ...restState,
        loading: false,
      };
    case "TOGGLE_HIDE_MODAL":
      return {
        ...restState,
        isEditable: !restState.isEditable,
      };
    default:
      return restState;
  }
};

const SingleTaskWithReducer = ({ match, history }) => {
  const [singleTask, singleTaskDispatch] = useReducer(
    singleTaskReducer,
    initialSingleTask
  );
  const [restState, restStateDispatch] = useReducer(
    restStateReducer,
    initialRestState
  );

  useEffect(() => {
    const { id } = match.params;

    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${id}`).then((res) =>
          res.json()
        );
        if (data.error) throw data.error;
        singleTaskDispatch({ type: "SET_SINGLE_TASK", data });
      } catch (error) {
        console.log("Get the single task Error ", error);
        history.push(`/error/${error.status}`);
      }
    })();
  }, [match.params, history]);

  const toggleHideAddEditTaskModal = useCallback(() => {
    restStateDispatch({ type: "TOGGLE_HIDE_MODAL" });
  }, []);

  const handleDelete = useCallback(() => {
    const { id } = match.params;

    restStateDispatch({ type: "SET_LOADING" });
    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${id}`, {
          method: "DELETE",
        }).then((res) => res.json());

        if (data.error) {
          throw data.error;
        }
        history.push("/");
      } catch (error) {
        console.log("Delete the single task Error", error);
        restStateDispatch({ type: "REMOVE_LOADING" });
      }
    })();
  }, [match.params, history]);

  const handleEdit = useCallback(
    (editableTask) => {
      restStateDispatch({ type: "SET_LOADING" });
      (async () => {
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
          singleTaskDispatch({ type: "SET_SINGLE_TASK", data });
        } catch (error) {
          console.log("Edit the single task Error", error);
        } finally {
          restStateDispatch({ type: "REMOVE_LOADING" });
          restStateDispatch({ type: "TOGGLE_HIDE_MODAL" });
        }
      })();
    },
    [singleTask._id]
  );

  const goBack = useCallback(() => {
    history.goBack();
  }, [history]);

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
      {restState.isEditable && (
        <AddEditTaskModal
          editableTask={singleTask}
          onSubmit={handleEdit}
          onHide={toggleHideAddEditTaskModal}
        />
      )}
      {restState.loading && <Spinner />}
    </>
  );
};

SingleTaskWithReducer.propTypes = {
  history: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
};

export default memo(SingleTaskWithReducer);
