import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Hardcoded data - will be replaced with API data later
const data = [
  { name: 'Female', value: 45000 },
  { name: 'Male', value: 30000 },
];

const COLORS = ['#00B686', '#EBC563'];

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
        75k
      </tspan>
    </text>
  );
};

export const GenderChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 font-coolvetica">Gender</h3>
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: COLORS[index] }}
            ></div>
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};