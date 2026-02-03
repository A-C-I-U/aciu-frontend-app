import MobileItemCard from "@/components/MobileItem";
import MobileItemSkeleton from "@/components/MobileItemSkeleton";
import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import TableSkeleton from "@/components/TableSkeleton";
import { useDatabaseBranches } from "@/services/hooks/database";
import type { Branch } from "@/services/types/database";
import { branchStatusMap } from "@/utils/helpers";
import type { FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { branchColumns } from "./columns";

export default function Branches() {
    const isMedium = useMediaQuery("(max-width: 1250px)");
    
    const [_selected, setSelected] = useState<Branch | null>(null);
    const [_isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const { data, isLoading  } = useDatabaseBranches();

    const handleViewClick = (branch: Branch) => {
        setSelected(branch);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <>
            <div className="flex flex-col gap-6 py-6 px-4 rounded-lg">
                <SectionHeader
                    title="Branches"
                    onSearch={handleSearch}
                    showSearch={isMedium ? false : true}
                    actions={sectionActions}
                />
                {isLoading ?
                    (isMedium ?
                        <div className="grid gap-4 md:grid-cols-2">
                            {[1, 2, 3, 4].map((index) => (
                                <MobileItemSkeleton key={index}/>
                            ))}
                        </div> :
                        <TableSkeleton />
                    ) : 
                <ResponsiveDataTable
                    data={data ?? []}
                    columns={branchColumns(handleViewClick)}
                    renderMobileItem={(branch: Branch) => (
                        <MobileItemCard
                            key={branch.id}
                            item={branch}
                            fields={fields}
                            status={branchStatusMap[branch.status as Branch["status"]]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(branch)}
                        />
                    )}
                />
                }
            </div>
        </>
    )
}

const fields: FieldConfig<Branch>[] = [
    { label: "Branch Name", value: (p) => p.branchName },
    { label: "Branch President", value: (p) => p.branchPresident },
    { label: "Branch Members", value: (p) => p.branchMembers },
    { label: "Meeting Location", value: (p) => p.meetingLocation },
]