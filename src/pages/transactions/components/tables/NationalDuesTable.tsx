import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import type { NationalDuesResponse } from "@/services/types/transactions"
import { useMediaQuery } from "@mui/material";
import { useState } from "react"
import MobileItemCard from "@/components/MobileItem";
import type { FieldConfig } from "@/utils/types";
import { formatDate } from "date-fns";
import DuesPaymentDetail from "../details/DuesPaymentDetails";
import { nationalDuesMap } from "@/utils/helpers";
import { nationalDuesColumns } from "../columns/NationalDuesColumns";

export default function NationalDuesTable({
    data,
}: {
    data: NationalDuesResponse[],
}) {
    const isMedium = useMediaQuery("(max-width: 1250px)");

    const [selected, setSelected] = useState<NationalDuesResponse | null>(null);
    const [_isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const handleViewClick = (nationalDue: NationalDuesResponse) => {
        setSelected(nationalDue);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                <SectionHeader
                    title="National Dues"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                <ResponsiveDataTable
                    data={data}
                    columns={nationalDuesColumns(handleViewClick)}
                    renderMobileItem={(nationalDue: NationalDuesResponse) => (
                        <MobileItemCard
                            key={nationalDue.id}
                            item={nationalDue}
                            fields={fields}
                            status={nationalDuesMap[nationalDue.Status]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(nationalDue)}
                        />
                    )}
                />
            </div>
            <DuesPaymentDetail
                open={false}
                onClose={() => setViewOpen(false)}
                id={selected && selected.id}
            />
        </>
    )
}


const fields: FieldConfig<NationalDuesResponse>[] = [ 
    { label: "Amount Paid", value: (p) => `N${(+p["Amount Paid"]).toLocaleString()}`}, 
    { label: "Due Type", value: (p) => p["Due Type"] }, 
    { label: "Date", value: (p) => formatDate(p.Date, "dd-MM-yyyy h:mm  aaaaa'm'") }, 
    { label: "Intervals", value: (p) => p.Intervals } 
]