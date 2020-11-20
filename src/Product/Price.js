import React, { Component } from "react";

class Price extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: props.price,
      // amd: props.amd,
    };
  }

  handleStatePriceChange = () => {
    let { price } = this.state;
    let { amd } = this.props;
    amd = amd.toFixed(2);

    price.includes("$")
      ? (price = `${parseFloat(price) * amd}֏`)
      : (price = `${parseFloat(price) / amd}$`);

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
