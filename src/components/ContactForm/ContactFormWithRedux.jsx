import { useRef, useEffect, memo } from "react";
import { connect } from "react-redux";
import styles from "./contactForm.module.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";
import propTypes from "prop-types";
import types from "../../Redux/actionTypes";
import { submitContactFormThunk } from "../../Redux/actions";

const inputsInfo = [
  {
    name: "name",
    type: "text",
    placeholder: "Name",
  },
  {
    name: "email",
    type: "email",
    placeholder: "Email",
  },
  {
    name: "message",
    type: undefined,
    placeholder: "Your message",
    as: "textarea",
    rows: 5,
  },
];

const ContactFormWithRedux = ({
  history,
  ContactFormState,
  ContactFormState: { name, email, message },
  loading,
  handleChange,
  resetData,
  handleSubmit,
}) => {
  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();

    return () => {
      resetData();
    };
  }, [resetData]);

  const inputsJSX = inputsInfo.map((input, index) => {
    const valid =
      (name.isValid && input.name === "name") ||
      (email.isValid && input.name === "email") ||
      (message.isValid && input.name === "message");

    const invalid =
      (name.error && input.name === "name") ||
      (email.error && input.name === "email") ||
      (message.error && input.name === "message");
    return (
      <div key={index}>
        <Form.Group className="mt-2 mb-1 position-relative">
          <Form.Control
            name={input.name}
            value={ContactFormState[input.name].value}
            onChange={({ target: { name, value } }) =>
              handleChange(name, value)
            }
            as={undefined ?? input.as}
            rows={undefined ?? input.rows}
            placeholder={input.placeholder}
            ref={index === 0 ? nameInputRef : undefined}
            className={styles.input}
          />
          <Form.Text className={styles.valid}>
            <FontAwesomeIcon
              icon={valid ? faCheck : faExclamationCircle}
              className={
                valid
                  ? styles.faCheck
                  : invalid
                  ? styles.faExclamationCircle
                  : styles.faHidden
              }
            />
          </Form.Text>
        </Form.Group>
        <Form.Text className={styles.error}>
          {ContactFormState[input.name].error}
        </Form.Text>
      </div>
    );
  });

  return (
    <>
      <Form noValidate>
        {inputsJSX}
        <Form.Group className="d-flex justify-content-center">
          <Button
            variant="info"
            onClick={() => handleSubmit(history, ContactFormState)}
            className={styles.button}
            disabled={!name.isValid || !email.isValid || !message.isValid}
          >
            Send
          </Button>
        </Form.Group>
      </Form>
      {loading && <Spinner />}
    </>
  );
};
ContactFormWithRedux.propTypes = {
  history: propTypes.object.isRequired,
  ContactFormState: propTypes.shape({
    name: propTypes.oneOfType([propTypes.object, propTypes.string]),
    email: propTypes.oneOfType([propTypes.object, propTypes.string]),
    message: propTypes.oneOfType([propTypes.object, propTypes.string]),
  }),
  loading: propTypes.bool,
  errorMessage: propTypes.string,
  handleChange: propTypes.func.isRequired,
  resetData: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const {
    ContactFormState,
    globalState: { loading },
  } = state;
  return {
    ContactFormState,
    loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const handleChange = (name, value) => {
    dispatch({ type: types.CHANGE, name, value });
  };
  const resetData = () => {
    dispatch({ type: types.RESET_CONTACT_FORM_DATA });
  };
  const handleSubmit = (history, formData) => {
    dispatch(() => submitContactFormThunk(dispatch, history, formData));
  };

  return {
    handleChange,
    resetData,
    handleSubmit,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ContactFormWithRedux));
