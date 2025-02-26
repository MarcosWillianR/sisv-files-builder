/* eslint-disable react/prop-types */
import { Check } from "lucide-react";

export default function ItemCard({ customHeight, title = "", carStatus }) {
  return (
    <div className={`flex flex-col w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md`}>
      {title && title.trim().length > 0 && (
        <div className="px-4 py-2 text-black">
          <h2 className="text-sm font-medium">Frente e lateral esquerda</h2>
        </div>
      )}

      <div className={`w-full bg-gray-200 flex items-center justify-center`}>
        <img
          src="https://i.imgur.com/fl0uV88.png"
          alt="Car view"
          style={customHeight && { height: customHeight }}
          className={`w-full object-fill`}
        />
      </div>

      {carStatus != null && (
        <div className="px-4 py-2 flex items-center gap-2">
          <div className="bg-green-500 rounded-full p-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm text-semibold text-black">Em perfeito estado</span>
        </div>
      )}
    </div>
  );
}
