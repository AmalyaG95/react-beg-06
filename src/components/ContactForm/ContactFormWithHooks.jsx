import { useRef, useState, useEffect, memo } from "react";
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

const ContactFormWithHooks = ({ history }) => {
  const [inputs, setInputs] = useState({
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
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpenErrorMessageAlert, setIsOpenErrorMessageAlert] = useState(false);
  const nameInputRef = useRef();
  const { name, email, message } = inputs;

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  const closeErrorMessageAlert = () => {
    setIsOpenErrorMessageAlert(false);
  };

  const handleChange = ({ target: { name, value } }) => {
    const error = validateForm(name, value);

    setInputs({
      ...inputs,
      [name]: {
        value,
        isValid: error ? false : true,
        error,
      },
    });
  };

  const handleSubmit = () => {
    const formData = { ...inputs };

    for (let key in formData) {
      formData[key] = formData[key].value;
    }

    setLoading(true);
    setErrorMessage("");
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
        setLoading(false);
        setErrorMessage(error.message);
        setIsOpenErrorMessageAlert(true);
      }
    })();
  };

  const inputsJSX = inputsInfo.map((input, index) => {
    return (
      <div key={index}>
        <Form.Group className="mt-2 mb-1 position-relative">
          <Form.Control
            name={input.name}
            value={inputs[input.name].value}
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
          {inputs[input.name].error}
        </Form.Text>
      </div>
    );
  });

  return (
    <>
      <Form noValidate>
        {isOpenErrorMessageAlert && !loading && (
          <ErrorMessageAlert
            errorMessage={errorMessage}
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
      {loading && <Spinner />}
    </>
  );
};

ContactFormWithHooks.propTypes = {
  history: propTypes.object.isRequired,
};

export default memo(ContactFormWithHooks);
