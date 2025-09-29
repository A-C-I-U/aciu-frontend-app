import { generateMockPublications, publicationStatusMap } from "@/utils/helpers";
import type { PublicationDataType } from "@/utils/types";
import { type ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/utils/helpers";
import { Link } from "react-router-dom";
import { Eye } from "@solar-icons/react";
import { CommentOutlined } from "@ant-design/icons";
import MobilePublicationItem from "./MobilePublicationItem";
import { useState } from "react";
import { Pagination } from "@heroui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useMediaQuery } from "@mui/material";
import PostsTable from "../PostsTable";

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
                 const { 
                    title, 
                    creationDate, 
                    lastModified, 
                    postImpressions,
                    status
                } = publication;

                return (
                    <>
                        <MobilePublicationItem 
                            key={index}
                            title={title} 
                            creationDate={creationDate} 
                            lastModified={lastModified} 
                            postImpressions={postImpressions} 
                            status={status} 
                        />
                    </>
                )
            })
        }
        {isMobile &&
            <div className="w-full pt-3 pb-4 px-6 flex justify-between items-center">
                <button
                    className="rounded-md py-2 px-[.875rem] 
                    flex gap-2 justify-center items-center
                    shadow-[0px_1px_2px_0px_#1018280D] border
                    border-grayscale-300 "
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    <ArrowLeftIcon size={20} color="#00B686" />
                </button>
                <Pagination
                    total={Math.ceil(mockData?.length / itemsPerPage)}
                    page={page}
                    onChange={setPage}
                    classNames={{
                        cursor: "hidden"
                    }}
                    renderItem={(item) => {
                        const isActive = item.page === page;
                        return (
                            <button 
                                key={item.key}
                                // onPress is not a prop on button but is required from hero ui
                                onClick={item.onPress as unknown as React.MouseEventHandler<HTMLButtonElement>}
                                className={`w-[2.5rem] h-[2.5rem] rounded-md
                                ${isActive ? "bg-aciu-green-light " : ""}
                                rounded-md text-aciu-new-green-normal hover:bg-aciu-green-light font-inter`}>
                                {item.page || item.children}
                            </button>
                        )
                    }}
                />
                    <button
                        className="rounded-md py-2 px-[.875rem] 
                        flex gap-2 justify-center items-center
                        shadow-[0px_1px_2px_0px_#1018280D] border
                        border-grayscale-300 text-green-normal"
                        onClick={() => setPage(page + 1)}
                        disabled={page >= Math.ceil(mockData?.length / itemsPerPage)}
                    >
                        <ArrowRightIcon size={20} color="#00B686" />
                    </button>
                </div>
            }
        </>
       
        
    )
}

const mockData: PublicationDataType[] = generateMockPublications(20);

export const columns: ColumnDef<PublicationDataType>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }: { row: any }) => <span>{row.original.title}</span>
    },
    {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }: {row: any}) => <span>{formatDate(row.original.creationDate)}</span>
    },
    {
        accessorKey: "postImpressions",
        header: "Post Impressions",
        cell: ({ row }: {row: any }) => {
            const { comments, views } = row.original.postImpressions;

            return (
                <span className="gap-4 flex items-center">
                    <span className="gap-2 flex items-center">
                        <Eye fontVariant="linear" size={16} color="#3E3E3E"/>
                        {views || '-'}
                    </span>
                    <span className="gap-2 flex items-center">
                        <CommentOutlined size={16} color="#3E3E3E" />
                        {comments || '-'}
                    </span>
                </span>
            )
        }
    },
    {
        accessorKey: "lastModified",
        header: "Last Modified",
        cell: ({ row }: {row: any}) => <span>{formatDate(row.original.lastModified)}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }) => {
            const status = getValue();
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = publicationStatusMap[status as PublicationDataType["status"]];

            return (
                <span 
                    style={{
                        backgroundColor: bgColor,
                        color: labelColor,
                        height: "2rem"
                    }} 
                    className="py-[2px] pr-2 pl-[6px] whitespace-nowrap
                        flex gap-[6px] items-center rounded-[1rem]
                        text-xs font-motserrat font-medium max-w-fit"
                >
                    <span style={{
                        backgroundColor: dotColor
                    }} className="w-[6px] h-[6px] rounded-full"></span>
                    {label}
                </span>
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 150,
        cell: () => (
            <Link to={"/blog/post/1"}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px] 
                border border-aciu-green-normal min-w-[145px] whitespace-nowrap">
                View Post
            </Link>
        )
    }
]

