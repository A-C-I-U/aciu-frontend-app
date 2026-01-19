import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import type { DuesPaymentResponse } from "@/services/types/transactions"
import { useMediaQuery } from "@mui/material";
import { useState } from "react"
import { duesPaymentcolumns } from "../columns/DuesPaymentColumns";
import MobileItemCard from "@/components/MobileItem";
import type { FieldConfig } from "@/utils/types";
import { duePaymentStatusMap } from "@/utils/helpers";
import { formatDate } from "date-fns";
import DuesPaymentDetail from "../details/DuesPaymentDetails";

export default function DuePaymentsTable({
    data,
}: {
    data: DuesPaymentResponse[],
}) {
    const isMedium = useMediaQuery("(max-width: 1250px)");

    const [selected, setSelected] = useState<DuesPaymentResponse | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const handleViewClick = (duepayment: DuesPaymentResponse) => {
        setSelected(duepayment);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <SectionHeader
                    title="Dues Payment"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                <ResponsiveDataTable
                    data={data}
                    columns={duesPaymentcolumns(handleViewClick)}
                    renderMobileItem={(duePayment: DuesPaymentResponse) => (
                        <MobileItemCard
                            key={duePayment.id}
                            item={duePayment}
                            fields={fields}
                            status={duePaymentStatusMap[duePayment.status]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(duePayment)}
                        />
                    )}
                />
            </div>
            <DuesPaymentDetail
                open={isViewOpen}
                onClose={() => setViewOpen(false)}
                id={selected && selected.id}
            />
        </>
    )
}


const fields: FieldConfig<DuesPaymentResponse>[] = [ 
    { label: "Amount", value: (p) => `N${(+p.amountPaid).toLocaleString()}`}, 
    { label: "Transaction ID", value: (p) => p.transactionId }, 
    { label: "Date", value: (p) => formatDate(p.date, "dd-MM-yyyy h:mm  aaaaa'm'") }, 
    { label: "Branch Name", value: (p) => p.paidBy } 
]