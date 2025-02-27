import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { IconDescription } from "./components/icon-description";
import { VehicleDataComparison } from "./components/vehicle-detail-comparison";
import { GridContainer } from "./components/grid-container";
import ContactInfo from "./components/contact-info";
import { VehicleGrid4 } from "./components/vehicle-grid-4";
import { RatingGrid } from "./components/rating-grid";
import { VehicleGrid6 } from "./components/vehicle-grid-6";
import { ObservationGrid } from "./components/observation-grid";
import { NotesGrid } from "./components/notes-grid";

function App() {
  return (
    <div className="flex flex-col gap-2">
      {/* <div className="break-inside-avoid-page">
        <Header />
      </div> */}

      <div className="flex flex-col gap-4 mx-6">
        <div className="break-inside-avoid-page order-first">
          <VehicleStatusGrid />
        </div>

        <div id="VehicleDataComparison" className="break-inside-avoid-page order-1 hidden">
          <VehicleDataComparison />
        </div>

        <div className="break-inside-avoid-page order-2">
          <div className="mb-6">
            <IconDescription />
          </div>

          <VehicleGrid4 />
        </div>

        <div id="RatingGrid" className="break-inside-avoid-page order-3">
          <RatingGrid />
        </div>

        <div id="VehicleGrid6" className="break-inside-avoid-page order-4">
          <VehicleGrid6 />
        </div>

        <div className="w-full break-inside-avoid-page self-center order-5">
          <ObservationGrid />

          <div id="NotesGrid" className="break-inside-avoid-page mt-6">
            <NotesGrid />
          </div>
        </div>

        <div className="w-full break-inside-avoid-page self-center mt-6 order-last">
          <GridContainer columns={2} border={false}>
            <ContactInfo />
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
