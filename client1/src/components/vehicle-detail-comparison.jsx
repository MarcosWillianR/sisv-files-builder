/* eslint-disable react/prop-types */
function DataGroup({
  label,
  vehicleData,
  factoryData,
  senatranData,
  highlight = false,
}) {
  const dataClassName = highlight
    ? "text-red-600 underline font-bold"
    : "text-gray-900";

  return (
    <div className="grid grid-cols-4 border-b last:border-b-0">
      <div className="py-1 px-4 text-sm font-bold text-gray-700">{label}</div>
      <div className={`py-1 px-4 text-sm ${dataClassName}`}>{vehicleData}</div>
      <div className="py-1 px-4 text-sm text-gray-900">{factoryData}</div>
      <div className="py-1 px-4 text-sm text-gray-900">{senatranData}</div>
    </div>
  );
}

export function VehicleDataComparison() {
  const rows = [
    {
      label: "Placa:",
      vehicleData: "ABC1D34",
      factoryData: "ABC1D34",
      senatranData: "ABC1D34",
    },
    {
      label: "Gravação do chassi:",
      vehicleData: "93Y5SR2B5LJ225265",
      factoryData: "93Y5SR2B5LJ225265",
      senatranData: "93Y5SR2B5LJ225265",
    },
    {
      label: "Gravação do motor:",
      vehicleData: "B4FC40 2Q16 15 34",
      factoryData: "B4DC40 1Q16 18 31",
      senatranData: "B4DC40 1Q16 18 31",
      highlight: true,
    },
    {
      label: "Gravação do câmbio:",
      vehicleData: "182686-0849749",
      factoryData: "NÃO INFORMADO",
      senatranData: "NÃO INFORMADO",
    },
    {
      label: "Cor:",
      vehicleData: "BRANCO",
      factoryData: "BRANCO",
      senatranData: "BRANCO",
    },
    {
      label: "Combustível:",
      vehicleData: "ALCOOL/GASOLINA",
      factoryData: "ALCOOL/GASOLINA",
      senatranData: "ALCOOL/GASOLINA",
    },
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-rounded">
      <div className="bg-[#6C097D] text-white grid grid-cols-4">
        <div className="py-2 px-4 text-left font-medium text-sm">Itens</div>
        <div className="py-2 px-4 text-left font-medium text-sm">
          Dados do veículo
        </div>
        <div className="py-2 px-4 text-left font-medium text-sm">
          Dados da fábrica
        </div>
        <div className="py-2 px-4 text-left font-medium text-sm">
          Dados Senatran
        </div>
      </div>
      <div className="">
        {rows.map((row) => (
          <DataGroup
            key={row.label}
            label={row.label}
            vehicleData={row.vehicleData}
            factoryData={row.factoryData}
            senatranData={row.senatranData}
            highlight={row.highlight}
          />
        ))}
      </div>
      <div className="h-[35px] bg-[#6C097D]">

      </div>
    </div>
  );
}
