import { Box, LinearProgress, Tooltip, Typography } from "@mui/material";

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
    <Box display="flex" flexDirection="column" gap="6px" width="100%">

      <Tooltip title={`${percentage.toFixed(2)}%`} placement="top">
        <LinearProgress
          variant="determinate"
          value={percentage}
          sx={{
            width: '100%',
            height: ".625rem",
            backgroundColor: "#E6F8F3",
            borderRadius: ".625rem",
            transition: 'all 0.4s ease-in-out',
            '& .MuiLinearProgress-bar': {
              border: ".7px solid #B0E8D9",
              borderRadius: ".625rem",
              backgroundColor: "#00B686",
            }
          }}
        />
      </Tooltip>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '.75rem',
            color: '#3E3E3E',
            fontWeight: 600,
          }}
        >
          {formatCurrency(collected)}
        </Typography>

        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '.75rem',
            color: '#3E3E3E',
            fontWeight: 600,
          }}
        >
          {formatCurrency(target)}
        </Typography>
      </Box>
    </Box>
  );
}
