export function EvaluationDetails() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#9D9D9D]">
      <div className="bg-gray-400 text-white px-4 py-2 flex justify-between items-center">
        <h2 className="font-medium">Detalhes da avaliação</h2>
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <span className="min-w-[187px] text-center bg-green-600 text-white px-3 py-0.5 border-4 border-white rounded-full text-sm font-medium">
            APROVADO
          </span>
        </div>
      </div>
      <div className="px-4 py-1">
        <p className="text-gray-700 text-sm leading-relaxed uppercase">
          O VEÍCULO POSSUI REPAROS QUE NÃO AFETAM SUA ESTRUTURA, PNEUS TRASEIROS DESGASTADOS, LUZ DE INJEÇÃO ACESA,
          AVARIA NO PARA-CHOQUE TRASEIRO QUE NÃO AFETA A ESTRUTURA.
        </p>
      </div>
    </div>
  );
}
