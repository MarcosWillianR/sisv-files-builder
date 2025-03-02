import { Check, X } from "lucide-react";

export function VehicleStatusGrid() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#9D9D9D]">
      <div className="bg-gray-400 text-white px-4 py-2 font-medium">Relatório do Veículo</div>
      <div className="grid grid-cols-3 gap-4 px-4 py-1">
        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Roubo / Furto</h3>

          <div id="VSG-wrapper-roubofurto" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Débitos / Multas</h3>

          <div id="VSG-wrapper-debitosmultas" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Restrições</h3>

          <div id="VSG-wrapper-restricoes" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Indício de Sinistro</h3>

          <div id="VSG-wrapper-indiciosinistro" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Sinistro</h3>

          <div id="VSG-wrapper-sinistro" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Leilão</h3>

          <div id="VSG-wrapper-leilao" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Recall</h3>

          <div id="VSG-wrapper-recall" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Venda direta</h3>

          <div id="VSG-wrapper-vendadireta" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>

        <div className="rounded-lg overflow-hidden">
          <h3 className="bg-gray-400 text-white px-3 py-1 text-sm font-medium">Remarketing</h3>

          <div id="VSG-wrapper-remarketing" className="px-3 py-1 flex items-center gap-2 text-sm">
            <div className="bg-green-500 rounded-full p-0.5 hidden">
              <Check className="w-4 h-4 text-white" />
            </div>

            <div className="bg-red-500 rounded-full p-0.5 hidden">
              <X className="w-4 h-4 text-white" />
            </div>

            <span />
          </div>
        </div>
      </div>
    </div>
  );
}
