import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import Error from "./components/pages/Error/Error";
import Navbar from "./components/Navbar/Navbar";
import SingleTaskWithReducer from "./components/pages/SingleTask/SingleTaskWithReducer";

const pages = [
  {
    path: "/",
    component: ToDo,
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
    component: SingleTaskWithReducer,
    exact: true,
  },
  {
    path: "/error/:status",
    component: Error,
    exact: true,
  },
];

function App() {
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
    </div>
  );
}

export default App;

// SingleTask կոմպոնենտը սարքել useReducer-ով
