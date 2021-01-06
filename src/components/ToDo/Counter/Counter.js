import React from "react";
import { useDispatch } from "react-redux";
import ChangeCounter from "./ChangeCounter";
import ShowCounter from "./ShowCounter";
import styles from "./Counter.module.scss";
import { Button } from "react-bootstrap";
import { resetCount } from "../../../redux/actions";

const Counter = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.counterContainer}>
      <ShowCounter />
      <ChangeCounter />
      <div>
        <Button onClick={() => dispatch(resetCount())}>ResetCount</Button>
      </div>
    </div>
  );
};

export default Counter;
