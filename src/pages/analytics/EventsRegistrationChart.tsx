import { useState } from 'react';
import { 
  ComposedChart,
  Area,
  Line, 
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
      <div className="bg-[#3E3E3E] shadow-lg rounded-md p-4 font-montserrat min-w-[120px] flex flex-col gap-2">
        <p className="font-semibold text-white text-sm">{label}</p>
        <div className="flex justify-between gap-4 text-sm">
          <span className="text-gray-300">RSVPs</span>
          <span className="font-semibold text-white">
            {payload[0]?.value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// Hardcoded data - will be replaced with API data later
const monthlyData2022 = [
  { month: 'Jan', rsvps: 42000 },
  { month: 'Feb', rsvps: 5000 },
  { month: 'Mar', rsvps: 38000 },
  { month: 'Apr', rsvps: 20000 },
  { month: 'May', rsvps: 32000 },
  { month: 'Jun', rsvps: 4000 },
  { month: 'Jul', rsvps: 38000 },
  { month: 'Aug', rsvps: 12000 },
  { month: 'Sep', rsvps: 28000 },
  { month: 'Oct', rsvps: 2000 },
  { month: 'Nov', rsvps: 24000 },
  { month: 'Dec', rsvps: 26000 },
];

const monthlyData2023 = [
  { month: 'Jan', rsvps: 35000 },
  { month: 'Feb', rsvps: 15000 },
  { month: 'Mar', rsvps: 42000 },
  { month: 'Apr', rsvps: 28000 },
  { month: 'May', rsvps: 38000 },
  { month: 'Jun', rsvps: 22000 },
  { month: 'Jul', rsvps: 45000 },
  { month: 'Aug', rsvps: 18000 },
  { month: 'Sep', rsvps: 32000 },
  { month: 'Oct', rsvps: 8000 },
  { month: 'Nov', rsvps: 28000 },
  { month: 'Dec', rsvps: 35000 },
];

export const EventsRegistrationsChart = () => {
  const [selectedYear, setSelectedYear] = useState('2022');
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

  const data = selectedYear === '2022' ? monthlyData2022 : monthlyData2023;

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      {/* Header with title and filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h3 className="text-xl font-semibold text-gray-800 font-coolvetica">
          Events Registrations
        </h3>
        
        <div className="flex items-center gap-3">
          {/* Year Dropdown */}
          <div className="relative">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-aciu-green-normal focus:border-transparent transition-all"
            >
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Period Dropdown */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm text-gray-700 font-medium cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-aciu-green-normal focus:border-transparent transition-all"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart 
          data={data} 
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="eventGreenGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00B686" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#00B686" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
            vertical={false}
            horizontal={true}
          />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 13, fill: '#9ca3af' }}
            stroke="#e5e7eb"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis 
            tick={{ fontSize: 13, fill: '#9ca3af' }}
            stroke="#e5e7eb"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000}k`}
            tickMargin={10}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#00B686', strokeWidth: 1, strokeDasharray: '5 5' }} />
          <Area
            type="monotone"
            dataKey="rsvps"
            fill="url(#eventGreenGradient)"
            stroke="none"
          />
          <Line 
            type="monotone" 
            dataKey="rsvps" 
            stroke="#00B686" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, fill: '#00B686', strokeWidth: 2, stroke: '#fff' }}
            name="RSVPs"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};