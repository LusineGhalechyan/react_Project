import React, { Component } from "react";
import Description from "./Description";
import Name from "./Name";
import Price from "./Price";

class Product extends Component {
  styles = {
    margin: "0 5px",
  };

  render() {
    const props = this.props;
    return (
      <>
        <Description description={props.description} style={this.styles} />
        Price is
        <Price price={props.price} style={this.styles} />
        for one kg
        <Name name={props.name} style={this.styles} />
      </>
    );
  }
}

export default Product;
