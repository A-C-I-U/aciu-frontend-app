import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import type { BlogTraffic } from "@/services/types/analytics";
import { ChartEmptyState } from "@/components/ChartEmptyState";
import { format } from 'date-fns';

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
      <div className="bg-white shadow-md rounded-md p-3 font-montserrat min-w-30 flex flex-col gap-2 border border-gray-200">
        <p className="font-semibold text-gray-700 text-sm">{label}</p>
        <div className="flex justify-between gap-3 text-sm">
          <span className="text-gray-500">Views</span>
          <span className="font-semibold text-[#00B686]">
            {payload[0]?.value.toLocaleString()}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

interface BlogTrafficChartProps {
  data?: BlogTraffic;
}

export const BlogTrafficChart = ({ data }: BlogTrafficChartProps) => {
  const chartData = data?.dailyViews || [];
  const isDataEmpty = chartData.length === 0 || chartData.every(item => item.views === 0);

  const formatDateRange = () => {
    if (chartData.length === 0) return "No data";
    const start = format(new Date(chartData[0].date), "MMM dd");
    const end = format(new Date(chartData[chartData.length - 1].date), "MMM dd");
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white rounded-lg pt-6 px-6 shadow-sm h-full">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className='flex flex-col gap-2.25'>
          <h3 className="text-xl font-bold text-aciu-border-grey">
            Blog Traffic
          </h3>
          <p className="text-xs text-aciu-abriba leading-[1.6]">Last 8 Days</p>
        </div>

        <div className="relative">
          <div className="bg-white border border-[#D0D3D8] rounded px-2.5 py-2 text-xs text-aciu-border-grey text-center leading-[1.6]">
            {formatDateRange()}
          </div>
        </div>
      </div>

      {isDataEmpty ? (
        <ChartEmptyState height={280} description="No blog traffic recorded for this period." />
      ) : (
      <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: 0, bottom: 20 }}
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
              tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              stroke="#e5e7eb"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.toLocaleString()}
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
      )}
    </div>
  );
};