import React, { Component } from "react";

class Price extends Component {
  render() {
    const props = this.props;
    return <span style={props.style}>{props.price}</span>;
  }
}

export default Price;
