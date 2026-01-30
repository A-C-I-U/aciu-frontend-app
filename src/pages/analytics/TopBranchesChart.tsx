import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";

// Hardcoded data - will be replaced with API data later
const data = [
  { branch: "ACIU Atlanta", members: 192, color: "#00B686" },
  { branch: "ACIU Atlanta", members: 64, color: "#00B686" },
  { branch: "ACIU Atlanta", members: 44, color: "#00B686" },
  { branch: "ACIU Atlanta", members: 40, color: "#00B686" },
  { branch: "ACIU Atlanta", members: 36, color: "#00B686" },
];

const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text
      x={x + width + 10}
      y={y + height / 2}
      fill="#3E3E3E"
      fontSize="14"
      fontWeight="500"
      textAnchor="start"
      dominantBaseline="middle"
      className="font-montserrat"
    >
      {value}
    </text>
  );
};

export const TopBranchesChart = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 font-coolvetica mb-2">
          Top Branches
        </h3>
        <p className="text-sm text-gray-500">
          Branches with most registered members
        </p>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, left: 10, bottom: 10 }}
        >
          <XAxis type="number" hide domain={[0, 200]} />
          <YAxis
            type="category"
            dataKey="branch"
            tick={{ fontSize: 14, fill: "#3E3E3E" }}
            axisLine={false}
            tickLine={false}
            width={120}
            className="font-montserrat"
          />
          <Bar dataKey="members" radius={[0, 4, 4, 0]} barSize={14}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList dataKey="members" content={CustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
