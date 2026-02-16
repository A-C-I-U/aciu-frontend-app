import { Box, Typography } from "@mui/material";
import { Chart1 } from "iconsax-react";

interface ChartEmptyStateProps {
    height?: number | string;
    title?: string;
    description?: string;
}

export const ChartEmptyState = ({
    height = 300,
    title = "No Data Available",
    description = "There is currently no data to display for this period.",
}: ChartEmptyStateProps) => {
    return (
        <Box
            sx={{
                height: height,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F9FAFB",
                borderRadius: "0.5rem",
                width: "100%",
                gap: 2,
                p: 3,
                textAlign: "center",
            }}
        >
            <div className="bg-white p-4 rounded-full shadow-sm">
                <Chart1 size="32" color="#00B686" variant="Bulk" />
            </div>
            <Typography variant="h6" sx={{ fontWeight: 600, color: "#374151", fontSize: "1rem" }}>
                {title}
            </Typography>
            <Typography sx={{ color: "#6B7280", fontSize: "0.875rem", maxWidth: "250px" }}>
                {description}
            </Typography>
        </Box>
    );
};
