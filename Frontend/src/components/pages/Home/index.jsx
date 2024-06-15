import PortalLayout from "../../layout/portal";
import About from "./About";
import Products from "./Products";
import CarouselMitra from "./CarouselMitra";
import MainHero from "./MainHero";
import PTOverview from "./PTOverview";
import ServiceOffered from "./ServiceOffered";

export default function Home() {
  return (
    <PortalLayout>
      <main className="mb-10">
        <MainHero />
        <PTOverview />
        <Products />
        <CarouselMitra />
        <ServiceOffered />
        <About />
      </main>
    </PortalLayout>
  );
}
