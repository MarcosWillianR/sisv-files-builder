import { Building2, MapPin, Phone, Mail, User } from "lucide-react"

export default function ContactInfo() {
    return (
        <div className="grid grid-cols-2 gap-2 w-full">
            {/* Left Column*/}
            <div className="space-y-4 min-w-[200px]">
                <div className="border-b pb-2">
                    <img 
                    className="w-48"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Assinatura_de_Fernando_Henrique_Cardoso_-_vers%C3%A3o_3.svg/1280px-Assinatura_de_Fernando_Henrique_Cardoso_-_vers%C3%A3o_3.svg.png"></img>
                    {/* <div className="h-16 w-32 italic text-gray-400">Assinatura</div> */}
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="font-medium">Responsável técnico:</span>
                    </div>
                    <p className="text-sm">Pablo Vinicius Carriel Maranho</p>
                </div>
            </div>
            {/* RIGHT Column*/}

            <div className="space-y-4 flex-1">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">Unidade:</span>
                    </div>
                    <p className="text-sm">CAR DADOS PROCESSAMENTO DE DADOS LTDA</p>
                </div>

                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Endereço:</span>
                    </div>
                    <p className="text-sm">Alameda Rio Negro, Barueri - SP | CEP: 064.540000</p>
                </div>

                <div className="flex gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">Telefone:</span>
                        </div>
                        <p className="text-sm">12 98131.5055</p>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <span className="font-medium">E-mail:</span>
                        </div>
                        <p className="text-sm">atendimento@cardados.com.br</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

