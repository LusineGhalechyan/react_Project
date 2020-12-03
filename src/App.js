import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import ToDo from "./components/ToDo/pages/ToDo";
import { Route, Switch, Redirect } from "react-router-dom";
import About from "./components/ToDo/pages/About/About";
import SingleTask from "./components/ToDo/pages/SingleTask/SingleTask";
import NotFound from "./components/ToDo/pages/NotFound/NotFound";
import NavMenu from "./components/ToDo/NavMenu/NavMenu";
import Contact from "./components/ToDo/pages/Contact/Contact";

function App() {
  return (
    <>
      <NavMenu />

      <Switch>
        <Route path="/" exact component={ToDo} />
        <Route path="/about" exact component={About} />
        <Route path="/task/:id" exact component={SingleTask} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/404" exact component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
}

export default App;
