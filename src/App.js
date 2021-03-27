import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import NotFound from "./components/pages/NotFound/NotFound";
import SingleTask from "./components/pages/SingleTask/SingleTask";
import Navbar from "./components/Navbar/Navbar";

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
    component: SingleTask,
    exact: true,
  },
  {
    path: "/404",
    component: NotFound,
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
          <Redirect to="/404" />
        </Switch>
      </main>
    </div>
  );
}

export default App;

// 1.Add Task, Delete Task, Edit Task, Get Tasks, Delete Any Tasks  Գործողությունները
// կատարել Loading -ով
// 2.GoBack կնոպկա, SingleTask  կոմպոնենտի մեջ
// 3․Երբ task_id ով task գոյություն չունի, գցել 404  էջ
