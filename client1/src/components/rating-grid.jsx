import { Check, X } from "lucide-react";
import { IoAlert } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";

export function RatingGrid() {
  return (
    <div id="RatingChunk" className="break-before-page first:break-before-auto">
      <div className="w-full rounded-2xl overflow-hidden">
        <div id="RatingGridTitle" className="secondary-bg-color px-4 py-2 text-white hidden">
          <h2 className="font-medium">Avaliação dos itens</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 py-6 place-items-center">
          <div id="RatingChunkItem" className="w-full">
            <div className="bg-[#EFEFEF] rounded-xl overflow-hidden">
              <div className="px-4 py-1 bg-[#9D9D9D]">
                <h3 id="title" className="text-sm font-bold text-white"></h3>
              </div>

              <div className="px-4 py-1 flex items-center gap-2">
                <div id="SUCCESS" className="rounded-full bg-[#48BB78] p-1 hidden">
                  <Check className="text-white" size={16} />
                </div>

                <div id="RESTRICTION" className="rounded-full bg-[#F59E0B] p-1 hidden">
                  <IoAlert className="text-white" size={16} />
                </div>

                <div id="OBSERVATION" className="rounded-full bg-[#3B82F6] p-1 hidden">
                  <AiOutlineInfo className="text-white" size={16} />
                </div>

                <div id="FAILED" className="rounded-full bg-[#EF4444] p-1 hidden">
                  <X className="text-white" size={16} />
                </div>

                <span id="description" className="text-sm"></span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-9 secondary-bg-color" />
      </div>
    </div>
  );
}
