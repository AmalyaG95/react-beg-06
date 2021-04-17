import React, { createRef, useEffect, useContext, memo } from "react";
import styles from "./contactForm.module.css";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Spinner from "../Spinner/Spinner";
import ErrorMessageAlert from "../ErrorMessageAlert/ErrorMessageAlert";
import { contactFormContext } from "../../context/contexts";

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

const ContactFormWithContext = () => {
  const context = useContext(contactFormContext);
  const {
    inputs,
    loading,
    errorMessage,
    isOpenErrorMessageAlert,
    closeErrorMessageAlert,
    handleChange,
    handleSubmit,
  } = context;
  const { name, email, message } = inputs;

  const nameInputRef = createRef();

  useEffect(() => {
    nameInputRef.current.focus();
  }, [nameInputRef]);

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

export default memo(ContactFormWithContext);
