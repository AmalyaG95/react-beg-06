import { memo } from "react";
import styles from "./task.module.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faCheck,
  faHourglassHalf,
} from "@fortawesome/free-solid-svg-icons";
import propTypes from "prop-types";

const CardBodyCls = [
  "d-flex",
  "flex-wrap",
  "align-items-center",
  "justify-content-between",
  "m-1",
];

const Task = ({
  task,
  isChecked,
  isAnyChecked,
  isAllChecked,
  handleDeleteTask,
  handleSelectTask,
  handleChangeTaskStatus,
  setEditableTask,
  onHide,
}) => {
  const handleDelete = () => {
    handleDeleteTask(task._id);
  };

  const handleSelect = () => {
    handleSelectTask(task._id);
  };

  const handleEdit = () => {
    setEditableTask(task);
    onHide();
  };
  const handleChange = () => {
    handleChangeTaskStatus(task);
  };

  return (
    <>
      <Card className={`${styles.task} ${isChecked && styles.selectedTask}`}>
        <Card.Body className={CardBodyCls.join(" ")}>
          <div className={styles.wrapper}>
            <input
              type="checkbox"
              onChange={handleSelect}
              checked={isAllChecked || isChecked}
            />
            <Link to={`/task/${task._id}`} className={styles.Link}>
              {task.title}
            </Link>
          </div>

          <div style={{ display: "flex" }}>
            <Button
              variant="light"
              onClick={handleDelete}
              className="deleteButton"
              disabled={isAnyChecked}
            >
              <FontAwesomeIcon icon={faTrash} style={{ fontSize: "15px" }} />
            </Button>
            <Button
              variant="light"
              onClick={handleEdit}
              className="editButton"
              disabled={isAnyChecked}
            >
              <FontAwesomeIcon icon={faEdit} style={{ fontSize: "15px" }} />
            </Button>
            <Button
              variant={"light"}
              onClick={handleChange}
              className="editButton"
              disabled={isAnyChecked}
            >
              <FontAwesomeIcon
                icon={task.status === "done" ? faCheck : faHourglassHalf}
                style={{
                  fontSize: "15px",
                }}
              />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

Task.propTypes = {
  task: propTypes.shape({
    _id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    date: propTypes.string.isRequired,
  }).isRequired,
  isChecked: propTypes.bool.isRequired,
  isAnyChecked: propTypes.bool.isRequired,
  isAllChecked: propTypes.bool.isRequired,
  handleDeleteTask: propTypes.func.isRequired,
  handleSelectTask: propTypes.func.isRequired,
  setEditableTask: propTypes.func.isRequired,
  onHide: propTypes.func.isRequired,
  handleChangeTaskStatus: propTypes.func.isRequired,
};

export default memo(Task);
