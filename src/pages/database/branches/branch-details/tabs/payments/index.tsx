import SectionHeader from "@/components/SectionHeader";
import { branchPaymentStatusMap, formatDate, generateMockBranchPayments } from "@/utils/helpers";
import type { BranchPaymentsDataType, FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { columns } from "./columns";
import MobileItemCard from "@/components/MobileItem";
import ViewPayment from "./ViewPayment";
import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";

export default function BranchPaymentsTab() {
    const [_query, setQuery] = useState(""); // TODO: Remove underscore when search logic is implemented
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [selected, setSelected] = useState<BranchPaymentsDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);

    const handleViewClick = (payment: BranchPaymentsDataType) => {
        setSelected(payment);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q)
    }
    
    return (
        <div className="flex flex-col gap-6 px-4">
            <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                <SectionHeader
                    title={!isLarge ? "Branch Payments" : ""}
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                    noTitle={!isLarge ? false : true}
                />
            </div>

            <ResponsiveDataTable
                data={mockData}
                columns={columns(handleViewClick)}
                renderMobileItem={(payment: BranchPaymentsDataType) => (
                    <MobileItemCard
                        key={payment.id}
                        item={payment}
                        fields={fields}
                        status={branchPaymentStatusMap[payment.status]}
                        actionLabel="View Details"
                        onActionClick={() => handleViewClick(payment)}
                    />)}
                />
            <ViewPayment
                open={isViewOpen}
                onClose={() => setViewOpen(false)}
                payment={selected}
            />
        </div>
    )
}

const mockData = generateMockBranchPayments(20);
const fields: FieldConfig<BranchPaymentsDataType>[] = [
    {
        label: "Amount Paid",
        value: (p) => `N${(+p.amountPaid).toLocaleString()}`,
    },
    {
        label: "Transaction ID",
        value: (p) => p.id
    },
    {
        label: "Date",
        value: (p) => formatDate(p.date)
    },
    {
        label: "Member Name",
        value: (p) => p.memberName
    }
]