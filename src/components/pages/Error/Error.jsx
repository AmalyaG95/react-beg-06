import styles from "./error.module.css";
import notFound from "../../../assets/images/404.png";
import internal from "../../../assets/images/500.png";
import { Container, Row, Col } from "react-bootstrap";
import propTypes from "prop-types";

const Error = ({ match }) => {
  let error;
  switch (match.params.status) {
    case "404":
    default: {
      error = {
        message: "Not found",
        img: notFound,
      };
      break;
    }
    case "500": {
      error = {
        message: "Something went wrong",
        img: internal,
      };
      break;
    }
  }

  return (
    <Container className="d-flex flex-column align-content-center w-100">
      <Row>
        <Col className="align-self-center">
          <h1 className={styles.heading1}>{error.message}</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <img src={error.img} alt="notFound" className={styles.error} />
        </Col>
      </Row>
    </Container>
  );
};

Error.propTypes = {
  match: propTypes.object.isRequired,
};

export default Error;
