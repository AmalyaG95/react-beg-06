import styles from "./contact.module.css";
import { Container, Row, Col } from "react-bootstrap";
import ContactFormWithRedux from "../../ContactForm/ContactFormWithRedux";
import propTypes from "prop-types";

const ContainerCls = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "align-self-center",
  "justify-content-center",
  "py-4",
];
const formCls = ["justify-content-center", "mt-3", styles.form];

const Contact = (props) => {
  return (
    <Container className={ContainerCls.join(" ")}>
      <Row>
        <Col>
          <h1> CONTACT FORM </h1>
        </Col>
      </Row>

      <Row className={formCls.join(" ")}>
        <Col>
          <ContactFormWithRedux history={props.history} />
        </Col>
      </Row>
    </Container>
  );
};

Contact.propTypes = {
  history: propTypes.object.isRequired,
};

export default Contact;
