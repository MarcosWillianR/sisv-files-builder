/* eslint-disable react/prop-types */
import { Check } from "lucide-react";

export default function ItemRating({ customHeight, title = "", carStatus }) {
  return (
    <div
      className={`flex flex-col w-full rounded-2xl overflow-hidden bg-gray-400 shadow-md`}
    >
      {title && title.trim().length > 0 && (
        <div className="bg-gray-2 00 px-4 py-2 text-white ">
          <h2 className="text-sm font-medium">Frente e lateral esquerda</h2>
        </div>
      )}

      {carStatus != null && (
        <div className="px-4 py-2 flex items-center gap-2 bg-gray-100 ">
          <div className="bg-green-500 rounded-full p-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-semibold text-black">Em perfeito estado</span>
        </div>
      )}
    </div>
  );
}
