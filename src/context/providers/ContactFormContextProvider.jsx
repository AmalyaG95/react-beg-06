import { useState, memo } from "react";
import propTypes from "prop-types";
import validateForm from "../../utils/validateForm";
import { contactFormContext } from "../contexts";

const API_HOST = "http://localhost:3001";

const ContactFormContextProvider = ({ children, history }) => {
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
      }
    })();
  };

  return (
    <contactFormContext.Provider
      value={{
        //state
        inputs,
        loading,
        errorMessage,
        //functions
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </contactFormContext.Provider>
  );
};

ContactFormContextProvider.propTypes = {
  children: propTypes.object.isRequired,
  history: propTypes.object.isRequired,
};

export default memo(ContactFormContextProvider);
