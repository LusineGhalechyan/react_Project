import React from "react";
import { useDispatch } from "react-redux";
import ChangeCounter from "./ChangeCounter";
import ShowCounter from "./ShowCounter";
import styles from "./Counter.module.scss";
import { Button } from "react-bootstrap";
import { RESET_COUNT } from "../../../redux/actions";

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.counterContainer}>
      <ShowCounter />
      <ChangeCounter />
      <div>
        <Button onClick={() => dispatch(RESET_COUNT())}>ResetCount</Button>
      </div>
    </div>
  );
};

export default Counter;
