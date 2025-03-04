import { Building2, Phone, Smartphone, User } from 'lucide-react'
import { PiHouse } from "react-icons/pi"

export function VehicleStatusGrid() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-row bg-[#FDB017] text-white px-4 py-2">
        <div className="self-end text-l font-bold">{'ABC1234'} - Inspeção Automotiva</div>
      </div>
      <div className="relative px-6 py-4">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center">
                <PiHouse size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Unidade:</span>
              </div>
              <span className="ml-7">CAR DADOS PROCESSAMENTO DE DADOS LTDA</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <User size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Responsável técnico:</span>
              </div>
              <span className="ml-7">Pablo Vinicius Carriel Maranho</span>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <div className="flex flex-col">
              <div className="flex items-center">
                <Building2 size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Cliente:</span>
              </div>
              <span className="ml-7">Shop Car Zona Sul Esplanada LTDA</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center">
                <Smartphone size={20} className="text-gray-600" />
                <span className="ml-2 font-semibold">Telefone:</span>
              </div>
              <span className="ml-7">12 98131.5055</span>
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-1xl h-10 bg-[#FDB017]'>
      </div>
    </div>
  )
}
