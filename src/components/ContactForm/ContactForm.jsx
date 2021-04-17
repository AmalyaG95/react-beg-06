import React, { Component, createRef } from "react";
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
import validateForm from "../../utils/validateForm";

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

export class ContactForm extends Component {
  state = {
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
  nameInputRef = createRef();

  closeErrorMessageAlert = () => {
    this.setState({
      isOpenErrorMessageAlert: false,
    });
  };

  handleChange = ({ target: { name, value } }) => {
    const error = validateForm(name, value);

    this.setState({
      inputs: {
        ...this.state.inputs,
        [name]: {
          value,
          isValid: error ? false : true,
          error,
        },
      },
    });
  };

  handleSubmit = () => {
    const formData = { ...this.state.inputs };

    for (let key in formData) {
      formData[key] = formData[key].value.trim();
    }

    this.setState({
      loading: true,
      errorMessage: "",
    });
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
        this.props.history.push("/");
      } catch (error) {
        console.log("Send Contact Form data Error", error);
        this.setState({
          loading: false,
          errorMessage: error.message,
          isOpenErrorMessageAlert: true,
        });
      }
    })();
  };

  componentDidMount() {
    this.nameInputRef.current.focus();
  }

  render() {
    const {
      inputs,
      inputs: { name, email, message },
      loading,
      errorMessage,
      isOpenErrorMessageAlert,
    } = this.state;

    const inputsJSX = inputsInfo.map((input, index) => {
      return (
        <div key={index}>
          <Form.Group className="mt-2 mb-1 position-relative">
            <Form.Control
              name={input.name}
              value={inputs[input.name].value}
              onChange={this.handleChange}
              as={undefined ?? input.as}
              rows={undefined ?? input.rows}
              placeholder={input.placeholder}
              ref={index === 0 ? this.nameInputRef : undefined}
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
          {isOpenErrorMessageAlert && (
            <ErrorMessageAlert
              errorMessage={errorMessage}
              closeErrorMessageAlert={this.closeErrorMessageAlert}
            />
          )}
          {inputsJSX}
          <Button
            variant="info"
            onClick={this.handleSubmit}
            className={styles.button}
            disabled={!name.isValid || !email.isValid || !message.isValid}
          >
            Send
          </Button>
        </Form>
        {loading && <Spinner />}
      </>
    );
  }
}

ContactForm.propTypes = {
  history: propTypes.object.isRequired,
};

export default ContactForm;
