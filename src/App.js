import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDoImg from "./components/ToDo/ToDoImg/ToDoImg";
import ToDo from "./components/ToDo/ToDo";

function App() {
  return (
    <div>
      <ToDoImg />
      <ToDo />
    </div>
  );
}

export default App;
