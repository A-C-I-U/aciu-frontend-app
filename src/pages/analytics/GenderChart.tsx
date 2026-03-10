import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import type { GenderDistribution } from "@/services/types/analytics";
import { ChartEmptyState } from "@/components/ChartEmptyState";

const COLORS = ["#00B686", "#EBC563", "#60C5F1"];

const GRADIENTS = [
  { id: 'grad-0', start: '#00B686', end: '#007D4D' },
  { id: 'grad-1', start: '#EBC563', end: '#B8923A' },
  { id: 'grad-2', start: '#9ca3af', end: '#6b7280' },
];

interface CustomLabelProps {
  cx: number;
  cy: number;
  total?: number;
}

const renderCustomLabel = ({ cx, cy, total }: CustomLabelProps) => (
  <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
    <tspan x={cx} dy="-0.5rem" fontSize="12" fill="#737373" fontFamily="Montserrat, sans-serif">Total</tspan>
    <tspan x={cx} dy="1.5rem" fontSize="24" fontWeight="500" fill="#434D64" fontFamily="Montserrat, sans-serif">
      {(total ?? 0) >= 1000 ? `${((total ?? 0) / 1000).toFixed(1)}k` : total}
    </tspan>
  </text>
);

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
        <h3 className="text-xl font-semibold text-aciu-border-grey">Gender</h3>
      </div>

      <div className="flex-1 flex items-center justify-center">
        {total === 0 ? (
          <ChartEmptyState height={280} description="No gender distribution data available." />
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <defs>
                <filter id="cellShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="-5.06" stdDeviation="10" floodColor="#000000" floodOpacity="0.12" />
                </filter>
                <filter id="labelShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.08" />
                </filter>
              </defs>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
                labelLine={false}
                label={(props) => renderCustomLabel({ ...props, total })}
              >
                {chartData.map((_entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    filter="url(#cellShadow)"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
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
                className="size-4 rounded-xs"
                style={{
                  background: `linear-gradient(180deg, ${GRADIENTS[index].start} 0%, ${GRADIENTS[index].end} 100%)`
                }}
              />
              <span className="text-sm text-aciu-abriba leading-[1.4]">{entry.name}</span>
            </div>
            <span className="text-sm text-aciu-abriba leading-[1.4]">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};