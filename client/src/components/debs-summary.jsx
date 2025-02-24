/* eslint-disable react/prop-types */
function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function DebtItem({ label, value, valueColor = "red" }) {
  return (
    <div className="flex flex-col items-start">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span
        className={`text-sm font-medium ${
          valueColor === "red" ? "text-red-600" : "text-blue-600"
        }`}
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}

export function DebtsSummary() {
  const debts = [
    { label: "IPVA", value: 2392.13 },
    { label: "Licenciamento", value: 167.74 },
    { label: "DPVAT", value: 0, valueColor: "blue" },
    { label: "Multas", value: 803.88 },
    { label: "Total de dívidas", value: 803.88 },
  ];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#9D9D9D]">
      <div className="bg-gray-400 text-white px-4 py-2 font-medium">
        Débitos / Multas
      </div>
      <div className="px-4 py-3 flex flex-wrap gap-6 justify-between">
        {debts.map((debt) => (
          <DebtItem
            key={debt.label}
            label={debt.label}
            value={debt.value}
            valueColor={debt.valueColor}
          />
        ))}
      </div>
    </div>
  );
}
