import { Check, X } from "lucide-react";
import { IoAlert } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";

export function IconDescription() {
  return (
    <div className="flex flex-wrap gap-2 items-center justify-between px-8">
      <div className="flex items-center gap-2">
        <div className="rounded-full" style={{ backgroundColor: "#48BB78", padding: "0.25rem" }}>
          <Check className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm">Dentro dos padrões</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-full" style={{ backgroundColor: "#3B82F6", padding: "0.25rem" }}>
          <AiOutlineInfo className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm">Observação</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-full" style={{ backgroundColor: "#F59E0B", padding: "0.25rem" }}>
          <IoAlert className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm">Restrição</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-full" style={{ backgroundColor: "#EF4444", padding: "0.25rem" }}>
          <X className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm">Fora dos padrões</span>
      </div>
    </div>
  );
}
