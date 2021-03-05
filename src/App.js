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

// Task ավելացնելուց կամ ջնջելուց անիմաստ Task Update ները կանխել
// Օգտվել ՝
// PureComponent
// memo
