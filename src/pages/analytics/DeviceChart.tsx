import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// Hardcoded data - will be replaced with API data later
const data = [
  { name: "Mobile", value: 3200 },
  { name: "Desktop", value: 892 },
  { name: "Tablet", value: 300 },
];

const COLORS = ["#00B686", "#EBC563", "#60C5F1"];

interface CustomLabelProps {
  cx: number;
  cy: number;
}

const renderCustomLabel = ({ cx, cy }: CustomLabelProps) => {
  return (
    <text
      x={cx}
      y={cy}
      fill="gray"
      textAnchor="middle"
      dominantBaseline="central"
      className="font-montserrat"
    >
      <tspan x={cx} dy="-0.5em" fontSize="12" fill="#9ca3af">
        Total
      </tspan>
      <tspan x={cx} dy="1.5em" fontSize="24" fontWeight="600" fill="#374151">
        5.2k
      </tspan>
    </text>
  );
};

export const DevicesChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 font-coolvetica">
          Devices
        </h3>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
              label={renderCustomLabel}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {data.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <span className="text-sm text-gray-600">{entry.name}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {entry.value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
        <span className="text-xs text-gray-500">Last 14 days</span>
        <div className="flex items-center gap-1 text-[#00B686]">
          <span className="text-xs">▲</span>
          <span className="text-sm font-semibold">+12.5%</span>
        </div>
      </div>
    </div>
  );
};
