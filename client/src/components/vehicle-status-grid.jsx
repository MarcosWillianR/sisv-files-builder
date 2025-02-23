/* eslint-disable react/prop-types */
import { Check, X } from "lucide-react";

function StatusItem({ title, status }) {
  const isPositive = status === "não possui";

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">
        {title}
      </div>
      <div
        className={`px-3 py-1 flex items-center gap-2 text-sm ${
          isPositive ? "bg-green-100" : "bg-red-100"
        }`}
      >
        {isPositive ? (
          <Check className="w-4 h-4 text-green-600" />
        ) : (
          <X className="w-4 h-4 text-red-600" />
        )}
        <span className={isPositive ? "text-green-700" : "text-red-700"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
}

export function VehicleStatusGrid() {
  const statuses = [
    { title: "Roubo / Furto", status: "não possui" },
    { title: "Débitos / Multas", status: "possui" },
    { title: "Restrições", status: "não possui" },
    { title: "Indício de Sinistro", status: "não possui" },
    { title: "Sinistro", status: "não possui" },
    { title: "Leilão", status: "possui" },
    { title: "Recall", status: "não possui" },
    { title: "Venda direta", status: "não possui" },
    { title: "Remarketing", status: "não possui" },
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
      <div className="bg-gray-400 text-white px-4 py-2 font-medium">
        Relatório do Veículo
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {statuses.map((item) => (
          <StatusItem
            key={item.title}
            title={item.title}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}
