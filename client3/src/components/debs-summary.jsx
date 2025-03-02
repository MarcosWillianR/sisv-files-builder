export function DebtsSummary() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#9D9D9D]">
      <div className="bg-gray-400 text-white px-4 py-2 font-medium">Débitos / Multas</div>
      <div className="px-4 py-1 flex flex-wrap gap-6 justify-between">
        <div className="debt-item flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">IPVA</h3>
          <span className="text-sm font-medium" />
        </div>

        <div className="debt-item flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Licenciamento</h3>
          <span className="text-sm font-medium" />
        </div>

        <div className="debt-item flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">DPVAT</h3>
          <span className="text-sm font-medium" />
        </div>

        <div className="debt-item flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Multas</h3>
          <span className="text-sm font-medium" />
        </div>

        <div className="debt-item flex flex-col items-start">
          <h3 className="text-sm font-medium text-gray-700">Total de dívidas</h3>
          <span className="text-sm font-medium" />
        </div>
      </div>
    </div>
  );
}
