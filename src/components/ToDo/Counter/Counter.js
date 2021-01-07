import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangeCounter from "./ChangeCounter";
import ShowCounter from "./ShowCounter";
import styles from "./Counter.module.scss";
import { Button } from "react-bootstrap";
import { resetCount } from "../../../redux/actions";

const Counter = () => {
  const dispatch = useDispatch();

  const disabled = useSelector((state) => state.disabled);
  const count = useSelector(
    (state) => state.selections[state.selections.length - 1]
  );

  return (
    <div className={styles.counterContainer}>
      <ShowCounter />
      <ChangeCounter />
      <div>
        <Button
          onClick={() => dispatch(resetCount())}
          disabled={!count && disabled}
        >
          ResetCount
        </Button>
      </div>
    </div>
  );
};

export default Counter;
