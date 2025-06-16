import Link from 'next/link';
import { StatCardProps } from '@/types/types';

export const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  count, 
  label, 
  iconColor, 
  link 
}) => {
  return (
    <div className="group relative flex flex-col space-y-4 p-5 overflow-hidden">
      <div className="flex flex-row-reverse justify-between items-center ">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <div className="text-3xl font-bold text-white">
          {count}
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <div className="text-lg font-semibold text-white">
          {label}
        </div>
        <Link 
          href={link}
          className="text-yellow-500 hover:text-yellow-600 text-[17px]  font-medium"
        >
          View More
        </Link>
      </div>
    </div>
  );
};