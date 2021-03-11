import { memo } from "react";
import styles from "./task.module.css";
import { Card, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";

const CardBodyCls = [
  "d-flex",
  "flex-column",
  "align-items-center",
  "justify-content-between",
];

const Task = ({
  task,
  isChecked,
  isAnyChecked,
  isAllChecked,
  handleDeleteTask,
  handleSelectTask,
}) => {
  const handleDelete = () => {
    handleDeleteTask(task._id);
  };

  const handleSelect = () => {
    handleSelectTask(task._id);
  };

  return (
    <Card className={`${styles.task} ${isChecked && styles.selectedTask}`}>
      <Form.Check
        type="checkbox"
        className={"align-self-end p-1"}
        onChange={handleSelect}
        checked={isAllChecked || isChecked}
      />
      <Card.Body className={CardBodyCls.join(" ")}>
        <Card.Title style={{ fontSize: "30px" }}>{task.title}</Card.Title>
        <Button
          variant="danger"
          onClick={handleDelete}
          className={styles.button}
          disabled={isAnyChecked}
        >
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
        </Button>
      </Card.Body>
    </Card>
  );
};

Task.propTypes = {
  task: propTypes.shape({
    _id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
  }).isRequired,
  isChecked: propTypes.bool.isRequired,
  isAnyChecked: propTypes.bool.isRequired,
  isAllChecked: propTypes.bool.isRequired,
  handleDeleteTask: propTypes.func.isRequired,
  handleSelectTask: propTypes.func.isRequired,
};

export default memo(Task);
