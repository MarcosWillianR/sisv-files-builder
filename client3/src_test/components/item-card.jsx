/* eslint-disable react/prop-types */
import { Check } from "lucide-react";

export function ItemCard({ customHeight }) {
  return (
    <div className={`flex flex-col w-full rounded-2xl overflow-hidden bg-gray-100`}>
      <div className="bg-gray-400 px-4 py-2 text-white">
        <h2 className="text-sm font-medium">Frente e lateral esquerda</h2>
      </div>

      <div className={`w-full bg-gray-200 flex items-center justify-center`}>
        <img
          src="https://i.imgur.com/fl0uV88.png"
          alt="Car view"
          style={customHeight && { height: customHeight }}
          className={`w-full object-fill`}
        />
      </div>

      <div className="px-4 py-2 flex flex-col gap-1 bg-gray-400">
        <div className="flex items-center gap-2">
          <div className="bg-green-500 rounded-full p-0.5">
            <Check className="w-4 h-4 text-white" />
          </div>
          <span className="text-xs text-white">Em perfeito estado</span>
        </div>
        <p className="text-xs text-white">Porto Alegre, RS, Brasil</p>
      </div>
    </div>
  );
}
