import { Transactions } from "./Transactions/Transactions.controller";
import { ErrorBoundary } from "./wrappers/ErrorBoundary";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <Transactions />
      </div>
    </ErrorBoundary>
  );
}

export default App;
