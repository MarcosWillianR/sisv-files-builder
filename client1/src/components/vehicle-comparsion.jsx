export default function VehicleComparison() {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="rounded-lg overflow-hidden">
          <div className="border border-purple-800 border-b-0">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-800 text-white">
                  <th className="py-3 px-4 text-left w-1/4">Item</th>
                  <th className="py-3 px-4 text-left w-2/5">Dados do veículo</th>
                  <th className="py-3 px-4 text-left w-2/5">Dados de fábrica</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">PLACA:</td>
                  <td className="py-2 px-4">ABC1234</td>
                  <td className="py-2 px-4">ABC1234</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">MARCA/MODELO:</td>
                  <td className="py-2 px-4">CHEVROLET PRISMA 1.4</td>
                  <td className="py-2 px-4">CHEVROLET PRISMA 1.4</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">COR:</td>
                  <td className="py-2 px-4">BRANCO</td>
                  <td className="py-2 px-4">BRANCO</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">COMBUSTÍVEL:</td>
                  <td className="py-2 px-4">ALCOOL/GASOLINA</td>
                  <td className="py-2 px-4">ALCOOL/GASOLINA</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">ANO:</td>
                  <td className="py-2 px-4">2024/2025</td>
                  <td className="py-2 px-4">2024/2025</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">GRAV. DO CHASSI:</td>
                  <td className="py-2 px-4 text-red-500">93Y5SRZ85LJ221234</td>
                  <td className="py-2 px-4">93Y5SRZ85LJ225265</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-4">GRAV. DO MOTOR:</td>
                  <td className="py-2 px-4">B4DC40 1Q16 18 31</td>
                  <td className="py-2 px-4">B4DC40 1Q16 18 31</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">KM:</td>
                  <td className="py-2 px-4">123.456</td>
                  <td className="py-2 px-4"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="h-16 bg-purple-800 rounded-b-lg"></div>
        </div>
      </div>
    )
  }
  
  