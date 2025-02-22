import { Header } from "./components/header";
import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { DebtsSummary } from "./components/debs-summary";
import { EvaluationDetails } from "./components/evaluation-details";
import { VehicleDataComparison } from "./components/vehicle-detail-comparison";

function App() {
  return (
    <div className="flex flex-col gap-6">
      <div className="break-inside-avoid-page">
        <Header />
      </div>

      <div className="flex flex-col gap-4">
        <div className="break-inside-avoid-page">
          <VehicleStatusGrid />
        </div>

        <div className="break-inside-avoid-page">
          <DebtsSummary />
        </div>

        <div className="break-inside-avoid-page">
          <EvaluationDetails />
        </div>

        <div className="break-inside-avoid-page">
          <VehicleDataComparison />
        </div>
      </div>

      <h1 className="text-3xl font-bold underline">{`{name}`}</h1>
    </div>
  );
}

export default App;
