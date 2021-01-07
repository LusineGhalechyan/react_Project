import React from "react";
import { Badge } from "react-bootstrap";
import { useSelector } from "react-redux";

const ShowCounter = () => {
  const count = useSelector((state) => state.count);
  return (
    <h2>
      <Badge variant="success">{count}</Badge>
    </h2>
  );
};

export default ShowCounter;
