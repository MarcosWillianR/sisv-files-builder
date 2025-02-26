import { Check, X } from "lucide-react";
import { IoAlert } from "react-icons/io5";
import { AiOutlineInfo } from "react-icons/ai";

export function RatingItem({ title, description, status }) {
  const renderStatus = () => {
    const availableRenderIcon = {
      SUCCESS: {
        bgColor: "bg-[#48BB78]",
        icon: <Check className="text-white" size={16} />,
      },
      RESTRICTION: {
        bgColor: "bg-[#F59E0B]",
        icon: <IoAlert className="text-white" size={16} />,
      },
      OBSERVATION: {
        bgColor: "bg-[#3B82F6]",
        icon: <AiOutlineInfo className="text-white" size={16} />,
      },
      FAILED: {
        bgColor: "bg-[#EF4444]",
        icon: <X className="text-white" size={16} />,
      },
    };

    const { bgColor, icon: Icon } = availableRenderIcon[status];
    return <div className={`rounded-full ${bgColor} p-1`}>{Icon}</div>;
  };

  return (
    <div className="w-full">
      <div className="bg-[#EFEFEF] rounded-xl overflow-hidden">
        <div className="px-4 py-1 bg-[#9D9D9D]">
          <h3 className="text-sm font-bold text-white">{title}</h3>
        </div>

        <div className="px-4 py-1 flex items-center gap-2">
          {renderStatus()}
          <span className="text-sm">{description}</span>
        </div>
      </div>
    </div>
  );
}
