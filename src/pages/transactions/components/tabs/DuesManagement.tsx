import { useDuesStatusVisuals } from "@/services/hooks/transactions"
import { Divider } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";
import NationalDuesTable from "../tables/NationalDuesTable";
import { BaseBarChart } from "@/components/BaseBarChart";
import { Bar } from "recharts";
import { LegendItem } from "@/components/ChartLegendItem";
import TableChartSkeleton from "../skeletons/TableChartSkeleton";
import { useNationalDues } from "@/services/hooks/dues";

export default function DuesManagement() {
    const { data: nationalDuesVisual, isLoading: isVisualLoading } = useDuesStatusVisuals(2026);
    const { data: nationalDues, isLoading: isRequestsLoading } = useNationalDues();

    if (isVisualLoading || isRequestsLoading) return <TableChartSkeleton />;

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="bg-white rounded-lg flex flex-col gap-6 min-w-0">
                <div className="flex flex-col pt-5.5 lg:flex-row gap-6.75 lg:gap-7 justify-between lg:items-center px-4 lg:px-8">
                    <div className="flex items-center gap-6">
                        <LegendItem color="#00B686" label="Paid" weight={600}/>
                        <LegendItem color="#B0E8D9" label="Overdue" weight={600} />
                    </div>
                    <div className="hidden lg:flex gap-2 items-center">
                        <button className="section-action-button admin !rounded-sm">
                            2022
                            <ArrowDown2 color="#3E3E3E" size={14} />
                        </button>
                        <button className="section-action-button admin !rounded-sm">
                            Monthly
                            <ArrowDown2 color="#3E3E3E" size={14} />
                        </button>
                    </div>
                </div>
                <Divider sx={{ borderColor: "#EEECF6" }}/>
                <div className="flex lg:hidden gap-2 items-center px-4 lg:px-8">
                    <button className="section-action-button admin !rounded-sm">
                        2022
                        <ArrowDown2 color="#3E3E3E" size={14} />
                    </button>
                    <button className="section-action-button admin !rounded-sm">
                        Monthly
                        <ArrowDown2 color="#3E3E3E" size={14} />
                    </button>
                </div>
                
                <div className="px-4 lg:px-8 max-w-full"> 
                    <div className="overflow-x-auto"> 
                        <div className="min-w-125 md:min-w-0 mb-4"> 
                            <BaseBarChart
                                data={nationalDuesVisual?.monthlyData ?? []}
                                xKey="month"
                                yTickFormatter={(v) => `${(v / 1_000_000).toFixed(1)}M`}
                                tooltipFormatter={(v) => `${(v / 1_000_000).toFixed(2)}M`}
                            >
                                <Bar
                                    dataKey="paid"
                                    name="Paid"
                                    stackId="nationalDues"
                                    fill="#00B686"
                                    radius={[0, 0, 0, 0]}
                                />
                                <Bar
                                    dataKey="overdue"
                                    name="Overdue"
                                    stackId="nationalDues"
                                    fill="#B0E8D9"
                                    radius={[10, 10, 0, 0]}
                                />
                            </BaseBarChart>
                        </div> 
                    </div> 
                </div>
            </div>

            <div className="bg-white py-6 px-4">
                <NationalDuesTable
                    data={nationalDues ?? []}
                />
            </div>
        </div>
    )
}