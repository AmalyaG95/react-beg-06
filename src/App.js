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

// Task -երը state-ում պետք է պահվեն զանգվածի մեջ՝ օբյեկտների տեսքով,
//  իսկ վերջինս պետք է պարունակի _id և title հատկությունները։
// _id-ն պետք է լինի ունիկալ։
// Ամեն մի task պետք է ունենա remove button, որի վրա սեղմելուց
// անհրաժեշտ է ջնջել տվյալ task-ը state-ից։ task-ը պետք է ունենա նաև
// checkbox(Վերևի աջ մասում)
