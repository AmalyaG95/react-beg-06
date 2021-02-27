import styles from "./task.module.css";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CardBodyCls = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "justify-content-between",
];

const Task = ({ task, handleDeleteTask }) => {
  const handleDelete = () => {
    handleDeleteTask(task._id);
  };

  return (
    <Card className={styles.task}>
      <Card.Body className={CardBodyCls.join(" ")}>
        <Form.Check type="checkbox" className="align-self-end" />
        <Card.Title style={{ fontSize: "30px" }}>{task.title}</Card.Title>
        <Button
          variant="danger"
          onClick={handleDelete}
          className={styles.button}
        >
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Task;
