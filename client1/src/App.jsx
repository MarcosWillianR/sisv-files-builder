import { VehicleDataComparison } from "./components/vehicle-detail-comparison";
import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { IconDescription } from "./components/icon-description";
import { VehicleGrid12 } from "./components/vehicle-grid-12";
import { VehicleGrid2 } from "./components/vehicle-grid-2";
import { RatingGrid } from "./components/rating-grid";
import ContactInfo from "./components/contact-info";

function App() {
  return (
    <div className="flex flex-col gap-4 mx-6">
      <div className="break-inside-avoid-page">
        <VehicleStatusGrid />
      </div>

      <div className="break-inside-avoid-page">
        <IconDescription />
      </div>

      <div id="VehicleDataComparison" className="break-inside-avoid-page hidden">
        <VehicleDataComparison />
      </div>

      <div id="VehicleGrid2" className="break-inside-avoid-page hidden">
        <VehicleGrid2 />
      </div>

      <div id="ObservationGrid" className="break-inside-avoid-page w-full self-center hidden">
        <div className="w-full rounded-2xl overflow-hidden shadow-md border border-[#9D9D9D]">
          <div className="primary-bg-color px-4 py-2 text-white">
            <h2 className="font-medium" />
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 place-items-center">
            <p className="w-full" />
          </div>

          <div className="h-9 primary-bg-color"></div>
        </div>
      </div>

      <div id="VehicleGrid12" className="break-inside-avoid-page hidden">
        <VehicleGrid12 />
      </div>

      <div id="RatingGrid" className="break-inside-avoid-page hidden">
        <RatingGrid />
      </div>

      <div className="w-full break-inside-avoid-page self-center">
        <div id="NotesGrid" className="w-full rounded-2xl overflow-hidden hidden">
          <div className="secondary-bg-color px-4 py-2 text-white">
            <h2 className="font-medium">Informações Importantes</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 py-6 place-items-center">
            <p id="NotesGridText" className="w-full p-4"></p>
          </div>

          <div className="h-10 secondary-bg-color" />
        </div>

        <div className="break-inside-avoid-page self-center mt-6">
          <div className="w-full rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 gap-4 p-6 place-items-center">
              <ContactInfo />
            </div>

            <div className="h-9 secondary-bg-color"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
