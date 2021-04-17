import { useRef, useEffect, useReducer, useCallback, memo } from "react";
import styles from "./contactForm.module.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";
import ErrorMessageAlert from "../ErrorMessageAlert/ErrorMessageAlert";
import propTypes from "prop-types";
import validateForm from "../../utils/validation/validateForm";

const API_HOST = "http://localhost:3001";
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

const initialState = {
  inputs: {
    name: {
      value: "",
      isValid: false,
      error: "",
    },
    email: {
      value: "",
      isValid: false,
      error: "",
    },
    message: {
      value: "",
      isValid: false,
      error: "",
    },
  },
  loading: false,
  errorMessage: "",
  isOpenErrorMessageAlert: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE":
      const { name, value } = action;
      const error = validateForm(name, value);
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [name]: {
            value,
            isValid: error ? false : true,
            error,
          },
        },
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
    case "SET_ERROR_MESSAGE":
      const { errorMessage } = action;
      return {
        ...state,
        errorMessage,
      };
    case "REMOVE_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };
    case "OPEN_ERROR_MESSAGE_ALERT":
      return {
        ...state,
        isOpenErrorMessageAlert: true,
      };
    case "CLOSE_ERROR_MESSAGE_ALERT":
      return {
        ...state,
        isOpenErrorMessageAlert: false,
      };
    default:
      return state;
  }
};

const ContactFormWithReducer = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, email, message } = state.inputs;
  const nameInputRef = useRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const closeErrorMessageAlert = useCallback(() => {
    dispatch({ type: "CLOSE_ERROR_MESSAGE_ALERT" });
  }, []);

  const handleChange = useCallback(({ target: { name, value } }) => {
    dispatch({ type: "CHANGE", name, value });
  }, []);

  const handleSubmit = useCallback(() => {
    const formData = { ...state.inputs };

    for (let key in formData) {
      formData[key] = formData[key].value;
    }

    dispatch({ type: "SET_LOADING" });
    dispatch({ type: "REMOVE_ERROR_MESSAGE" });
    (async () => {
      try {
        const data = await fetch(`${API_HOST}/form`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }).then((res) => res.json());

        if (data.error) {
          throw data.error;
        }
        history.push("/");
      } catch (error) {
        console.log("Send Contact Form data Error", error);
        dispatch({ type: "REMOVE_LOADING" });
        dispatch({ type: "SET_ERROR_MESSAGE", errorMessage: error.message });
        dispatch({ type: "OPEN_ERROR_MESSAGE_ALERT" });
      }
    })();
  }, [state.inputs, history]);

  const inputsJSX = inputsInfo.map((input, index) => {
    return (
      <div key={index}>
        <Form.Group className="mt-2 mb-1 position-relative">
          <Form.Control
            name={input.name}
            value={state.inputs[input.name].value}
            onChange={handleChange}
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
          {state.inputs[input.name].error}
        </Form.Text>
      </div>
    );
  });

  return (
    <>
      <Form noValidate>
        {state.isOpenErrorMessageAlert && !state.loading && (
          <ErrorMessageAlert
            errorMessage={state.errorMessage}
            closeErrorMessageAlert={closeErrorMessageAlert}
          />
        )}
        {inputsJSX}
        <Button
          variant="info"
          onClick={handleSubmit}
          className={styles.button}
          disabled={!name.isValid || !email.isValid || !message.isValid}
        >
          Send
        </Button>
      </Form>
      {state.loading && <Spinner />}
    </>
  );
};

ContactFormWithReducer.propTypes = {
  history: propTypes.object.isRequired,
};

export default memo(ContactFormWithReducer);
