import carPlate from "../assets/carPlate.png";

export function VehicleStatusGrid() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-col primary-bg-color text-white p-4">
        <div className="self-end text-l font-bold">{`{inspectionName}`}</div>
      </div>
      <div className="relative px-6">
        <div className="absolute -top-[25px] left-16">
          <img src={carPlate} alt="placa" className="w-[180px] h-auto" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-black font-bold text-3xl">
            {`{inspectionVehicleData.data.licensePlate}`}
          </span>
        </div>

        <div className="pt-[5px]">
          <div className="flex justify-end w-full px-4">
            <div className="flex justify-center items-center min-w-[260px] h-[30px] approval-status-bg-color text-white rounded-[100px]">
              <span className="text-sm font-bold">{`{approvalStatus.name}`}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-8">
            <div className="flex flex-col">
              <h2 className="text-gray-700 text-base mb-1 font-bold">Veículo:</h2>
              <p className="text-lg mb-1">{`{inspectionVehicleData.data.brandModel}`}</p>
              <p className="text-gray-600 text-sm">
                {`{inspectionVehicleData.data.yearManufactureModel} - {inspectionVehicleData.data.color} - {inspectionVehicleData.data.fuelType}`}
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-gray-700 text-base mb-1 font-bold">Cliente:</h2>
              <p className="text-lg">{`{formattedClientName}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
