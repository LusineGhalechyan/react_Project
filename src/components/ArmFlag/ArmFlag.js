import React from "react";
import styles from "./ArmFlag.module.scss";

const ArmFlag = () => {
  return (
    <div className={styles.armFlag}>
      <span role="img" aria-label="ArmenianFlag">
        💖💙🧡
      </span>
    </div>
  );
};

export default ArmFlag;
