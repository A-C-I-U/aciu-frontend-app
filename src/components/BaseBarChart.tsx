import { CustomTooltip } from "@/components/CustomTooltip";
import { useMediaQuery } from "@mui/material";
import { BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type BaseBarChartProps<T> = {
  data: T[];
  xKey: keyof T;
  yTickFormatter?: (value: number) => string;
  tooltipFormatter?: (value: number) => string;
  children: React.ReactNode;
};

export function BaseBarChart<T>({
  data,
  xKey,
  yTickFormatter,
  children,
}: BaseBarChartProps<T>) {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <ResponsiveContainer
      width="100%"
      height={400}
      className="focus-visible:outline-0 focus:outline-0 cursor-pointer overflow-hidden"
    >
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: isMobile ? 10 : 30,
          left: isMobile ? 0 : 20,
          bottom: 5,
        }}
        barSize={isMobile ? 12 : 30}
        barCategoryGap={isMobile ? 10 : 5}
      >
        <CartesianGrid strokeDasharray="3 8" vertical={false} />

        <XAxis
          dataKey={xKey as string}
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
          tickFormatter={yTickFormatter}
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
          content={<CustomTooltip chartType="bar"/>}
        />

        {children}
      </BarChart>
    </ResponsiveContainer>
  );
}
