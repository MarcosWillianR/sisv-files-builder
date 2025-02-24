import carplate from "../assets/car-plate.png"
import { Check } from "lucide-react"

export function VehicleStatusGrid() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-col bg-[#FDB017] text-white px-4 py-2">
        <div className="self-end text-l font-bold">Inspeção Automotiva</div>
      </div>
      <div className="relative px-6">
        <div className="absolute -top-[25px] left-16">
          <img src={carplate || "/placeholder.svg"} alt="Placa do Veículo" className="w-[180px] h-auto" />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/3 text-black font-bold text-3xl">
            ABC1D34
          </span>
        </div>

        <div className="pt-[15px]">
          <div className="flex justify-end w-full px-12">
            <div className="inline-flex items-center w-[230px] h-[30px] bg-[#42db47] text-white rounded-[100px]">
              <div className="flex justify-between items-center w-full px-0.4">
                <span className="flex-grow text-sm font-bold text-center">APROVADO</span>
                <Check className="w-7 h-7 bg-[#489c49] rounded-full p-1" />
              </div>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-x-8">
            <div className="flex flex-col">
              <h2 className="text-gray-700 text-base mb-1 font-bold">Veículo:</h2>
              <p className="text-lg font-semibold mb-1">CHEVROLET PRISMA 1.4</p>
              <p className="text-gray-600 text-sm">2024/2025 - BRANCO - ALCOOL/GASOLINA</p>
            </div>
            <div className="flex flex-col justify-end">
              <h2 className="text-gray-700 text-base mb-1 font-bold">Cliente:</h2>
              <p className="text-lg">Shop Car Zona Sul Esplanada LTDA</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

