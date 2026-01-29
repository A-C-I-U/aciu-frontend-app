import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import type { NationalDuesResponse } from "@/services/types/transactions"
import { useMediaQuery } from "@mui/material";
import { useState } from "react"
import MobileItemCard from "@/components/MobileItem";
import type { FieldConfig } from "@/utils/types";
import { formatDate } from "date-fns";
import { nationalDuesMap } from "@/utils/helpers";
import { nationalDuesColumns } from "../columns/NationalDuesColumns";
import DuesPreview from "@/pages/my-branch/components/tabs/branch-dues/DuesPreview";
import AddNationalDues from "../actions/AddNationalDues";

export default function NationalDuesTable({
    data,
}: {
    data: NationalDuesResponse[],
}) {
    const isMedium = useMediaQuery("(max-width: 1250px)");

    const [selected, setSelected] = useState<NationalDuesResponse | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [addDues, showAddDues] = useState(false);
    const [editingId, setEditingId] = useState("")

    const [_query, setQuery] = useState("");

    const handleViewClick = (nationalDue: NationalDuesResponse) => {
        setSelected(nationalDue);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q);
    }

    const handleEdit = () => {
        setEditingId(selected ? selected.id : "");
        setViewOpen(false);
        showAddDues(true);
    }

    return (
        <>
            <div className="flex flex-col gap-6 lg:px-4">
                 <div className={`flex ${isMedium ? "items-start" : "items-center"} md:gap-4`}>
                    <SectionHeader
                        title="National Dues"
                        onSearch={handleSearch}
                        showSearch={isMedium ? false : true}
                        actions={sectionActions}
                    />
                    <button onClick={() => showAddDues(true)} className="max-w-fit btn btn-primary">
                        Add new dues
                    </button>
                 </div>
                <ResponsiveDataTable
                    data={data}
                    columns={nationalDuesColumns(handleViewClick)}
                    renderMobileItem={(nationalDue: NationalDuesResponse) => (
                        <MobileItemCard
                            key={nationalDue.id}
                            item={nationalDue}
                            fields={fields}
                            status={nationalDuesMap[nationalDue.Status.toLowerCase() as NationalDuesResponse["Status"]]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(nationalDue)}
                        />
                    )}
                />
            </div>
            <DuesPreview
                open={isViewOpen}
                onClose={() => setViewOpen(false)}
                onEdit={handleEdit}
                id={selected && selected.id}
            />
            <AddNationalDues
                open={addDues}
                id={editingId}
                onClose={() => showAddDues(false)}
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