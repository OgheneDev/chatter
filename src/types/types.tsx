export interface ChartData {
  date: string;
  value: number;
  displayDate: string;
}

export type TimeRange = 'Last 7 Days' | '1M' | 'ALL';

export interface StatCardProps {
  icon: React.ReactNode;
  count: number;
  label: string;
  iconColor: string;
  link: string;
}