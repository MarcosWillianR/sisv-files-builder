import { Check } from 'lucide-react'

export default function ItemCard() {
  return (
    <div className="max-w-sm rounded-2xl overflow-hidden bg-gray-100 shadow-md">
      {/* Header */}
      <div className="bg-gray-400 px-4 py-2 text-white">
        <h2 className="text-sm font-medium">Frente e lateral esquerda</h2>
      </div>

      <div>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png"
          alt="Car view"
          className="w-full h-44 object-cover"
        />
      </div>

      {/* Status */}
      <div className="px-4 py-2 flex items-center gap-2 bg-gray-400">
        <div className="bg-green-500 rounded-full p-0.5">
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm text-white">Em perfeito estado</span>
      </div>
    </div>
  )
}