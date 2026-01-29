import { useState } from 'react';
import { 
  BarChart,
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color?: string;
    fill?: string;
    dataKey?: string;
    payload?: any;
  }>;
  label?: string | number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-md p-3 font-montserrat min-w-[120px] flex flex-col gap-2 border border-gray-200">
        <p className="font-semibold text-gray-700 text-sm">{label}</p>
        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Views</span>
          <span className="font-semibold text-[#00B686]">
            {payload[0]?.value}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Hardcoded data - will be replaced with API data later
const data = [
  { date: 'Feb 04', views: 20 },
  { date: 'Feb 05', views: 17 },
  { date: 'Feb 06', views: 19 },
  { date: 'Feb 07', views: 15 },
  { date: 'Feb 08', views: 18 },
  { date: 'Feb 09', views: 19 },
  { date: 'Feb 10', views: 19 },
  { date: 'Feb 11', views: 19 },
];

export const BlogTrafficChart = () => {
  const [dateRange] = useState('Feb 04 - Feb 11');

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 font-coolvetica mb-1">
            Blog Traffic
          </h3>
          <p className="text-sm text-gray-500">Last 8 Days</p>
        </div>
        
        {/* Date Range Display */}
        <div className="relative">
          <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 font-medium min-w-[140px] text-center">
            {dateRange}
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart 
          data={data} 
          margin={{ top: 20, right: 10, left: -20, bottom: 20 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false}
            horizontal={true}
          />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            stroke="#e5e7eb"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            angle={0}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            stroke="#e5e7eb"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            domain={[0, 25]}
            ticks={[0, 5, 10, 15, 20, 25]}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 182, 134, 0.1)' }} />
          <Bar 
            dataKey="views" 
            fill="#00B686"
            radius={[8, 8, 8, 8]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};