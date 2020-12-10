import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavMenu from "./components/ToDo/NavMenu/NavMenu";
import { routesData } from "./dataPlaceholder/routesData";

function App() {
  return (
    <>
      <NavMenu />

      <Switch>
        {routesData.map((route, index) => (
          <Route
            exact
            key={index}
            path={route.path}
            component={route.component}
          />
        ))}
        <Redirect to="/404" />
      </Switch>
    </>
  );
}

export default App;
