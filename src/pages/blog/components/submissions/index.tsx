import { useState } from "react";
import SubmissionsTable from "./SubmissionsTable";
import SectionHeader from "@/components/SectionHeader";
import { useMediaQuery } from "@mui/material";
import { sectionActions } from "@/components/SectionActions";


export default function Submissions() {
    const [ _query, setQuery ] = useState("");
    const isMedium = useMediaQuery('(max-width:1250px)')

    const handleSearch = (q: string) => {
        setQuery(q)
    }

    return (
         <div className="flex flex-col gap-6 lg:gap-4">
            <SectionHeader
                title="Submissions"
                onSearch={handleSearch}
                showSearch={isMedium ? false : true}       
                actions={sectionActions}
            />
            <SubmissionsTable />
        </div>
    )
}