import React, { Component } from "react";

class Name extends Component {
  render() {
    const props = this.props;
    return <span>{props.name}</span>;
  }
}

export default Name;
