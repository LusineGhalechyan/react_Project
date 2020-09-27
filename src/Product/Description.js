import React, { Component } from "react";

class Description extends Component {
  render() {
    const props = this.props;
    return <span style={props.style}>{props.description}</span>;
  }
}

export default Description;
