import React, { PureComponent } from "react";
import { Button } from "react-bootstrap";
import styles from "./Counter.module.scss";

class ChangeCounter extends PureComponent {
  state = {
    count: 0,
    changeCount: 0,
    counts: [
      { id: 0, count: "Count" },
      { id: 1, count: "one" },
      { id: 5, count: "five" },
      { id: 10, count: "ten" },
    ],
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + this.state.changeCount }, () => {
      this.props.SendIncrementCount(this.state.count);
    });
    this.setState({ count: 0, changeCount: 0 });
  };

  handleDecrement = () => {
    this.setState({ count: this.state.count - this.state.changeCount }, () => {
      this.props.SendIncrementCount(this.state.count);
    });
  };

  handleChange = (event) => {
    const isCountExists = (count) => count.count === event.target.value;
    this.setState({
      changeCount: this.state.counts.find(isCountExists).id,
    });
  };

  render() {
    const select = (
      <select
        onChange={this.handleChange}
        className={`${styles.selectChangeCounter} mr-3 `}
      >
        {this.state.counts.map((count) => (
          <option key={count.id}>{count.count}</option>
        ))}
      </select>
    );
    return (
      <>
        {select}
        <Button
          variant="outline-dark"
          className="mb-3 mr-3"
          onClick={this.handleIncrement}
        >
          Increment
        </Button>

        <Button
          variant="outline-dark"
          className="mb-3 mr-3"
          onClick={this.handleDecrement}
        >
          Decrement
        </Button>
      </>
    );
  }
}

export default ChangeCounter;
