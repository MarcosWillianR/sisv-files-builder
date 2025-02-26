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
    <div className="grid grid-cols-3 border-b last:border-b-0">
      <div className="py-1 px-4 text-sm font-bold text-gray-700">{label}</div>
      <div className={`py-1 px-4 text-sm ${dataClassName}`}>{vehicleData}</div>
      <div className="py-1 px-4 text-sm text-gray-900">{factoryData}</div>
    </div>
  );
}

export function VehicleDataComparison() {
  const rows = [
    {
      label: "PLACA:",
      vehicleData: "ABC1D34",
      factoryData: "ABC1D34",
    },
    {
      label: "MARCA/MODELO:",
      vehicleData: "CHEVROLET PRISMA 1.4",
      factoryData: "CHEVROLET PRISMA 1.4",
    },
    {
      label: "COR:",
      vehicleData: "BRANCO",
      factoryData: "BRANCO",
    },
    {
      label: "COMBUSTÍVEL:",
      vehicleData: "ALCOOL/GASOLINA",
      factoryData: "ALCOOL/GASOLINA",
    },
    {
      label: "ANO:",
      vehicleData: "2024/2025",
      factoryData: "2024/2025",
    },
    {
      label: "GRAV. DO CHASSI:",
      vehicleData: "93Y5SRZ85LJ221234",
      factoryData: "93Y5SRZ85LJ221234",
    },
    {
      label: "GRAVAÇÃO DO MOTOR:",
      vehicleData: "B4FC40 2Q16 15 34",
      factoryData: "B4DC40 1Q16 18 31",
      highlight: true,
    },
    {
      label: "KM:",
      vehicleData: "123.456",
      factoryData: "123.456",
    },
  ];

  return (
    <div className="rounded-xl overflow-hidden shadow-sm border border-rounded">
      <div className="bg-[#6C097D] text-white grid grid-cols-3">
        <div className="py-2 px-4 text-left font-medium text-sm">Itens</div>
        <div className="py-2 px-4 text-left font-medium text-sm">
          Dados do veículo
        </div>
        <div className="py-2 px-4 text-left font-medium text-sm">
          Dados da fábrica
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
      <div className="h-[35px] bg-[#6C097D]"></div>
    </div>
  );
}
