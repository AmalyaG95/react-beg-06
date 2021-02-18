import "./App.css";
import ToDo from "./ToDo/ToDo";

function App() {
  return (
    <div className="App">
      <ToDo />
    </div>
  );
}

export default App;

// 1.Սարքել նոր AddNewTask Կոմպոնենտը ,որը իր state -ում կպահի inputValue -ն
// 2․inputValue -ի մեջ պահել AddNewTask  -ի միակ input -ի value -ն
// 3․ToDo ից փոխանցել մի callback ,որի միջողով AddNewTask  -ի input - value -ն կփոխանցվի Todo -ի state -ի inputValue -ին և ուղղակի console.log արեք այդ արժեքը
