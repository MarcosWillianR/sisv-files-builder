export function VehicleDataComparison() {
  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-rounded">
      <div className="primary-bg-color text-white grid grid-cols-4">
        <div className="py-2 px-4 text-left font-medium text-sm">Itens</div>
        <div className="py-2 px-4 text-left font-medium text-sm">Dados do veículo</div>
        <div className="py-2 px-4 text-left font-medium text-sm">Dados da fábrica</div>
        <div className="py-2 px-4 text-left font-medium text-sm">Dados Senatran</div>
      </div>
      <div>
        <div className="grid grid-cols-4 border-b last:border-b-0">
          <div className="py-1 px-4 text-sm font-bold text-gray-700">Placa:</div>
          <div className="py-1 px-4 text-sm text-red-600 underline font-bold">licensePlate</div>
          <div className="py-1 px-4 text-sm text-gray-900">licensePlate</div>
        </div>

        <div className="grid grid-cols-4 border-b last:border-b-0">
          <div className="py-1 px-4 text-sm font-bold text-gray-700">Gravação do chassi:</div>
          <div className="py-1 px-4 text-sm text-gray-900">brandModel</div>
          <div className="py-1 px-4 text-sm text-gray-900">brandModel</div>
          <div className="py-1 px-4 text-sm text-gray-900">brandModel</div>
        </div>

        <div className="grid grid-cols-4 border-b last:border-b-0">
          <div className="py-1 px-4 text-sm font-bold text-gray-700">Gravação do motor:</div>
          <div className="py-1 px-4 text-sm text-gray-900">color</div>
          <div className="py-1 px-4 text-sm text-gray-900">color</div>
          <div className="py-1 px-4 text-sm text-gray-900">color</div>
        </div>

        <div className="grid grid-cols-4 border-b last:border-b-0">
          <div className="py-1 px-4 text-sm font-bold text-gray-700">Gravação do câmbio:</div>
          <div className="py-1 px-4 text-sm text-gray-900">fuelType</div>
          <div className="py-1 px-4 text-sm text-gray-900">fuelType</div>
          <div className="py-1 px-4 text-sm text-gray-900">fuelType</div>
        </div>

        <div className="grid grid-cols-4 border-b last:border-b-0">
          <div className="py-1 px-4 text-sm font-bold text-gray-700">Cor:</div>
          <div className="py-1 px-4 text-sm text-gray-900">yearManufactureModel</div>
          <div className="py-1 px-4 text-sm text-gray-900">yearManufactureModel</div>
          <div className="py-1 px-4 text-sm text-gray-900">yearManufactureModel</div>
        </div>

        <div className="grid grid-cols-4 border-b last:border-b-0">
          <div className="py-1 px-4 text-sm font-bold text-gray-700">Combustível:</div>
          <div className="py-1 px-4 text-sm text-gray-900">chassis</div>
          <div className="py-1 px-4 text-sm text-gray-900">chassis</div>
          <div className="py-1 px-4 text-sm text-gray-900">chassis</div>
        </div>
      </div>
    </div>
  );
}
