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
}


export const CustomTooltip = ({ 
    active, 
    payload, 
    label 
}: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-md p-3 font-montserrat lg:min-w-50 flex flex-col gap-2">
        <p className="font-bold text-gray-700 text-base">{label}</p>
        <ul>
          {payload.map((entry, index) => (
            <li key={`item-${index}`} className="flex justify-between gap-3 text-sm">
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
  return null;
};
