import "./App.css";
import ToDo from "./components/ToDo/ToDo";

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;

// ToDo list-ում ստեղծել միանգամից մի քանի task ջնջելու հնարավորություն (Set ով)։
// Եթե ընտրված task-եր կան, ապա պետք է անջատել նոր task ավելացնելու և առանձին-առանձին task-երը ջնջելու կոճակները։
