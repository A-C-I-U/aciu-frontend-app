interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    name: string;
    color?: string;
    fill?: string;
    dataKey?: string;
    payload?: any;
  }>;
  label?: string | number;
  chartType?: "bar" | "area"
}


export const CustomTooltip = ({ 
    active, 
    payload, 
    label,
    chartType
}: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  switch (chartType) {
    case "bar":
      return (
        <div className="bg-white shadow-[0px_10px_10px_0px_#2F22701A] rounded-lg border border-aciu-dashboard-background py-3.75 px-4.25 min-w-40.5">
          <ul className="flex flex-col gap-2.25">
            {payload.map((entry, index) => (
              <li
                key={index}
                className="flex gap-2 items-center text-sm text-aciu-border-grey leading-[140%]"
              >
                <span
                  className="w-3 h-3 inline-block rounded-xs"
                  style={{ backgroundColor: entry.color }}
                />
                <span>
                  ₦{entry.value.toLocaleString()} {entry.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      );

    case "area":
      return (
        <div className="bg-aciu-border-grey shadow-[0px_10px_10px_0px_#2F22701A] rounded-lg py-4 px-3 flex flex-col gap-4.25">
          <p className="font-medium leading-[140%] text-sm text-white">
            {label}
          </p>
          <ul className="flex flex-col gap-4.25">
            {payload.map((entry, index) => (
              <li
                key={index}
                className="flex flex-col gap-2 leading-[140%] text-sm text-aciu-abriba"
              >
                <span>{entry.name}</span>
                <span>N{entry.value.toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    default:
      return (
        <div className="bg-white shadow-md rounded-md p-3 font-montserrat lg:min-w-50 flex flex-col gap-2">
          <p className="font-bold text-gray-700 text-base">{label}</p>
          <ul>
            {payload.map((entry, index) => (
              <li
                key={index}
                className="flex justify-between gap-3 text-sm"
              >
                <span className="text-gray-500">{entry.name}</span>
                <span className="font-semibold text-aciu-green-normal">
                  {(entry.value / 1_000_000).toFixed(2)}M
                </span>
              </li>
            ))}
          </ul>
        </div>
      );
  }

};
