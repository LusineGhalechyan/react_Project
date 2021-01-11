import React from "react";
import styles from "./NotFoundTask.module.scss";

const NotFoundTask = () => {
  return (
    <>
      <div className={styles.notFoundTaskChicken}>
        <img
          src={require("../../../../../../assets/images/chicken.png")}
          alt="chicken"
          width="30%"
        />
      </div>

      <div className={styles.deconstructed}>
        No TASK FOUND
        <div>No TASK FOUND </div>
        <div>No TASK FOUND </div>
        <div>No TASK FOUND </div>
        <div>No TASK FOUND </div>
        <div className={styles.textColor}>No TASK FOUND</div>
      </div>
    </>
  );
};

export default NotFoundTask;
