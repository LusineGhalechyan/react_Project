import React from "react";
import { Link } from "react-router-dom";
import styles from "./MainCover.module.scss";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";

const MainCover = () => {
  return (
    <div>
      <img
        src={require("../../../assets/images/mainCover.png")}
        alt="CoverPhoto"
        className={styles.mainCover}
      />
      <div className={styles.mainCoverContent}>Welcome to My ToDo App!</div>

      <img
        className={styles.mainCoverLogo}
        src={require("../../../assets/images/logo.png")}
        alt="logo"
      />

      <Link to="/profile">
        <Button
          variant="outline-danger"
          className={styles.mainCoverButton}
          onClick={() => {}}
        >
          <FontAwesomeIcon icon={faFingerprint} /> Get Started !
        </Button>
      </Link>
    </div>
  );
};

export default MainCover;
