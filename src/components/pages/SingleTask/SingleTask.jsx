import React from "react";
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

class SingleTask extends React.Component {
  state = {
    singleTask: null,
    loading: false,
    isEditable: false,
  };

  toggleHideAddEditTaskModal = () => {
    this.setState({
      isEditable: !this.state.isEditable,
    });
  };

  handleDelete = () => {
    const { id } = this.props.match.params;

    this.setState({
      loading: true,
    });

    fetch(`${API_HOST}/task/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("Delete the single task Error", error);
        this.setState({
          loading: false,
        });
      });
  };

  handleEdit = (editableTask) => {
    const { singleTask } = this.state;

    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/task/${singleTask._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(editableTask),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }

        this.setState({
          singleTask: data,
        });
      })
      .catch((error) => {
        console.log("Edit the single task Error", error);
      })
      .finally(() => {
        this.setState({
          loading: false,
          isEditable: false,
        });
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    fetch(`${API_HOST}/task/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw data.error;
        this.setState({
          singleTask: data,
        });
      })
      .catch((error) => {
        console.log("Get the single task Error ", error);
        this.props.history.push(`/error/${error.status}`);
      });
  }

  render() {
    const { singleTask, loading, isEditable } = this.state;

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
                        onClick={this.handleDelete}
                        className={styles.deleteButton}
                      >
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{ fontSize: "15px" }}
                        />
                      </Button>
                      <Button
                        variant="light"
                        onClick={this.toggleHideAddEditTaskModal}
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
                  onClick={this.goBack}
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
            onSubmit={this.handleEdit}
            onHide={this.toggleHideAddEditTaskModal}
          />
        )}
        {loading && <Spinner />}
      </>
    );
  }
}

SingleTask.propTypes = {
  history: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
};

export default SingleTask;
