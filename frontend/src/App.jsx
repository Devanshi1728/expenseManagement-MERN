import Form from "./components/Form";
import Graph from "./components/Graph";

function App() {
  return (
    <div className="App">
      <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
        Expense Tracker
      </h1>
      <div
        className="container mx-auto max-w-6xl text-center
    drop-shadow-lg"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <Graph />
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
