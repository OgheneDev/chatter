import ChartsGrid from "@/components/dashboard/ChartsGrid";
import StatsGrid from "@/components/dashboard/StatsGrid";

export default function Home() {
  return (
    <div className="mt-10 mb-10 md:mb-0">
      <div>
        <ChartsGrid />
        <StatsGrid />
      </div>
    </div>
  );
}
