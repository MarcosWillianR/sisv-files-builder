import { Check, X } from "lucide-react";
import { IoAlert } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";

export function VehicleGrid6() {
  return (
    <div id="VehicleChunk" className="break-before-page first:break-before-auto">
      <div className="w-full rounded-2xl overflow-hidden">
        <div id="VehicleGrid6Title" className="primary-bg-color px-4 py-2 text-white hidden">
          <h2 className="font-medium">Itens Analisados</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 place-items-center">
          <div id="VehicleChunkItem" className="flex flex-col w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md">
            <div className="px-4 py-2 text-black">
              <h2 id="vehicleName" className="text-sm font-medium"></h2>
            </div>

            <div className="w-full bg-gray-200 flex items-center justify-center">
              <img src="" alt="Car" style={{ height: 155 }} className={`w-full object-fill`} />
            </div>

            <div className="px-4 py-2 flex items-center gap-2">
              <div id="VehicleGrid6-SUCCESS" className="bg-[#48BB78] rounded-full p-0.5 hidden">
                <Check className="text-white" size={16} />
              </div>

              <div id="VehicleGrid6-RESTRICTION" className="rounded-full bg-[#F59E0B] p-0.5 hidden">
                <IoAlert className="text-white" size={16} />
              </div>

              <div id="VehicleGrid6-OBSERVATION" className="rounded-full bg-[#3B82F6] p-0.5 hidden">
                <AiOutlineInfo className="text-white" size={16} />
              </div>

              <div id="VehicleGrid6-FAILED" className="rounded-full bg-[#EF4444] p-0.5 hidden">
                <X className="text-white" size={16} />
              </div>

              <span id="vehicleDesc" className="text-sm text-semibold text-black"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
