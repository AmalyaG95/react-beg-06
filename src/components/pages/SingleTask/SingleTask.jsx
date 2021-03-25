import React from "react";
import styles from "./singleTask.module.css";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
  };

  handleDelete = () => {
    const { id } = this.props.match.params;

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
      });
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
        console.log("Single Task Get Request ", error);
      });
  }

  render() {
    const { singleTask } = this.state;

    if (!singleTask)
      return (
        <Container className={ContainerCls}>
          <Row>
            <Col>
              <p className={styles.loading}>Loading...</p>
            </Col>
          </Row>
        </Container>
      );
    return (
      <Container className={ContainerCls}>
        <Card className={styles.singleTaskSection}>
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
                <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
              </Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

SingleTask.propTypes = {
  history: propTypes.object.isRequired,
  location: propTypes.object.isRequired,
  match: propTypes.object.isRequired,
};

export default SingleTask;
