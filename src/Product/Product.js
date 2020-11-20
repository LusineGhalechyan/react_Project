import React, { Component } from "react";
import Description from "./Description";
import Name from "./Name";
import Price from "./Price";

class Product extends Component {
  render() {
    const { description, price, amd, name } = this.props;

    return (
      <>
        <Description description={description} />
        Price is
        <Price price={price} amd={amd} />
        for one kg
        <Name name={name} />
      </>
    );
  }
}

export default Product;
