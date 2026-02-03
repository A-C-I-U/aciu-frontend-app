import { formatDate, generateMockWithdrawals, withdrawalStatusMap } from "@/utils/helpers";
import type { FieldConfig, WithdrawalDataType } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useState } from "react"
import { columns } from "./columns";
import SectionHeader from "@/components/SectionHeader";
import MobileItemCard from "@/components/MobileItem";
import ViewWithdrawalRequest from "./ViewWithdrawalRequest";
import SubmitWithdrawalRequest from "./SubmitWithdrawalRequest";
import SuccessfulRequest from "./SuccessfulRequest";
import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";


export default function WithdrawalTab() {
    const [_query, setQuery] = useState("");
    const isMedium = useMediaQuery("(max-width: 1250px)");
    const isLarge = useMediaQuery("(max-width: 1024px)");
    const [showSubmitRequest, setShowSubmitRequest] = useState(false);
    const [selected, setSelected] = useState<WithdrawalDataType | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [isSuccessOpen, setSuccessOpen] = useState(false);


    const handleViewClick = (withdrawal: WithdrawalDataType) => {
        setSelected(withdrawal);
        setViewOpen(true)
    }

    const handleViewClose = () => {
        setViewOpen(false);
    }

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title={!isLarge ? "Withdrawals" : ""}
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                        noTitle={!isLarge ? false : true}
                    />
                    <button 
                        className="btn btn-primary max-w-fit text-sm! md:text-base!"
                        onClick={() => setShowSubmitRequest(true)}
                    >
                        Submit Withdrawal Request
                    </button>
                </div>

                <ResponsiveDataTable
                    data={mockData}
                    columns={columns(handleViewClick)}
                    renderMobileItem={(withdrawal: WithdrawalDataType) => (
                        <MobileItemCard
                            key={withdrawal.id}
                            item={withdrawal}
                            fields={fields}
                            status={withdrawalStatusMap[withdrawal.status]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(withdrawal)}
                        />
                    )}
                />
                    
            </div>

            <ViewWithdrawalRequest
                open={isViewOpen}
                onClose={handleViewClose}
                withdrawal={selected}
            />

            <SubmitWithdrawalRequest
                open={showSubmitRequest}
                onClose={() => setShowSubmitRequest(false)}
                onSuccess={() => setSuccessOpen(true)}
            />
            
            <SuccessfulRequest
                open={isSuccessOpen}
                onClose={() => setSuccessOpen(true)}
            />
        </>
    )

}

const mockData = generateMockWithdrawals(20);

const fields: FieldConfig<WithdrawalDataType>[] = [
    {
        label: "Amount",
        value: (p) => `N${(+p.amount).toLocaleString()}`,
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
        label: "Submitted by",
        value: (p) => p.submittedBy
    }
]