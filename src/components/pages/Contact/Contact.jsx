import { Container, Row, Col } from "react-bootstrap";
import ContactFormWithReducer from "../../ContactForm/ContactFormWithReducer";
import propTypes from "prop-types";

const ContainerCls = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "align-self-center",
  "justify-content-center",
  "py-4",
];

const Contact = (props) => {
  return (
    <Container className={ContainerCls}>
      <Row>
        <Col>
          <h1> CONTACT FORM</h1>
        </Col>
      </Row>

      <Row className="mt-4 w-50">
        <Col>
          <ContactFormWithReducer history={props.history} />
        </Col>
      </Row>
    </Container>
  );
};

Contact.propTypes = {
  history: propTypes.object.isRequired,
};

export default Contact;
