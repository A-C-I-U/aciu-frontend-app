import { TransactionsAreaChart } from "@/components/TransactionsAreaChart";
import { useWithdrawals, useWithdrawalVisuals } from "@/services/hooks/transactions";
import { Divider } from "@mui/material";
import { ArrowDown2 } from "iconsax-react";
import TransactionsWithdrawalTable from "../tables/TransactionsWithdrawalTable";
import TableChartSkeleton from "../skeletons/TableChartSkeleton";

export default function WithdrawalRequests() {
    const { data: transactionsWithdrawalsVisual, isLoading: isVisualLoading } = useWithdrawalVisuals(2026);
    const { data: transactionsWithdrawalRequests, isLoading: isRequestsLoading  } = useWithdrawals();

    if (isVisualLoading || isRequestsLoading) return <TableChartSkeleton />;
    
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="bg-white rounded-lg flex flex-col gap-6 min-w-0">
                <div className="flex flex-col pt-5.5 lg:flex-row gap-6.75 lg:gap-7 justify-between lg:items-center px-4 lg:px-8">
                    <h3 className="text-xl leading-[120%] text-aciu-border-grey font-bold">
                        Withdrawal Requests
                    </h3>
                    <div className="hidden lg:flex gap-2 items-center">
                        <button className="section-action-button admin">
                            2022
                            <ArrowDown2 color="#3E3E3E" size={14} />
                        </button>
                        <button className="section-action-button admin">
                            Monthly
                            <ArrowDown2 color="#3E3E3E" size={14} />
                        </button>
                    </div>
                </div>
                <Divider sx={{ borderColor: "#EEECF6" }}/>
                <div className="flex lg:hidden gap-2 items-center px-4 lg:px-8">
                    <button className="section-action-button admin">
                        2022
                        <ArrowDown2 color="#3E3E3E" size={14} />
                    </button>
                    <button className="section-action-button admin">
                        Monthly
                        <ArrowDown2 color="#3E3E3E" size={14} />
                    </button>
                </div>
                
                <div className="px-4 lg:px-8 max-w-full"> 
                    <div className="overflow-x-auto"> 
                        <div className="min-w-125 md:min-w-0 mb-4"> 
                            <TransactionsAreaChart
                                data={transactionsWithdrawalsVisual?.monthlyWithdrawals ?? []}
                                dataKey="totalWithdrawal"
                            /> 
                        </div> 
                    </div> 
                </div>
            </div>

            <div className="bg-white py-6 px-4">
                <TransactionsWithdrawalTable
                    data={transactionsWithdrawalRequests ?? []}
                />
            </div>
        </div>
    )
}