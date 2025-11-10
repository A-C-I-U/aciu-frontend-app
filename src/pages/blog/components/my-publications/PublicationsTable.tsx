import { generateMockPublications } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import PostsTable from "../shared/PostsTable";
import { columns } from "./columns";
import MobilePublicationItem from "./MobilePublicationItem";
import { PaginationControls } from "../shared/PaginationControls";

export default function PublicationsTable() {
    const isMedium = useMediaQuery('(max-width:992px)')
    const itemsPerPage = 5;
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
            currentItems.map((publication) => {
                return (
                    <>
                        <MobilePublicationItem
                            key={publication.id}
                            publication={publication} 
                        />
                    </>
                )
            })
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