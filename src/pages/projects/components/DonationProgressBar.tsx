import { LinearProgress, Tooltip } from "@mui/material";

interface DonationProgressBarProps {
  collected: number;
  target: number;
}


export default function DonationProgressBar({ collected, target }: DonationProgressBarProps) {
  const percentage = (collected / target) * 100;

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
        <Tooltip title={`${percentage.toFixed(2)}%`} placement="top">
          <LinearProgress
            variant="determinate"
            value={percentage}
            sx={{
              width: "100%",
              height: ".625rem",
              backgroundColor: "#E6F8F3",
              borderRadius: ".625rem",
              transition: "all 0.4s ease-in-out",
              "& .MuiLinearProgress-bar": {
                border: ".7px solid #B0E8D9",
                borderRadius: ".625rem",
                backgroundColor: "#00B686",
              },
            }}
          />
        </Tooltip>

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
