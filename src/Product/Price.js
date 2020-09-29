import React, { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: props.price,
      usd: props.usd,
    };
  }

  handleStatePriceChange = () => {
    let { price, usd } = this.state;

    price.includes("$")
      ? (price = `${parseInt(price) * usd}֏`)
      : (price = `${parseInt(price) / usd}$`);

    this.setState({ price });
  };
  render() {
    return (
      <div>
        <span style={{ marginRight: "5px" }}>{this.state.price}</span>
        <button onClick={this.handleStatePriceChange}>
          Change the currency
        </button>
      </div>
    );
  }
}

export default Price;
