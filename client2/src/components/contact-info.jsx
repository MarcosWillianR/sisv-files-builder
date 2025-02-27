import { Building2, MapPin, Phone, Mail, User } from "lucide-react";

export default function ContactInfo() {
  return (
    <>
      <div className="space-y-4 min-w-[200px]">
        <div className="border-b pb-2">
          <img className="w-48" src={`{expert.signature}`} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">Responsável técnico:</span>
          </div>
          <p className="text-sm">{`{expert.firstName} {expert.lastName}`}</p>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="font-medium">Unidade:</span>
          </div>
          <p className="text-sm">{`{unit.name}`}</p>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">Endereço:</span>
          </div>
          <p className="text-sm">
            {`{unit.address.street}, {unit.address.city} - {unit.address.state} | {unit.address.zipCode}`}
          </p>
        </div>

        <div className="flex gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">Telefone:</span>
            </div>
            <p className="text-sm">{`{unit.phone}`}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="font-medium">E-mail:</span>
            </div>
            <p className="text-sm">{`{unit.email}`}</p>
          </div>
        </div>
      </div>
    </>
  );
}
