import { ChartData } from "@/types/types";
import { AnalyticsChart } from "./AnalyticsChart";

const ChartsGrid: React.FC = () => {
  // Sample data for Posts
  const postsData: ChartData[] = [
    { date: '2024-04-26', value: 3, displayDate: '26 Apr' },
    { date: '2024-04-29', value: 10, displayDate: '29 Apr' },
    { date: '2024-05-02', value: 1, displayDate: '02 May' },
    { date: '2024-05-05', value: 4, displayDate: '05 May' },
    { date: '2024-05-08', value: 3, displayDate: '08 May' },
    { date: '2024-05-11', value: 7, displayDate: '11 May' },
    { date: '2024-05-14', value: 30, displayDate: '14 May' },
    { date: '2024-05-17', value: 12, displayDate: '17 May' },
    { date: '2024-05-20', value: 27, displayDate: '20 May' },
  ];

  // Sample data for Users (mostly flat with one spike)
  const usersData: ChartData[] = [
    { date: '2024-05-12', value: 0, displayDate: '12 May' },
    { date: '2024-05-16', value: 0, displayDate: '16 May' },
    { date: '2024-05-20', value: 0, displayDate: '20 May' },
    { date: '2024-05-24', value: 0, displayDate: '24 May' },
    { date: '2024-05-25', value: 0, displayDate: '25 May' },
    { date: '2024-05-28', value: 0, displayDate: '28 May' },
    { date: '2024-06-01', value: 0, displayDate: '01 Jun' },
    { date: '2024-06-05', value: 0, displayDate: '05 Jun' },
  ];

  // Sample data for Reels
  const reelsData: ChartData[] = [
    { date: '2024-04-26', value: 1, displayDate: '26 Apr' },
    { date: '2024-04-29', value: 2, displayDate: '29 Apr' },
    { date: '2024-05-02', value: 1, displayDate: '02 May' },
    { date: '2024-05-05', value: 3, displayDate: '05 May' },
    { date: '2024-05-08', value: 2, displayDate: '08 May' },
    { date: '2024-05-11', value: 1, displayDate: '11 May' },
    { date: '2024-05-14', value: 4, displayDate: '14 May' },
    { date: '2024-05-17', value: 1, displayDate: '17 May' },
  ];

  // Sample data for Rooms
  const roomsData: ChartData[] = [
    { date: '2024-04-26', value: 0, displayDate: '26 Apr' },
    { date: '2024-04-29', value: 1, displayDate: '29 Apr' },
    { date: '2024-05-02', value: 0, displayDate: '02 May' },
    { date: '2024-05-05', value: 1, displayDate: '05 May' },
    { date: '2024-05-08', value: 0, displayDate: '08 May' },
    { date: '2024-05-11', value: 0, displayDate: '11 May' },
    { date: '2024-05-14', value: 1, displayDate: '14 May' },
    { date: '2024-05-17', value: 0, displayDate: '17 May' },
  ];

  return (
    <div className="min-h-screen mb-7">
      <div className="max-w-7xl md:max-w-6xl mx-auto"> {/* Reduced from 7xl to 6xl */}
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> {/* Reduced gap from 6 to 4 */}
          <AnalyticsChart 
            title="Total Number of Posts"
            totalValue={219}
            valueLabel="Posts"
            data={postsData}
            color="#eab308"
            maxValue={35}
          />
          
          <AnalyticsChart
            title="Total Number of Users"
            totalValue={11}
            valueLabel="User Count"
            data={usersData}
            color="#eab308"
            maxValue={2}
          />
          
          <AnalyticsChart
            title="Total Number of Reels"
            totalValue={15}
            valueLabel="Reels"
            data={reelsData}
            color="#eab308"
            maxValue={5}
          />
          
          <AnalyticsChart
            title="Total Number of Rooms"
            totalValue={3}
            valueLabel="Rooms"
            data={roomsData}
            color="#eab308"
            maxValue={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartsGrid;