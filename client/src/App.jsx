import { Header } from "./components/header";
import { VehicleStatusGrid } from "./components/vehicle-status-grid";
import { DebtsSummary } from "./components/debs-summary";
import { EvaluationDetails } from "./components/evaluation-details";
import { VehicleDataComparison } from "./components/vehicle-detail-comparison";
import ItemCard from "./components/ItemCard";
import GridContainer from "./components/GridContainer";

function App() {

  const cars = [
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Frente e lateral esquerda",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Traseira",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    },
    {
      title: "Lateral direita",
      imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZuliHMnUXk0EaxoqBCVZip7mq0VyU2.png",
      status: "Em perfeito estado"
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div className="break-inside-avoid-page">
        <Header />
      </div>

      <div className="flex flex-col gap-4">
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
          <GridContainer title="Galeria de Carros" columns={2}>
            {cars.slice(0, 6).map((car, index) => (
              <ItemCard
                key={index}
                title={car.title}
                imageUrl={car.imageUrl}
                status={car.status}
              />
            ))}
          </GridContainer>
        </div>
        <div className="break-inside-avoid-page">
          <GridContainer title="" columns={3}>
              {cars.slice(6).map((car, index) => (
                <ItemCard
                  key={index + 6}
                  title={car.title}
                  imageUrl={car.imageUrl}
                  status={car.status}
                />
              ))}
            </GridContainer>
        </div>
      </div>
      <h1 className="text-3xl font-bold underline">{`{name}`}</h1>
    </div>
  );
}

export default App;
