import { ResponsiveDataTable } from "@/components/ResponsiveDataTable";
import { sectionActions } from "@/components/SectionActions";
import SectionHeader from "@/components/SectionHeader";
import type { Member } from "@/services/types/database";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { memberColumns } from "./columns";
import MobileItemCard from "@/components/MobileItem";
import type { FieldConfig } from "@/utils/types";
import { formatDate } from "date-fns";
import { databaseMemberStatusMap } from "@/utils/helpers";
import { useDatabaseMembers } from "@/services/hooks/database";
import TableSkeleton from "@/components/TableSkeleton";
import MobileItemSkeleton from "@/components/MobileItemSkeleton";
import ViewBranchMember from "../branches/branch-details/tabs/branch-members/ViewBranchMember";

export default function Members() {
    const isMedium = useMediaQuery("(max-width: 1250px)");
    
    const [selected, setSelected] = useState<Member | null>(null);
    const [isViewOpen, setViewOpen] = useState(false);
    const [_query, setQuery] = useState("");

    const { data, isLoading  } = useDatabaseMembers();

    const handleViewClick = (member: Member) => {
        setSelected(member);
        setViewOpen(true);
    }

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
        <>
            <div className="flex flex-col gap-6 py-6 px-4 rounded-lg">
                <SectionHeader
                    title="Members"
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
                    columns={memberColumns(handleViewClick)}
                    renderMobileItem={(member: Member) => (
                        <MobileItemCard
                            key={member.id}
                            item={member}
                            fields={fields}
                            status={databaseMemberStatusMap[member.verificationStatus ? 'approved' : 'pending']}
                            actionLabel="View Details"
                            onActionClick={() => handleViewClick(member)}
                        />
                    )}
                />
                }
            </div>
            <ViewBranchMember
                open={isViewOpen} 
                onClose={() => setViewOpen(false)} 
                id={selected?.id ?? ""}
            />
        </>
    )
}

const fields: FieldConfig<Member>[] = [
    { label: "Age Grade", value: (p) => p.ageGrade },
    { label: "Joined On", value: (p) => formatDate(p.joinedOn, "dd-MM-yyyy h:mm  aaaaa'm'") },
    { label: "Occupation", value: (p) => p.occupation}
]