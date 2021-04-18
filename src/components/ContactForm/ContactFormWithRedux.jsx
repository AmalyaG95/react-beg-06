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
import types from "../../Redux/actionsType";
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
  globalState: { loading, errorMessage, isOpenErrorMessageAlert },
  handleChange,
  resetData,
  handleSubmit,
  closeErrorMessageAlert,
}) => {
  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();

    return () => {
      resetData();
    };
  }, [resetData]);

  const inputsJSX = inputsInfo.map((input, index) => {
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
            {(name.isValid && input.name === "name") ||
            (email.isValid && input.name === "email") ||
            (message.isValid && input.name === "message") ? (
              <FontAwesomeIcon
                icon={faCheck}
                style={{
                  fontSize: "15px",
                  color: " rgb(5, 112, 112)",
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{
                  fontSize: "15px",
                }}
              />
            )}
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
        <Button
          variant="info"
          onClick={() => handleSubmit(history, ContactFormState)}
          className={styles.button}
          disabled={!name.isValid || !email.isValid || !message.isValid}
        >
          Send
        </Button>
      </Form>
      {loading && <Spinner />}
    </>
  );
};

const mapStateToProps = (state) => {
  const { ContactFormState, globalState } = state;
  return {
    ContactFormState,
    globalState,
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(ContactFormWithRedux));
