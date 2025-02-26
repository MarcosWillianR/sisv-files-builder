import { Check } from "lucide-react";

export function RatingItem({ title, description }) {
  return (
    <div className="w-full">
      <div className="bg-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-1 bg-gray-300">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>

        <div className="px-4 py-1 flex items-center gap-2">
          <div className="rounded-full bg-green-500/20 p-1">
            <Check className="w-3 h-3 text-green-600" />
          </div>
          <span className="text-sm">{description}</span>
        </div>
      </div>
    </div>
  );
}
