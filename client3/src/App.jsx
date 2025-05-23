import { Header } from "./components/header";
import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { DebtsSummary } from "./components/debs-summary";
import { EvaluationDetails } from "./components/evaluation-details";
import { VehicleDataComparison } from "./components/vehicle-detail-comparison";
import { GridContainer } from "./components/grid-container";
import { Location } from "./components/location";
import { VehicleGrid6 } from "./components/vehicle-grid-6";
import { VehicleGrid15 } from "./components/vehicle-grid-15";

function App() {
  return (
    <div className="flex flex-col gap-6">
      <div className="break-inside-avoid-page">
        <Header />
      </div>

      <div className="flex flex-col gap-3 mx-6">
        <div className="break-inside-avoid-page">
          <Location />
        </div>

        <div id="VehicleStatusGrid" className="break-inside-avoid-page hidden">
          <VehicleStatusGrid />
        </div>

        <div id="DebtsSummary" className="break-inside-avoid-page hidden">
          <DebtsSummary />
        </div>

        <div id="EvaluationDetails" className="break-inside-avoid-page hidden">
          <EvaluationDetails />
        </div>

        <div id="VehicleDataComparison" className="break-inside-avoid-page hidden">
          <VehicleDataComparison />
        </div>

        <div id="VehicleGrid6" className="break-inside-avoid-page hidden">
          <VehicleGrid6 />
        </div>

        <div id="VehicleGrid15" className="break-inside-avoid-page hidden">
          <VehicleGrid15 />
        </div>

        <div id="CroquiGrid" className="break-inside-avoid-page hidden">
          <div id="CroquiChunk" className="break-before-page first:break-before-auto">
            <div className="w-full rounded-2xl overflow-hidden">
              <div id="CroquiGridTitle" className="secondary-bg-color px-4 py-2 text-white hidden">
                <h2 className="font-medium">Itens Analisados</h2>
              </div>

              <div className="py-4 place-items-center">
                <div id="CroquiChunkItem" className="break-before-page first:break-before-auto" />
              </div>
            </div>
          </div>
        </div>

        <div id="NotesGrid" className="h-[92vh] break-inside-avoid-page">
          <GridContainer title="Informações Importantes" columns={1}>
            <p className="w-full" />
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
