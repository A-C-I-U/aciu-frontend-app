import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { DeviceUsage } from "@/services/types/analytics";
import { ChartEmptyState } from "@/components/ChartEmptyState";

const COLORS = ["#00B686", "#EBC563", "#60C5F1"];

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

interface DeviceChartProps {
  data?: DeviceUsage;
}

export const DevicesChart = ({ data }: DeviceChartProps) => {
  const chartData = [
    { name: "Mobile", value: data?.mobile || 0 },
    { name: "Desktop", value: data?.desktop || 0 },
    { name: "Tablet", value: data?.tablet || 0 },
  ];

  const total = chartData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 font-coolvetica">
          Devices
        </h3>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {total === 0 ? (
          <ChartEmptyState height={280} description="No device usage metrics available yet." />
        ) : (
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
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {chartData.map((entry, index) => (
          <div
            key={`legend-${index}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
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
        <span className="text-xs text-gray-500">All Time</span>
      </div>
    </div>
  );
};
