import { Header } from "./components/header";
import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { IconDescription } from "./components/icon-description";
import { VehicleDataComparison } from "./components/vehicle-detail-comparison";
import ItemCard from "./components/ItemCard";
import { GridContainer } from "./components/grid-container";
import ContactInfo from "./components/contact-info";
import { GridPageWrapper } from "./components/grid-page-wrapper";
import { RatingItem } from "./components/rating-item";

function App() {
  const cars = [
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Traseira",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
    {
      title: "Lateral direita",
      imageUrl:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado",
    },
  ];

  const ratings = [
    { id: 1, title: "Placa traseira", description: "Em perfeito estado" },
    { id: 2, title: "Traseira 45º", description: "Em perfeito estado" },
    { id: 3, title: "Gravação do motor", description: "Em perfeito estado" },
    { id: 4, title: "Painel traseiro", description: "Em perfeito estado" },
    { id: 5, title: "Etiqueta ETA coluna", description: "Em perfeito estado" },
    {
      id: 6,
      title: "Caixa de ar laudo direito",
      description: "Em perfeito estado",
    },
    {
      id: 7,
      title: "Longarina dianteira direita",
      description: "Em perfeito estado",
    },
    {
      id: 8,
      title: "Longarina traseira direita",
      description: "Em perfeito estado",
    },
    {
      id: 9,
      title: "Gravação do vidro para-brisa",
      description: "Em perfeito estado",
    },
    {
      id: 10,
      title: "Gravação do vidro dianteiro direito",
      description: "Em perfeito estado",
    },
    {
      id: 11,
      title: "Gravação do vidro dianteiro direito",
      description: "Em perfeito estado",
    },
    {
      id: 12,
      title: "Gravação do vidro dianteiro direito",
      description: "Em perfeito estado",
    },
    {
      id: 13,
      title: "Gravação do vidro dianteiro direito",
      description: "Em perfeito estado",
    },
    {
      id: 14,
      title: "Gravação do vidro dianteiro direito",
      description: "Em perfeito estado",
    },
    {
      id: 15,
      title: "Gravação do vidro dianteiro direito",
      description: "Em perfeito estado",
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="break-inside-avoid-page">
        <Header />
      </div> */}

      <div className="flex flex-col gap-4 mx-6">
        <div className="break-inside-avoid-page">
          <VehicleStatusGrid />
        </div>

        <div className="break-inside-avoid-page">
          <VehicleDataComparison />
        </div>

        {/* <div className="break-inside-avoid-page"> 
          <DebtsSummary />
        </div>

        <div className="break-inside-avoid-page">
          <EvaluationDetails />
        </div>

        <div className="break-inside-avoid-page">
          <VehicleDataComparison />
        </div>  */}

        <div className="break-inside-avoid-page">
          <div className="mb-6">
            <IconDescription />
          </div>

          <GridContainer columns={2} border={false} shadow={false}>
            {cars.slice(0, 4).map((car, index) => (
              <ItemCard
                customHeight="164px"
                key={index}
                imageUrl={car.imageUrl}
              />
            ))}
          </GridContainer>
        </div>

        <div className="break-inside-avoid-page">
          <GridPageWrapper
            itemsPerPage={12}
            title="Itens Analisados"
            columns={1}
            border={false}
          >
            {ratings.map(({ id, description, title }) => (
              <RatingItem key={id} title={title} description={description} />
            ))}
          </GridPageWrapper>
        </div>

        <div className="break-inside-avoid-page">
          <GridPageWrapper
            itemsPerPage={6}
            title="Avaliação dos itens"
            columns={2}
            border={false}
          >
            {cars.slice(4, cars.length - 1).map((car, index) => (
              <ItemCard
                customHeight="155px"
                key={index + 4}
                title={car.title}
                imageUrl={car.imageUrl}
                status={car.status}
                carStatus={true}
              />
            ))}
          </GridPageWrapper>
        </div>

        <div className="break-inside-avoid-page w-5/6 self-center">
          <GridContainer
            title="Observaão"
            columns={1}
            bgColor="primary"
            footer={true}
          >
            <p className="w-full">
              O veículo possui reparos que não afetam sua estrutura, pneus
              traseiros desgastados, luz de injeção acesa, avaria no para-choque
              traseiro que não afeta a estrutura.
            </p>
          </GridContainer>

          <div className="break-inside-avoid-page mt-6">
            <GridContainer
              title="Informações Importantes"
              columns={1}
              bgColor="secondary"
              footer={true}
            >
              <p className="w-full">
                critérios próprios de avaliação do risco para aceitação ou não
                de veículos. Não obstante, o critério de avaliação bem como o
                resultado final da vistoria, independete da aceitação ou não da
                seguradora. Importante notar que NÃO são examinados itens de
                mecânica, elétrica, transmissão, suspensão e freios. A análise
                de pintura é realizada através de medidores digitais que
                informam a espessura da camada de tinta, apenas em caráter
                informativo de retoques ou reparos expressivos em sua lataria,
                que não afetam a estrutura do veículo, NÃO apontamos pequenos
                riscos nem desgastes na pintura.
              </p>
            </GridContainer>
          </div>
        </div>

        <div className="break-inside-avoid-page w-5/6 self-center">
          <GridContainer title="" columns={1} border={false}>
            <ContactInfo></ContactInfo>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}

export default App;
