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

// 1․ Սարքում ենք Check All btn, որը կնշի բոլոր Task -երը
// 2․ 2-րդ click -ի ժամանակ այն կհանի նշված Task -երը
// 3. Երբ բոլորը նշված են, Check All անունը դառնա Remove Checked
