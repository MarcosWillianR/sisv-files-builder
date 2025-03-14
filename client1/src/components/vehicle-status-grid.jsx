import { Smartphone, User } from "lucide-react";
import { PiHouse } from "react-icons/pi";

export function VehicleStatusGrid() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-row primary-bg-color text-white px-4 py-2">
        <div className="self-end text-md font-bold">
          {`{inspectionVehicleData.data.licensePlate}`} - {`{inspectionName}`}
        </div>
      </div>
      <div className="relative px-6 py-2">
        <div className="grid grid-cols-2 gap-x-8 gap-y-2">
          <div className="space-y-2">
            <div className="flex flex-col">
              <div className="flex items-center">
                <PiHouse size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Unidade:</span>
              </div>
              <span className="ml-7">{`{unit.name}`}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <User size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Responsável técnico:</span>
              </div>
              <span className="ml-7">{`{expert.firstName} {expert.lastName}`}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-col">
              <div className="flex items-center">
                <User size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Cliente:</span>
              </div>
              <span className="ml-7">{`{formattedClientName}`}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Smartphone size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Telefone:</span>
              </div>
              <span className="ml-7">{`{formattedClientPhone}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-1xl h-5 primary-bg-color"></div>
    </div>
  );
}
