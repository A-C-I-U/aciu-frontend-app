import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import type { WithdrawalResponse } from "@/services/types/transactions";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { transactionsWithdrawalColumns } from "../columns/TransactionsWithdrawalColumns";
import MobileItemCard from "@/components/MobileItem";
import type { FieldConfig } from "@/utils/types";
import { withdrawalStatusMap } from "@/utils/helpers";
import { formatDate } from "date-fns";
import TransactionsWithdrawalDetail from "../details/TransactionsWithdrawalDetail";

export default function TransactionsWithdrawalTable({ data }: { data: WithdrawalResponse[]}) {
    const isMedium = useMediaQuery('(max-width: 1250px)');

    const [selected, setSelected] = useState<WithdrawalResponse | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const handleViewClick = (withdrawal: WithdrawalResponse) => {
        setSelected(withdrawal)
        setViewOpen(true)
    }

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <SectionHeader
                    title="Withdrawal Requests"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                <ResponsiveDataTable
                    data={data}
                    columns={transactionsWithdrawalColumns(handleViewClick)}
                    renderMobileItem={(withdrawal: WithdrawalResponse) => (
                        <MobileItemCard
                            key={withdrawal.id}
                            item={withdrawal}
                            fields={fields}
                            status={withdrawalStatusMap[withdrawal.Status]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(withdrawal)}
                         />
                    )}
                />
            </div>
            <TransactionsWithdrawalDetail
                open={isViewOpen}
                onClose={() => setViewOpen(false)}
                id={selected && selected.id}
            />
        </>
    )
}

const fields: FieldConfig<WithdrawalResponse>[] = [
    { label: "Amount", value: (p) => `N${(+p["Amount Paid"]).toLocaleString()}`}, 
    { label: "Transaction ID", value: (p) => p.transactionId }, 
    { label: "Date", value: (p) => formatDate(p.Date, "dd-MM-yyyy h:mm  aaaaa'm'") }, 
    { label: "Branch Name", value: (p) => p["Branch Name"] } 
   ]