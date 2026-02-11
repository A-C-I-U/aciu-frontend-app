import { Chart } from "iconsax-react";

type ChartEmptyStateProps = {
    title?: string;
    description?: string;
    height?: number | string;
};

export const ChartEmptyState = ({
    title = "No data available",
    description = "There is currently no data to display for this period.",
    height = 300
}: ChartEmptyStateProps) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full"
            style={{ height: height }}
        >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                <Chart size={32} color="#9ca3af" variant="Bulk" />
            </div>
            <h4 className="text-gray-800 font-semibold text-lg mb-1">{title}</h4>
            <p className="text-gray-500 text-sm max-w-[250px] text-center px-4">
                {description}
            </p>
        </div>
    );
};
