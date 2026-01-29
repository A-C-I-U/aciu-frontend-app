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

// Hardcoded data - will be replaced with API data later
const data = [
  { day: "Day 1", totalSignUps: 15, pendingVerification: 70 },
  { day: "Day 2", totalSignUps: 28, pendingVerification: 68 },
  { day: "Day 3", totalSignUps: 45, pendingVerification: 65 },
  { day: "Day 4", totalSignUps: 52, pendingVerification: 58 },
  { day: "Day 5", totalSignUps: 60, pendingVerification: 52 },
  { day: "Day 6", totalSignUps: 55, pendingVerification: 48 },
  { day: "Day 7", totalSignUps: 50, pendingVerification: 45 },
  { day: "Day 8", totalSignUps: 85, pendingVerification: 35 },
  { day: "Day 9", totalSignUps: 75, pendingVerification: 28 },
  { day: "Day 10", totalSignUps: 35, pendingVerification: 25 },
  { day: "Day 11", totalSignUps: 28, pendingVerification: 35 },
  { day: "Day 12", totalSignUps: 45, pendingVerification: 52 },
  { day: "Day 13", totalSignUps: 71, pendingVerification: 71 },
  { day: "Day 14", totalSignUps: 65, pendingVerification: 65 },
];

export const MemberSignUpsChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
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

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
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
              dataKey="day"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              stroke="#e5e7eb"
              axisLine={false}
              tickLine={false}
              hide
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
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">Last 14 days</span>
        <div className="flex items-center gap-1 text-[#00B686]">
          <span className="text-xs">▲</span>
          <span className="text-sm font-semibold">+12.5%</span>
        </div>
      </div>
    </div>
  );
};
