import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
// import ToDo from "./components/ToDo/pages/ToDo";
import { Route, Switch, Redirect } from "react-router-dom";
// import About from "./components/ToDo/pages/About/About";
// import SingleTask from "./components/ToDo/pages/SingleTask/SingleTask";
// import NotFound from "./components/ToDo/pages/NotFound/NotFound";
import NavMenu from "./components/ToDo/NavMenu/NavMenu";
// import Contact from "./components/ToDo/pages/Contact/Contact";
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
