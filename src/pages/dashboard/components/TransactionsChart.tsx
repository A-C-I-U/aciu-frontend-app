import { BaseBarChart } from "@/components/BaseBarChart";
import type { MonthlyTransaction } from "@/services/types/dashboad";
import { Bar } from "recharts";

export default function TransactionsChart({
  monthlyTransactions,
}: {
  monthlyTransactions: MonthlyTransaction[];
}) {
  return (
    <BaseBarChart
      data={monthlyTransactions}
      xKey="month"
      yTickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
      tooltipFormatter={(v) => `${(v / 1_000_000).toFixed(2)}M`}
    >
      <Bar
        dataKey="dues"
        name="Dues"
        stackId="transactions"
        fill="#00B686"
        radius={[0, 0, 0, 0]}
      />
      <Bar
        dataKey="projects"
        name="Projects"
        stackId="transactions"
        fill="#B0E8D9"
        radius={[0, 0, 0, 0]}
      />
      <Bar
        dataKey="events"
        name="Events"
        stackId="transactions"
        fill="#D9F4ED"
        radius={[10, 10, 0, 0]}
      />
    </BaseBarChart>
  );
}
