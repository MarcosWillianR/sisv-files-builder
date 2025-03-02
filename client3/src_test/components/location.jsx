export function Location() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#9D9D9D]">
      <div className="bg-gray-400 text-white px-4 py-2 font-medium">Localização</div>
      <div className="px-4 py-1 flex flex-wrap gap-6 justify-between">
        <div className="space-y-1">
          <div className="flex gap-2">
            <p className="text-gray-800 text-sm">Porto Alegre, RS, Brasil</p>
            <p className="text-gray-800 text-sm">Latitude: -30.1188, Longitude: -51.168</p>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            O endereço exibido é determinado com base nos parâmetros de Latitude e Longitude registrados pelo usuário
            durante a inspeção, podendo apresentar pequenas variações em alguns casos.
          </p>
        </div>
      </div>
    </div>
  );
}
