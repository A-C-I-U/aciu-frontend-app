import { useMediaQuery } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", dues: 40000, projects: 20000, events: 10000 },
  { month: "Feb", dues: 30000, projects: 25000, events: 15000 },
  { month: "Mar", dues: 50000, projects: 30000, events: 20000 },
  { month: "Apr", dues: 20000, projects: 15000, events: 5000 },
  { month: "May", dues: 45000, projects: 25000, events: 15000 },
  { month: "Jun", dues: 35000, projects: 20000, events: 10000 },
  { month: "Jul", dues: 60000, projects: 30000, events: 20000 },
  { month: "Aug", dues: 55000, projects: 25000, events: 15000 },
  { month: "Sep", dues: 70000, projects: 40000, events: 30000 },
  { month: "Oct", dues: 50000, projects: 30000, events: 20000 },
  { month: "Nov", dues: 40000, projects: 25000, events: 15000 },
  { month: "Dec", dues: 45000, projects: 30000, events: 20000 },
];

export default function TransactionsChart() {
  const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <div style={{ minWidth: "100%", overflowX: "auto" }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: isMobile ? 10 : 30, left: isMobile ? 0 : 20, bottom: 5 }} barSize={isMobile ? 12 : 30} barCategoryGap={isMobile ? 100 : 12}>
          <XAxis 
              dataKey="month" 
              tick={{ 
                  fill: "#727A8B", 
                  fontSize: 14, 
                  fontFamily: "'Montserrat', sans-serif",
                  dy: 15,
              }} 
              tickLine={false}
              axisLine={false}
          />
          <YAxis 
              tickFormatter={(value) => `${value / 1000}k`} 
              tick={{ 
                  fill: "#727A8B", 
                  fontSize: 14, 
                  fontFamily: "'Montserrat', sans-serif",
                  dx: -15,
              }} 
              tickLine={false}
              axisLine={false}
          />
          <Tooltip 
              cursor={{ 
                  fill: "transparent"
              }} 
          />
          <Bar dataKey="dues" name="Dues" stackId="transactions" fill="#00B686" radius={[10, 10, 10, 10]} activeBar={false}/>
          <Bar dataKey="projects" name="Projects" stackId="transactions" fill="#B0E8D9" radius={[10, 10, 10, 10]} activeBar={false}/>
          <Bar dataKey="events" name="Events" stackId="transactions" fill="#D9F4ED" radius={[10, 10, 10, 10]} activeBar={false}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
