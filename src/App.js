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

// 1. AddTask Component -ի մեջ ավելացնել description textarea -ն և
//    task օբյեկտի սխեման փոխել { _id , title , description }
// 2. AddTaskModal   Սարքել
// 3․ Դինամիկ AddTaskModal  - ի state -ում պահել նոր task -ի input -ի տվյալները.
// 4․ Ավելացնել Confirm MOdal  կոմպոնենտը ,որը կհաստատի , ջնջել բոլոր նշվածները , թե ոչ,
