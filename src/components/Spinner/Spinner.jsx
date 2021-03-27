import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.loadContainer}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default Spinner;
