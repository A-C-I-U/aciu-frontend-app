import { TransactionsAreaChart } from "@/components/TransactionsAreaChart";
import { useEventDonations, useEventDonationsVisuals } from "@/services/hooks/transactions";
import { Divider } from "@mui/material";
import DonationsTable from "../tables/DonationsTable";
import TableChartSkeleton from "../skeletons/TableChartSkeleton";
import { useState } from "react";
import { CURRENT_YEAR, YEARS } from "@/utils/helpers";
import FilterMenu from "@/components/FilterMenu";

export default function EventDonations() {
    const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
    const { data: eventDonationsVisuals, isLoading: isVisualLoading } = useEventDonationsVisuals(selectedYear)
    const { data: eventDonations, isLoading: isRequestsLoading} = useEventDonations();

    if (isVisualLoading || isRequestsLoading) return <TableChartSkeleton />;

    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="bg-white rounded-lg flex flex-col gap-6 min-w-0">
                <div className="flex flex-col pt-5.5 lg:flex-row gap-6.75 lg:gap-7 justify-between lg:items-center px-4 lg:px-8">
                    <h3 className="text-xl leading-[120%] text-aciu-border-grey font-bold">
                        Event Donations
                    </h3>
                    <div className="hidden lg:flex gap-2 items-center">
                        <FilterMenu
                            value={selectedYear}
                            options={YEARS}
                            onChange={setSelectedYear}
                        />
                        {/* <FilterMenu
                            value={selectedPeriod}
                            options={['DAILY', 'MONTHLY', 'QUARTERLY', 'YEARLY']}
                            onChange={setSelectedPeriod}
                        /> */}
                    </div>
                </div>
                <Divider sx={{ borderColor: "#EEECF6" }}/>
                <div className="flex lg:hidden gap-2 items-center px-4 lg:px-8">
                    <FilterMenu
                        value={selectedYear}
                        options={YEARS}
                        onChange={setSelectedYear}
                    />
                    {/* <FilterMenu
                        value={selectedPeriod}
                        options={['DAILY', 'MONTHLY', 'QUARTERLY', 'YEARLY']}
                        onChange={setSelectedPeriod}
                    /> */}
                </div>
                
                <div className="px-4 lg:px-8 max-w-full"> 
                    <div className="overflow-x-auto"> 
                        <div className="min-w-125 md:min-w-0 mb-4"> 
                            <TransactionsAreaChart
                                data={eventDonationsVisuals?.monthlyDonations ?? []}
                                dataKey="totalDonation"
                                name="Donation Total"
                            /> 
                        </div> 
                    </div> 
                </div>
            </div>

            <div className="bg-white py-6 px-4">
                <DonationsTable
                    type="Event Donations"
                    data={eventDonations ?? []}
                />
            </div>
        </div>
    )
}
