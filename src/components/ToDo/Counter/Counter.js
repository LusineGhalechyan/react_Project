import React from "react";
import { PureComponent } from "react";
import ChangeCounter from "./ChangeCounter";
import ShowCounter from "./ShowCounter";
import styles from "./Counter.module.scss";
import { Button } from "react-bootstrap";

class Counter extends PureComponent {
  state = {
    getCount: 0,
  };

  getCount = (count) => {
    this.setState({ getCount: count });
  };

  resetCount = () => {
    this.setState({ getCount: 0 });
  };

  render() {
    return (
      <div className={styles.counterContainer}>
        <ShowCounter count={this.state.getCount} />
        <ChangeCounter SendIncrementCount={this.getCount} />
        <div>
          <Button onClick={this.resetCount}>ResetCount</Button>
        </div>
      </div>
    );
  }
}

export default Counter;
