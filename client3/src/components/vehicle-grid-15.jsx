import { Check, X } from "lucide-react";
import { IoAlert } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";

export function VehicleGrid15() {
  return (
    <div id="VehicleChunk" className="break-before-page first:break-before-auto">
      <div className="w-full rounded-2xl overflow-hidden">
        <div id="VehicleGrid15Title" className="primary-bg-color px-4 py-2 text-white hidden">
          <h2 className="font-medium">Fotos do veículo</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 py-6 place-items-center">
          <div id="VehicleChunkItem" className="flex flex-col w-full rounded-2xl overflow-hidden bg-[#9D9D9D] shadow-md">
            <div className="px-4 py-2 text-white">
              <h2 id="vehicleName" className="text-sm font-medium"></h2>
            </div>

            <div id="VehicleGrid15-Image" className="w-full h-[210px] bg-gray-200 bg-cover bg-center" />

            <div className="px-4 py-2 flex flex-col gap-1 bg-[#9D9D9D]">
              <div className="flex items-center gap-2">
                <div id="VehicleGrid15-SUCCESS" className="bg-[#48BB78] rounded-full p-0.5 hidden">
                  <Check className="text-white" size={16} />
                </div>

                <div id="VehicleGrid15-RESTRICTION" className="rounded-full bg-[#F59E0B] p-0.5 hidden">
                  <IoAlert className="text-white" size={16} />
                </div>

                <div id="VehicleGrid15-OBSERVATION" className="rounded-full bg-[#3B82F6] p-0.5 hidden">
                  <AiOutlineInfo className="text-white" size={16} />
                </div>

                <div id="VehicleGrid15-FAILED" className="rounded-full bg-[#EF4444] p-0.5 hidden">
                  <X className="text-white" size={16} />
                </div>

                <span id="vehicleDesc" className="text-sm text-semibold text-white">
                  texto padrão
                </span>
              </div>
              <p className="text-xs text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
