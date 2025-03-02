import { Header } from "./components/header";
import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { DebtsSummary } from "./components/debs-summary";
import { EvaluationDetails } from "./components/evaluation-details";
import { VehicleDataComparison } from "./components/vehicle-detail-comparison";
import { GridContainer } from "./components/grid-container";
import { Location } from "./components/location";
import { ItemCard } from "./components/item-card";

function App() {
  const cars = [
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="break-inside-avoid-page">
        <Header />
      </div>

      <div className="flex flex-col gap-3 mx-6">
        <div className="break-inside-avoid-page">
          <Location />
        </div>

        <div className="break-inside-avoid-page">
          <VehicleStatusGrid />
        </div>

        <div className="break-inside-avoid-page">
          <DebtsSummary />
        </div>

        <div className="break-inside-avoid-page">
          <EvaluationDetails />
        </div>

        <div className="break-inside-avoid-page">
          <VehicleDataComparison />
        </div>

        <div className="break-inside-avoid-page">
          <GridContainer title="Galeria de Carros" columns={2} fullPage>
            {cars.slice(0, 6).map((car, index) => (
              <ItemCard
                customHeight="195px"
                key={index}
                title={car.title}
                imageUrl={car.imageUrl}
                status={car.status}
              />
            ))}
          </GridContainer>
        </div>

        <div className="break-inside-avoid-page">
          <GridContainer columns={3}>
            {cars.slice(6).map((car, index) => (
              <ItemCard customHeight="90px" key={index} title={car.title} imageUrl={car.imageUrl} status={car.status} />
            ))}
          </GridContainer>
        </div>

        <div className="break-inside-avoid-page">
          <GridContainer title="Informações Importantes" columns={1}>
            <p className="w-full">
              Este laudo trata-se da vistoria cautelar do veículo, possuindo caráter informativo da análise de itens,
              conforme padrões estabelecidos pelos fabricantes. Cabe destacar que a unidade não se responsabiliza por
              quaisquer modificações nos itens do veículo contemplados nesta vistoria, posteriores à realização deste
              laudo, cuja validade tem sua garantia certificada no momento da realização da vistoria. O resultado do
              laudo técnico segue critérios de avaliação estabelecidos, podendo sofrer alterações necessárias em
              determinado momento, sem prévia comunicação. As informações dos veículos, obtidas através de pesquisa via
              base de dados dos órgãos públicos e empresas privadas, são de responsabilidade da empresa fornecedora da
              pesquisa, cabendo apenas reiterar os dados cadastrados nas referidas bases de consulta. Ao receber este
              laudo, o cliente fica ciente que as companhias de seguro possuem métodos e critérios próprios de avaliação
              do risco para aceitação ou não de veículos. Não obstante, o critério de avaliação bem como o resultado
              final da vistoria, independete da aceitação ou não da seguradora. Importante notar que NÃO são examinados
              itens de mecânica, elétrica, transmissão, suspensão e freios. A análise de pintura é realizada através de
              medidores digitais que informam a espessura da camada de tinta, apenas em caráter informativo de retoques
              ou reparos expressivos em sua lataria, que não afetam a estrutura do veículo, NÃO apontamos pequenos
              riscos nem desgastes na pintura. NÃO nos responsabilizamos por defeitos ou fraudes em equipamentos de
              Air-Bag. A verificação da numeração da caixa de câmbio somente é realizadas se tal item está aparente, sem
              a necessidade de desmontar partes do veículo que tornam a gravação obstruída. A vistoria cautelar não
              afere a idoneidade da quilometragem constante no hodômetro do veículo, sendo apenas registrado em caráter
              informativo a quilometragem aparente em seu painel de instrumentos. Alguns itens obrigatórios e acessórios
              como pneus, setas, cintos e outros acessórios, são apenas informados quanto a sua existência e
              funcionamento mínimo, não sendo atestada calibragem ou cumprimento de normas técnicas específicas.
            </p>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
