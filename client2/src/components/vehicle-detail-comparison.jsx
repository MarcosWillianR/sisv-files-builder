export function VehicleDataComparison() {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-rounded">
      <div className="secondary-bg-color text-white grid grid-cols-3">
        <div className="py-px px-4 text-left font-medium text-sm">Itens</div>
        <div className="py-px px-4 text-left font-medium text-sm">Dados do veículo</div>
        <div className="py-px px-4 text-left font-medium text-sm">Dados de fábrica</div>
      </div>
      <div>
        <div className="grid grid-cols-3 border-b last:border-b-0 py-px">
          <div className="py-px px-4 text-xs font-bold text-gray-700">PLACA:</div>
          <div className="py-px px-4 text-xs text-red-600 underline font-bold">licensePlate</div>
          <div className="py-px px-4 text-xs text-gray-900">licensePlate</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0">
          <div className="py-px px-4 text-xs font-bold text-gray-700">MARCA/MODELO:</div>
          <div className="py-px px-4 text-xs text-gray-900">brandModel</div>
          <div className="py-px px-4 text-xs text-gray-900">brandModel</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0">
          <div className="py-px px-4 text-xs font-bold text-gray-700">COR:</div>
          <div className="py-px px-4 text-xs text-gray-900">color</div>
          <div className="py-px px-4 text-xs text-gray-900">color</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0">
          <div className="py-px px-4 text-xs font-bold text-gray-700">COMBUSTÍVEL:</div>
          <div className="py-px px-4 text-xs text-gray-900">fuelType</div>
          <div className="py-px px-4 text-xs text-gray-900">fuelType</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0">
          <div className="py-px px-4 text-xs font-bold text-gray-700">ANO:</div>
          <div className="py-px px-4 text-xs text-gray-900">yearManufactureModel</div>
          <div className="py-px px-4 text-xs text-gray-900">yearManufactureModel</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0">
          <div className="py-px px-4 text-xs font-bold text-gray-700">GRAV. DO CHASSI:</div>
          <div className="py-px px-4 text-xs text-gray-900">chassis</div>
          <div className="py-px px-4 text-xs text-gray-900">chassis</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0">
          <div className="py-px px-4 text-xs font-bold text-gray-700">GRAVAÇÃO DO MOTOR:</div>
          <div className="py-px px-4 text-xs text-gray-900">engineNumber</div>
          <div className="py-px px-4 text-xs text-gray-900">engineNumber</div>
        </div>

        <div className="grid grid-cols-3 border-b last:border-b-0 py-px">
          <div className="py-px px-4 text-xs font-bold text-gray-700">KM:</div>
          <div className="py-px px-4 text-xs text-gray-900">km</div>
          <div className="py-px px-4 text-xs text-gray-900">km</div>
        </div>
      </div>
      <div className="h-[24px] secondary-bg-color"></div>
    </div>
  );
}
