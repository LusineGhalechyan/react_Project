import React from "react";
import styles from "./toDoImg.module.scss";

const ToDoImg = () => {
  return (
    <img
      src={require("../../assets/images/ToDo1.png")}
      alt="toDoImg"
      className={styles.toDoimg}
    />
  );
};

export default ToDoImg;
