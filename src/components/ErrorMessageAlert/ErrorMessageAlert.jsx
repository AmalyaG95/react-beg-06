import styles from "./errorMessageAlert.module.css";
import { Alert, Form } from "react-bootstrap";

const ErrorMessageAlert = ({ errorMessage, closeErrorMessageAlert }) => {
  return (
    <Alert
      variant="danger"
      dismissible
      onClose={closeErrorMessageAlert}
      className={styles.alert}
    >
      <Form.Text className={styles.backendError}>
        {errorMessage.slice(6, errorMessage.length)}
      </Form.Text>
    </Alert>
  );
};

export default ErrorMessageAlert;
