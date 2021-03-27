import styles from "./deleteSpinner.module.css";

const DeleteSpinner = () => {
  return (
    <div className={styles.loadContainer}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default DeleteSpinner;
