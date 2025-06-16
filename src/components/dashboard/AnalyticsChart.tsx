"use client"

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { CirclePlus, CircleMinus, ZoomIn, Hand, Home, Menu, Download, FileImage, FileText } from 'lucide-react';
import { ChartData } from '@/types/types';
import { TimeRange } from '@/types/types';

interface ChartProps {
  title: string;
  totalValue: number;
  valueLabel: string;
  data: ChartData[];
  color: string;
  maxValue: number;
}

const generateYAxisTicks = (maxValue: number) => {
  const ticks = [];
  const step = maxValue <= 2 ? 0.5 : Math.ceil(maxValue / 6);
  
  for (let i = 0; i <= maxValue; i += step) {
    ticks.push(i);
  }
  
  if (ticks[ticks.length - 1] < maxValue) {
    ticks.push(maxValue);
  }
  
  return ticks;
};

export const AnalyticsChart: React.FC<ChartProps> = ({ 
  title, 
  totalValue, 
  valueLabel, 
  data, 
  color, 
  maxValue 
}) => {
  const [activeTimeRange, setActiveTimeRange] = useState<TimeRange>('Last 7 Days');
  const [showMenu, setShowMenu] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panMode, setPanMode] = useState(false);

  const handleDownload = (format: 'svg' | 'png' | 'csv') => {
    console.log(`Downloading ${title} as ${format}`);
    setShowMenu(false);
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPanMode(false);
  }; 

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <div className="flex items-center mt-1">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: color }}
            />
            <p className="text-sm text-gray-600">
              {valueLabel}: <span className="font-semibold">{payload[0].value}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-sm border border-gray-900 p-4">
      {/* Mobile Header Layout */}
      <div className="mb-4">
        {/* Title and Value */}
        <div className="flex items-baseline gap-2 mb-3">
          <h3 className="text-sm font-medium text-gray-200">{title}</h3>
          <span className="text-lg font-bold" style={{ color }}>{totalValue}</span>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex justify-end mb-3">
          <div className="flex gap-1">
            {(['Last 7 Days', '1M', 'ALL'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setActiveTimeRange(range)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all duration-200 ${
                  activeTimeRange === range
                    ? 'bg-yellow-500 text-white shadow-sm'
                    : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        {/* Chart Controls */}
        <div className="flex items-center justify-end space-x-2">
          <div className="relative group">
            <button 
              onClick={() => setZoomLevel(prev => Math.min(prev * 1.2, 3))}
              className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer hover:bg-gray-50 rounded transition-colors"
              title="Zoom In"
            >
              <CirclePlus size={16} />
            </button>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => setZoomLevel(prev => Math.max(prev / 1.2, 0.5))}
              className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer hover:bg-gray-50 rounded transition-colors"
              title="Zoom Out"
            >
              <CircleMinus size={16} />
            </button>
          </div>
          
          <div className="relative group">
            <button 
              className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer hover:bg-gray-50 rounded transition-colors"
              title="Selection Zoom"
            >
              <ZoomIn size={16} />
            </button>
          </div>
          
          <div className="relative group">
            <button 
              onClick={() => setPanMode(!panMode)}
              className={`p-1 transition-colors rounded ${
                panMode 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-400 hover:text-gray-900 cursor-pointer hover:bg-gray-50'
              }`}
              title="Pan Mode"
            >
              <Hand size={16} />
            </button>
          </div>
          
          <div className="relative group">
            <button 
              onClick={resetZoom}
              className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer hover:bg-gray-50 rounded transition-colors"
              title="Reset Zoom"
            >
              <Home size={16} />
            </button>
          </div>
          
          <div className="relative">
            <div className="relative group">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 text-gray-400 hover:text-gray-900 cursor-pointer hover:bg-gray-50 rounded transition-colors"
                title="Menu"
              >
                <Menu size={16} />
              </button>
            </div>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[120px]">
                <button
                  onClick={() => handleDownload('svg')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-t-lg"
                >
                  <Download size={16} className="mr-2" />
                  SVG
                </button>
                <button
                  onClick={() => handleDownload('png')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <FileImage size={16} className="mr-2" />
                  PNG
                </button>
                <button
                  onClick={() => handleDownload('csv')}
                  className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-b-lg"
                >
                  <FileText size={16} className="mr-2" />
                  CSV
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-54 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data.slice(-7)}
            margin={{ top: 5, right: 10, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid 
              stroke="#E5E7EB" 
              vertical={true}
              strokeWidth={0.5}
            />
            <XAxis 
              dataKey="displayDate" 
              tick={{ fontSize: 10, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              interval={0}
            />
            <YAxis 
              tick={{ fontSize: 10, fill: '#6B7280' }}
              tickLine={false}
              axisLine={false}
              domain={[0, maxValue]}
              ticks={generateYAxisTicks(maxValue)}
              allowDataOverflow={true}
              width={40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="linear"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#gradient-${color})`}
              dot={true}
              activeDot={{ r: 4, fill: color, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};