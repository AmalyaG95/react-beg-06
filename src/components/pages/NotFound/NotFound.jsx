import styles from "./notFound.module.css";
import notFound from "../../../assets/images/404.png";
import { Container, Row, Col } from "react-bootstrap";

const NotFound = () => {
  return (
    <Container className="d-flex flex-column align-content-center w-100">
      <Row>
        <Col className="align-self-center">
          <h1 className={styles.heading1}>Page Not Found</h1>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <img src={notFound} alt="notFound" className={styles.notFound} />
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;
