import MobileItemCard from "@/components/MobileItem"
import { ResponsiveDataTable } from "@/components/ResponsiveDataTable"
import { sectionActions } from "@/components/SectionActions"
import SectionHeader from "@/components/SectionHeader"
import type { DonationsResponse } from "@/services/types/transactions"
import { paymentStatusMap } from "@/utils/helpers"
import type { FieldConfig } from "@/utils/types"
import { useMediaQuery } from "@mui/material"
import { formatDate } from "date-fns"
import { useState } from "react"
import { donationsColumns } from "../columns/Donations"
import EventDonationsDetail from "../details/EventDonationsDetail"
import ProjectDonationsDetail from "../details/ProjectDonationsDetail"

export default function DonationsTable({
    type, data
}: { 
    type: "Event Donations" | "Project Donations",
    data: DonationsResponse[]
}) {
    const isMedium = useMediaQuery('(max-width: 1250px)')

    const [selected, setSelected] = useState<DonationsResponse | null>(null)
    const [isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const handleViewClick = (donation: DonationsResponse) => {
        setSelected(donation);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <SectionHeader
                    title={type}
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                <ResponsiveDataTable
                    data={data}
                    columns={donationsColumns(handleViewClick)}
                    renderMobileItem={(donation: DonationsResponse) => (
                        <MobileItemCard
                            key={donation.id}
                            item={donation}
                            fields={fields}
                            status={paymentStatusMap[donation.Status]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(donation)}
                        />
                    )}
                />
            </div>
            {type === "Event Donations" ? (
                <EventDonationsDetail
                    open={isViewOpen}
                    onClose={() => setViewOpen(false)}
                    id={selected && selected.id}
                />
            ) : (
                <ProjectDonationsDetail
                    open={isViewOpen}
                    onClose={() => setViewOpen(false)}
                    id={selected && selected.id}
                />
            )}
        </>
    )
}

const fields: FieldConfig<DonationsResponse>[] = [
    { label: "Amount", value: (p) => `N${(+p["Amount Paid"]).toLocaleString()}`}, 
    { label: "Transaction ID", value: (p) => p.transactionId }, 
    { label: "Date", value: (p) => formatDate(p.Date, "dd-MM-yyyy h:mm  aaaaa'm'") }, 
    { label: "Branch Name", value: (p) => p["Donor Name"] } 
   ]