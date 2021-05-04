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

const initialState = {
  singleTask: null,
  loading: false,
  isEditable: false,
};

const reducer = (state = initialState, action) => {
  const { isEditable } = state;

  switch (action.type) {
    case "SET_SINGLE_TASK":
      return {
        ...state,
        singleTask: action.data,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "REMOVE_LOADING":
      return {
        ...state,
        loading: false,
      };
    case "TOGGLE_HIDE_MODAL":
      return {
        ...state,
        isEditable: !isEditable,
      };
    default:
      return state;
  }
};

const SingleTaskWithReducer = ({ match, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { singleTask, loading, isEditable } = state;

  useEffect(() => {
    const { id } = match.params;
    (async () => {
      try {
        const data = await fetch(`${API_HOST}/task/${id}`).then((res) =>
          res.json()
        );
        if (data.error) throw data.error;
        dispatch({ type: "SET_SINGLE_TASK", data });
      } catch (error) {
        console.log("Get the single task Error ", error);
        history.push(`/error/${error.status}`);
      }
    })();
  }, [match.params, history]);

  const toggleHideAddEditTaskModal = useCallback(() => {
    dispatch({ type: "TOGGLE_HIDE_MODAL" });
  }, []);

  const handleDelete = useCallback(async () => {
    const { id } = match.params;

    dispatch({ type: "SET_LOADING" });
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
      dispatch({ type: "REMOVE_LOADING" });
    }
  }, [match.params, history]);

  const handleEdit = useCallback(
    async (editableTask) => {
      dispatch({ type: "SET_LOADING" });
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
        dispatch({ type: "SET_SINGLE_TASK", data });
      } catch (error) {
        console.log("Edit the single task Error", error);
      } finally {
        dispatch({ type: "REMOVE_LOADING" });
        dispatch({ type: "TOGGLE_HIDE_MODAL" });
      }
    },
    [singleTask]
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

SingleTaskWithReducer.propTypes = {
  history: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
};

export default memo(SingleTaskWithReducer);
