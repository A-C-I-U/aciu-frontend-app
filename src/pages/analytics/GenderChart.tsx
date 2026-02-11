import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { GenderDistribution } from "@/services/types/analytics";

const COLORS = ['#00B686', '#EBC563', '#9ca3af'];

interface CustomLabelProps {
  cx: number;
  cy: number;
  total?: number;
}

const renderCustomLabel = ({ cx, cy, total = 0 }: CustomLabelProps) => {
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
        {total}
      </tspan>
    </text>
  );
};

interface GenderChartProps {
  data?: GenderDistribution;
}

export const GenderChart = ({ data }: GenderChartProps) => {
  const chartData = [
    { name: 'Male', value: data?.male || 0 },
    { name: 'Female', value: data?.female || 0 },
    { name: 'Unspecified', value: data?.unspecified || 0 },
  ];

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 font-coolvetica">Gender</h3>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={0}
              dataKey="value"
              label={(props) => renderCustomLabel({ ...props, total })}
              labelLine={false}
            >
              {chartData.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 mt-4 space-y-1">
        <div className="flex items-center justify-between border-b pb-2 mb-1 border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Category</span>
          <span className="text-sm font-semibold text-gray-700">Count</span>
        </div>
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              ></div>
              <span className="text-sm text-gray-600 font-medium">{entry.name}</span>
            </div>
            <span className="text-sm font-bold text-gray-800">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};