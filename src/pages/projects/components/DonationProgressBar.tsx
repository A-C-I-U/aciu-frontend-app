import type { DonationProgressBarProps } from "@/utils/types";
import { LinearProgress } from "@mui/material";

export default function DonationProgressBar({ 
  collected, 
  target 
}: DonationProgressBarProps) {
  
  const floatingPercentage = (collected / target) * 100;
  const percentage = Math.round(floatingPercentage)

  const formatCurrency = (amount: number) => {
    const formatNumber = (num: number) => {
      const formatted = (num % 1 === 0) ? num.toFixed(0) : num.toFixed(1);
        return formatted.replace(/\.0$/, '');
      };

    if (amount >= 1_000_000) {
      return `${formatNumber(amount / 1_000_000)}million`;
    } else if (amount >= 1_000) {
      return `${formatNumber(amount / 1_000)} thousand`;
    } else {
      return `${amount}`;
    }
  };


  return (
      <div className="flex flex-col gap-1.5 w-full">
        <div className="relative w-full">
          <LinearProgress
            variant="determinate"
            value={Math.min(percentage, 100)}
            sx={{
              width: "100%",
              height: ".625rem",
              backgroundColor: "#E6F8F3",
              borderRadius: ".625rem",
              border: ".7px solid #B0E8D9",
              transition: "all 0.4s ease-in-out",
              "& .MuiLinearProgress-bar": {
                borderRadius: ".625rem",
                backgroundColor: "#00B686",
              },
            }}
          />
          <span
            className={`absolute -top-3 lg:-top-4 transform -translate-1/2 bg-aciu-green-normal text-white text-xs px-2 py-0.5 rounded transition-all duration-300`}
            style={{ left: `${Math.min(Math.max(percentage, 5), 95)}%` }}
          >
            {Math.min(percentage, 100)}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-xs text-aciu-border-grey font-semibold">
            {formatCurrency(collected)}
          </p>
          <p className="text-xs text-aciu-border-grey font-semibold">
            {formatCurrency(target)}
          </p>
        </div>
      </div>
  );
}
