import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import type { MemberSignupTrend } from "@/services/types/analytics";
import { ChartEmptyState } from "@/components/ChartEmptyState";

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
      <div className="bg-white shadow-md rounded-md p-3 font-montserrat min-w-[150px] flex flex-col gap-2 border border-gray-200">
        <p className="font-semibold text-gray-700 text-sm">{label}</p>
        <ul className="flex flex-col gap-1">
          {payload.map((entry, index) => (
            <li
              key={`item-${index}`}
              className="flex justify-between gap-3 text-sm"
            >
              <span className="text-gray-500">{entry.name}</span>
              <span className="font-semibold" style={{ color: entry.color }}>
                {entry.value}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};

interface MemberSignUpsChartProps {
  data: MemberSignupTrend[];
  percentageChange?: number;
}

export const MemberSignUpsChart = ({ data, percentageChange }: MemberSignUpsChartProps) => {
  const isDataEmpty = !data || data.length === 0 || data.every(item => item.totalSignUps === 0 && item.pendingVerification === 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col min-h-[300px]">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 font-coolvetica">
          Member Sign Ups
        </h3>
      </div>

      <div className="flex items-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#00B686]"></div>
          <span className="text-sm text-gray-600">Total Sign Ups</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#EBC563]"></div>
          <span className="text-sm text-gray-600">Pending Verification</span>
        </div>
      </div>

      <div className="flex-1 min-h-[250px]">
        {isDataEmpty ? (
          <ChartEmptyState height={300} description="We couldn't find any member signup history for this period." />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart
              data={data}
              margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
            >
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00B686" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#00B686" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                stroke="#e5e7eb"
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                stroke="#e5e7eb"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="totalSignUps"
                fill="url(#greenGradient)"
                stroke="none"
                name="Total Sign Ups"
              />
              <Line
                type="monotone"
                dataKey="totalSignUps"
                stroke="#00B686"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#00B686" }}
                name="Total Sign Ups"
              />
              <Line
                type="monotone"
                dataKey="pendingVerification"
                stroke="#EBC563"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6, fill: "#EBC563" }}
                name="Pending Verification"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">Last 14 days</span>
        <div className={`flex items-center gap-1 ${percentageChange && percentageChange >= 0 ? 'text-[#00B686]' : 'text-red-500'}`}>
          <span className="text-xs">{percentageChange && percentageChange >= 0 ? '▲' : '▼'}</span>
          <span className="text-sm font-semibold">{percentageChange ? `${percentageChange >= 0 ? '+' : ''}${percentageChange}%` : '0%'}</span>
        </div>
      </div>
    </div>
  );
};
