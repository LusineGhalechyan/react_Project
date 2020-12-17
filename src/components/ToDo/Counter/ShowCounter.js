import React, { PureComponent } from "react";
import { Badge } from "react-bootstrap";

class ShowCounter extends PureComponent {
  render() {
    return (
      <h2>
        <Badge variant="success">{this.props.count}</Badge>
      </h2>
    );
  }
}

export default ShowCounter;
