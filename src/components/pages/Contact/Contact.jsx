import { Container, Row, Col } from "react-bootstrap";
import ContactFormWithContext from "../../ContactForm/ContactFormWithContext";
import ContactFormContextProvider from "../../../context/providers/ContactFormContextProvider";
import propTypes from "prop-types";

const ContainerCls = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "align-self-center",
  "justify-content-center",
  "my-5",
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

      <Row className="mt-3 w-50">
        <Col>
          <ContactFormContextProvider history={props.history}>
            <ContactFormWithContext />
          </ContactFormContextProvider>
        </Col>
      </Row>
    </Container>
  );
};

Contact.propTypes = {
  history: propTypes.object.isRequired,
};

export default Contact;
