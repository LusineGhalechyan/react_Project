import React from "react";
import Greetings from "./Greetings/Greetings";
// import "./App.css";

function App(props) {
  return <Greetings>{props.children}</Greetings>;
}

export default App;
