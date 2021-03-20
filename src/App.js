import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import ToDo from "./components/pages/ToDo/ToDo";
import Contact from "./components/pages/Contact/Contact";
import About from "./components/pages/About/About";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={ToDo} exact />
        <Route path="/contact" component={Contact} exact />
        <Route path="/about" component={About} exact />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

// 1․Սարքում ենք Navbar- ը Home, About, Contact Անդամներով,
// 2․Ունենում ենք 3 էջ` Todo, Contact, About
// 3.Ամեն անդամի հասցեի url  դաշտում երևալու դեպքում՝ փոխել տվյալ Nav անդամի սթայլը(NavLink , Link)
// 4.Nav- ի անդամներին click- ների ժամանակ ,գնում է իր հասցեին համապատասխան էջը(Switch , Route)
// 5․Անհայտ հասցեի ներմուծման դեպքում ՝ գնալ home էջ
