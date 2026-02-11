import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import type { TopBranch } from "@/services/types/analytics";

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

interface TopBranchesChartProps {
  data: TopBranch[];
}

export const TopBranchesChart = ({ data }: TopBranchesChartProps) => {
  const maxCount = Math.max(...data.map(d => d.memberCount), 10);

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
          <XAxis type="number" hide domain={[0, maxCount + 10]} />
          <YAxis
            type="category"
            dataKey="branchName"
            tick={{ fontSize: 14, fill: "#3E3E3E" }}
            axisLine={false}
            tickLine={false}
            width={120}
            className="font-montserrat"
          />
          <Bar dataKey="memberCount" radius={[0, 4, 4, 0]} barSize={14}>
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill="#00B686" />
            ))}
            <LabelList dataKey="memberCount" content={CustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
