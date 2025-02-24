import qrcodeTest from "../assets/qrcode.png";
import carPlate from "../assets/car-plate.png";

export function Header() {
  return (
    <div className="grid grid-rows-[auto_1fr] gap-0">
      <div className="bg-[#F6AD16] h-[198px] px-6 py-4">
        <div className="flex items-start gap-4">
          <div className="flex-1 bg-white rounded-xl px-6 py-4">
            <div className="flex items-center gap-6">
              <img
                src="https://cardados.com.br/wp-content/uploads/2021/11/Imagem1-165x42.png"
                width={175}
                height={45}
              />

              <div>
                <div className="text-zinc-900 text-[8px]">
                  CNPJ da Franquia:
                </div>
                <div className="font-bold text-[10px]">54.812.725/0001-03</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center px-4 py-2 bg-white rounded-xl">
            <img
              src={qrcodeTest || "/placeholder.svg"}
              width={59}
              height={59}
            />
            <span className="text-[7px] font-medium">
              Ver relatório digital
            </span>
          </div>
        </div>

        <div className="text-white flex flex-col px-6">
          <h1 className="font-semibold">Relatório do Veículo</h1>
          <p className="text-[10px] font-medium">
            Concluída em 11/02/2025 10:37
          </p>
        </div>
      </div>

      <div className="px-8 py-5 flex justify-between border mx-6 bg-white rounded-xl border-[#F6AD16] -mt-12">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Marca</span>
          <span className="font-bold">FIAT</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Modelo</span>
          <span className="font-bold">ARGO DRIVE 1.0</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Ano</span>
          <span className="font-bold">2022</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-medium">Km</span>
          <span className="font-bold">120.543</span>
        </div>

        <div className="relative flex flex-col gap-1">
          <img src={carPlate || "/placeholder.svg"} width={148} />
          <span className="text-2xl font-bold absolute inset-0 top-2 flex items-center justify-center">
            ABC1D34
          </span>
        </div>
      </div>
    </div>
  );
}
