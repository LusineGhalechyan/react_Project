import React from "react";
import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <>
      <img
        src={require("../../../../assets/images/Space.png")}
        alt="Space"
        className={styles.Space}
      />
      <div className={styles.error404}>
        <img
          src={require("../../../../assets/images/_Error404.png")}
          alt="Error 404"
          width="30%"
        />
      </div>
      <div className={styles.error}>
        <img
          src={require("../../../../assets/images/_Error.png")}
          alt="Error"
        />
      </div>
    </>
  );
};

export default NotFound;
