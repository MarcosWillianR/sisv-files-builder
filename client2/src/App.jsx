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

export default function App() {
  return (
    <div className="flex flex-col gap-2">
      {/* <div className="break-inside-avoid-page">
        <Header />
      </div> */}

      <div className="flex flex-col gap-2 mx-6">
        <div className="break-inside-avoid-page order-first">
          <VehicleStatusGrid />
        </div>

        <div id="VehicleDataComparison" className="break-inside-avoid-page order-1 hidden">
          <VehicleDataComparison />
        </div>

        <div className="break-inside-avoid-page order-2">
          <IconDescription />
          <VehicleGrid4 />
        </div>

        <div id="RatingGrid" className="break-inside-avoid-page order-3 hidden">
          <RatingGrid />
        </div>

        <div id="VehicleGrid6" className="break-inside-avoid-page order-4 hidden">
          <VehicleGrid6 />
        </div>

        <div id="CroquiGrid" className="break-inside-avoid-page order-5 hidden">
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

        <div className="w-full break-inside-avoid-page self-center order-6">
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
