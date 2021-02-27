import styles from "./task.module.css";

const Task = (props) => {
  const { task } = props;

  return <p className={styles.task}>{task}</p>;
};

export default Task;
