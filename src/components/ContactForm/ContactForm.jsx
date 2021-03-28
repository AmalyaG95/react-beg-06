import React, { Component, createRef } from "react";
import styles from "./contactForm.module.css";
import { Form, Button } from "react-bootstrap";
import Spinner from "../Spinner/Spinner";

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
    name: "",
    email: "",
    message: "",
    loading: false,
  };
  nameInputRef = createRef();

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = ({ key, type }) => {
    console.log(this.state);
    const { loading, ...formData } = this.state;

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim() ||
      (type === "keypress" && key !== "Enter")
    )
      return;

    this.setState({
      loading: true,
    });
    fetch(`${API_HOST}/form`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log("Send Contact Form data Error", error);
        this.setState({
          loading: false,
        });
      });
  };

  componentDidMount() {
    this.nameInputRef.current.focus();
  }

  render() {
    const { name, email, message, loading } = this.state;
    const inputsJSX = inputsInfo.map((input, index) => {
      return (
        <Form.Group key={index}>
          <Form.Control
            name={input.name}
            value={this.state[input.name]}
            onChange={this.handleChange}
            as={undefined ?? input.as}
            rows={undefined ?? input.rows}
            placeholder={input.placeholder}
            ref={index === 0 ? this.nameInputRef : undefined}
            className={styles.input}
          />
        </Form.Group>
      );
    });

    return (
      <>
        <Form>
          {inputsJSX}
          <Button
            variant="info"
            onClick={this.handleSubmit}
            className={styles.button}
            disabled={!name.trim() || !email.trim() || !message.trim()}
          >
            Send
          </Button>
        </Form>
        {loading && <Spinner />}
      </>
    );
  }
}

export default ContactForm;
