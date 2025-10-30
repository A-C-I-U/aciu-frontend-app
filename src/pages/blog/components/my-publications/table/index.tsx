import { generateMockPublications } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { useState } from "react";
import { useMediaQuery } from "@mui/material";
import PostsTable from "../../PostsTable";
import { columns } from "./columns";
import MobilePublicationItem from "../MobilePublicationItem";
import { PaginationControls } from "../../PaginationControls";

export default function PublicationsTable() {
    const isMobile = useMediaQuery('(max-width:768px)')
    const itemsPerPage = 5;
    const [page, setPage] = useState(1);

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentItems = mockData.slice(start, end)

    return (
        <>
        {!isMobile ? 
            <PostsTable
                data={mockData}
                columns={columns}
                withSelection
            /> :
            currentItems.map((publication, index) => {
                return (
                    <>
                        <MobilePublicationItem
                            key={index}
                            publication={publication} 
                        />
                    </>
                )
            })
        }
        {isMobile &&
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