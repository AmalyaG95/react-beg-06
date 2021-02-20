import styles from "./task.module.css";

const Task = (props) => {
  const { task } = props;

  return (
    <div className={styles.task}>
      <p>{task}</p>
    </div>
  );
};

export default Task;
