import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, Redirect } from "react-router-dom";
import NavMenu from "./components/NavMenu/NavMenu";
import { routesData } from "./dataPlaceholder/routesData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const state = useSelector((state) => {
    return {
      error: state.errorMessage,
      success: state.successMessage,
      loading: state.loading,
    };
  });
  const { error, success, loading } = state;

  const displayMessage = (error, success) => {
    if (error) return toast.error(error);
    if (success) return toast.success(success);
  };

  error && displayMessage(error, null);
  success && displayMessage(null, success);

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

      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {loading && <Spinner />}
    </>
  );
}

export default React.memo(App);
