import { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ToDoWithRedux from "./components/pages/ToDo/ToDoWithRedux";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import Error from "./components/pages/Error/Error";
import SingleTaskWithRedux from "./components/pages/SingleTask/SingleTaskWithRedux";
import { ToastContainer, toast } from "react-toastify";
import propTypes from "prop-types";

const pages = [
  {
    path: "/",
    component: ToDoWithRedux,
    exact: true,
  },
  {
    path: "/contact",
    component: Contact,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    exact: true,
  },
  {
    path: "/task/:id",
    component: SingleTaskWithRedux,
    exact: true,
  },
  {
    path: "/error/:status",
    component: Error,
    exact: true,
  },
];

function App({ errorMessage, successMessage }) {
  useEffect(() => {
    errorMessage &&
      toast.error(`${errorMessage}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [errorMessage]);

  useEffect(() => {
    successMessage &&
      toast.success(`${successMessage}`, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [successMessage]);

  const pagesJSX = pages.map((page, index) => {
    return (
      <Route
        key={index}
        path={page.path}
        component={page.component}
        exact={page.exact}
      />
    );
  });

  return (
    <div className="App">
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          {pagesJSX}
          <Redirect to="/error/404" />
        </Switch>
      </main>
      <footer>{(errorMessage || successMessage) && <ToastContainer />}</footer>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    globalState: { errorMessage, successMessage },
  } = state;

  return {
    errorMessage,
    successMessage,
  };
};

App.propTypes = {
  errorMessage: propTypes.string,
  successMessage: propTypes.string,
};

export default connect(mapStateToProps, null)(App);

// Հարցումով ստանում ենք նոր Task երը Filter կամ Sort եղած և նկարում դրանք
