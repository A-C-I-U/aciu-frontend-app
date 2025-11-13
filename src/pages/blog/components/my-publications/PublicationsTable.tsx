import { generateMockPublications } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import PostsTable from "../shared/PostsTable";
import { columns } from "./columns";
import MobilePublicationItem from "./MobilePublicationItem";
import { PaginationControls } from "../shared/PaginationControls";

export default function PublicationsTable() {
    const isMedium = useMediaQuery('(max-width:1250px)')
    const itemsPerPage = 4;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end)

    return (
        <>
        {!isMedium ? 
            <PostsTable
                data={mockData}
                columns={columns}
                withSelection
            /> :
            <div className="grid gap-4 md:grid-cols-2">
                {currentItems.map((publication) => (
                    <MobilePublicationItem
                        key={publication.id}
                        publication={publication} 
                    />
                ))}
            </div>
        }
        {isMedium &&
           <PaginationControls
                total={mockData.length}
                page={page}
                onPageChange={setPage}
                itemsPerPage={itemsPerPage}
            />
        }
    </>
       
        
    )
}

const mockData: PublicationDataType[] = generateMockPublications(20);