import MobileItemCard from "@/components/MobileItem";
import MobileItemSkeleton from "@/components/MobileItemSkeleton";
import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import TableSkeleton from "@/components/TableSkeleton";
import { useDatabaseAgeGrades } from "@/services/hooks/database";
import type { AgeGrade } from "@/services/types/database";
import type { FieldConfig } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { ageGradeColumns, ageGradeStatusMap } from "./columns";

export default function AgeGrades() {
    const isMedium = useMediaQuery("(max-width: 1250px)");
    
    const [_selected, setSelected] = useState<AgeGrade | null>(null);
    const [_isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const { data, isLoading  } = useDatabaseAgeGrades();

    const handleViewClick = (ageGrade: AgeGrade) => {
        setSelected(ageGrade);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <>
            <div className="flex flex-col gap-6 py-6 px-4 rounded-lg">
                <SectionHeader
                    title="Age Grades"
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
                    columns={ageGradeColumns(handleViewClick)}
                    renderMobileItem={(ageGrade: AgeGrade) => (
                        <MobileItemCard
                            key={ageGrade.name}
                            item={ageGrade}
                            fields={fields}
                            status={ageGradeStatusMap[ageGrade.status]}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(ageGrade)}
                        />
                    )}
                />
                }
            </div>
        </>
    )
}

const fields: FieldConfig<AgeGrade>[] = [
    { label: "Name", value: (p) => p.name },
    { label: "Associated Branches", value: (p) => `${p.associatedBranches} Branches` },
    { label: "Members", value: (p) => `${p.members} Members` },
    { label: "Years Formed", value: (p) => p.yearFormed },
]