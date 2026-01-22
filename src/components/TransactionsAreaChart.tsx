import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { useMediaQuery } from "@mui/material";

export function TransactionsAreaChart({ data,name, dataKey }: { data: any[], name: string, dataKey: string }) {
    const isMobile = useMediaQuery("(max-width: 767px)");

    return (
        <ResponsiveContainer 
            width="100%" 
            height={400}
            className="focus-visible:outline-0 focus:outline-0 cursor-pointer overflow-hidden"
        >
            <AreaChart 
                data={data}
                margin={{
                    top: 20,
                    right: isMobile ? 10 : 30,
                    left: isMobile ? 0 : 20,
                    bottom: 5,
                }}>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EFFDE6" stopOpacity={0.9} />
                    <stop offset="80%" stopColor="#EFFDE6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#EFFDE6" stopOpacity={0.15} />
                </linearGradient>


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
                    tickFormatter={(value) => `${(Number(value) / 1_000_000).toFixed(2)}M`}
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

                <Area
                    name={name}
                    type="monotone"
                    dataKey={dataKey}
                    stroke="#00B686"
                    strokeWidth={2}
                    fill="url(#areaGradient)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
