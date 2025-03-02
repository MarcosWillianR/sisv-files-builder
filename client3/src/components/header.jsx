import carPlate from "../assets/car-plate.png";

export function Header() {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-0">
      <div className="primary-bg-color h-[198px] px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 bg-white rounded-xl px-6 py-4">
            <div className="flex items-center gap-6">
              <img src={`{customizationConfig.s3File.url}`} width={175} height={45} />

              <div>
                <div className="text-zinc-900 text-[8px]">CNPJ da Franquia:</div>
                <div className="font-bold text-[10px]">{`{formattedCNPJ}`}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-4 py-2 bg-white rounded-xl">
            <img src={`{QRCode}`} width={59} height={59} />
            <span className="text-[7px] font-medium">Ver relatório digital</span>
          </div>
        </div>

        <div className="text-white flex flex-col px-6">
          <h1 className="font-semibold">Relatório do Veículo</h1>
          <p className="text-[10px] font-medium">
            Concluída em {`{formattedDate}`} {`{formattedHour}`}
          </p>
        </div>
      </div>

      <div className="px-8 py-5 flex justify-between border mx-6 bg-white rounded-xl primary-border-color -mt-12">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Marca</span>
          <span className="font-bold">{`{formattedBrand}`}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Modelo</span>
          <span className="font-bold">{`{formattedModel}`}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Ano</span>
          <span className="font-bold">{`{inspectionVehicleData.data.yearManufactureModel}`}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Km</span>
          <span className="font-bold">{`{inspectionVehicleData.data.km}`}</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <img src={carPlate} width={148} />
          <span className="text-2xl font-bold absolute inset-0 top-2 flex items-center justify-center">{`{inspectionVehicleData.data.licensePlate}`}</span>
        </div>
      </div>
    </div>
  );
}
