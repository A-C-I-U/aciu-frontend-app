import { CustomTooltip } from "@/components/CustomTooltip";
import type { MonthlyTransaction } from "@/services/types/dashboad";
import { useMediaQuery } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function TransactionsChart({
  monthlyTransactions
}: { monthlyTransactions: MonthlyTransaction[] }
) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
      <ResponsiveContainer 
        width="100%" 
        height={400} 
        className="focus-visible:outline-0 focus:outline-0 cursor-pointer overflow-hidden" 
        aria-label="Monthly transactions bar chart"
      >
        <BarChart 
          data={monthlyTransactions} 
          margin={{ 
            top: 20, 
            right: isMobile ? 10 : 30, 
            left: isMobile ? 0 : 20, 
            bottom: 5 
          }}
          barSize={isMobile ? 12 : 30} 
          barCategoryGap={isMobile ? 10 : 5}
        >
          <CartesianGrid strokeDasharray="3 8" vertical={false} />
          <XAxis 
              dataKey="month" 
              tick={{ 
                  fill: "#727A8B", 
                  fontSize: isMobile ? 12 : 14, 
                  fontFamily: "'Montserrat', sans-serif",
                  dy: 10,
              }} 
              tickLine={false}
              axisLine={false}
              
          />
          <YAxis 
              tickFormatter={(value) => `${(value / 1_000_000).toFixed(1)}M`} 
              tick={{ 
                  fill: "#727A8B", 
                  fontSize: isMobile ? 12 : 14, 
                  fontFamily: "'Montserrat', sans-serif",
                  dx: isMobile ? 0 : -15,
              }} 
              tickLine={false}
              axisLine={false}
          />
          <Tooltip 
            formatter={(value) => `${(Number(value) / 1_000_000).toFixed(2)}M`} 
            cursor={{ fill: "transparent" }} 
            content={<CustomTooltip />}
          />
          <Bar 
            dataKey="dues" 
            name="Dues" 
            stackId="transactions" 
            fill="#00B686" 
            radius={[0, 0, 0, 0]} 
            activeBar={false}
            isAnimationActive={true}
          />
          <Bar 
            dataKey="projects" 
            name="Projects" 
            stackId="transactions" 
            fill="#B0E8D9" 
            radius={[0, 0, 0, 0]} 
            activeBar={false}
            isAnimationActive={true}
          />
          <Bar 
            dataKey="events" 
            name="Events" 
            stackId="transactions" 
            fill="#D9F4ED" 
            radius={[10, 10, 0, 0]} 
            activeBar={false}
            isAnimationActive={true}
          />
        </BarChart>
    </ResponsiveContainer>
  );
}
