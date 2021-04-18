import styles from "./errorMessageAlert.module.css";
import { Alert, Form } from "react-bootstrap";
import propTypes from "prop-types";

const ErrorMessageAlert = ({ errorMessage, closeErrorMessageAlert }) => {
  return (
    <Alert
      variant="danger"
      dismissible
      onClose={closeErrorMessageAlert}
      className={styles.alert}
    >
      <Form.Text className={styles.backendError}>{errorMessage}</Form.Text>
    </Alert>
  );
};

ErrorMessageAlert.propTypes = {
  errorMessage: propTypes.string.isRequired,
  closeErrorMessageAlert: propTypes.func.isRequired,
};

export default ErrorMessageAlert;
