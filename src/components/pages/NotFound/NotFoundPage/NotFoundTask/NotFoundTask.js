import React from "react";
import styles from "./NotFoundTask.module.scss";

const NotFoundTask = () => {
  return (
    <>
      <div className={styles.notFoundTaskChicken}>
        <img
          src={require("../../../../../assets/images/chicken.png")}

          alt="chicken"
          width="30%"
        />
      </div>

      <div className={styles.deconstructed}>
        NO TASK FOUND
        <div>NO TASK FOUND </div>
        <div>NO TASK FOUND </div>
        <div>NO TASK FOUND </div>
        <div>NO TASK FOUND </div>
        <div className={styles.textColor}>NO TASK FOUND</div>
      </div>
    </>
  );
};

export default NotFoundTask;
