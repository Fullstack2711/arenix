import Image from "next/image";
import Section from "./components/Section";
import DashboardSection from "./components/dashboardSection";
import Sidebar from "./components/Sidebar";
import GamePromoCard from "./components/GamePromoCard ";
import Chart from "./components/Chart";

export default function Home() {
  return (
    <div className="bg-gray-900">
       
      <div className="display flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-16">
          <Section />
        </div>
        <div>
        <DashboardSection />

        </div>
        <GamePromoCard />
      </div>
      <div>
        <Chart  />
      </div>
    </div>
  );
}
