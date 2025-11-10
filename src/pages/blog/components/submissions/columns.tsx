import { formatDate, publicationStatusMap } from "@/utils/helpers";
import { Eye } from "iconsax-react";
import { CommentOutlined } from "@ant-design/icons";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import {  MoreVertical } from "lucide-react"
import type { PublicationDataType } from "@/utils/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { blogDetails } from "@/utils/data";
import { StatusBadge } from "@/components/StatusBadge";


export const getColumns = (
    handleOpenDialog: (type: "approve" | "reject", id: string) => void): ColumnDef<PublicationDataType>[] => [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }: { row: Row<PublicationDataType> }) => <span>{row.original.title}</span>
    },
    {
        accessorKey: "creationDate",
        header: "Creation Date",
        cell: ({ row }: {row: Row<PublicationDataType> }) => <span>{formatDate(row.original.creationDate)}</span>
    },
    {
        accessorKey: "postImpressions",
        header: "Post Impressions",
        cell: ({ row }: {row: Row<PublicationDataType> }) => {
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
        cell: ({ row }: {row: Row<PublicationDataType> }) => <span>{formatDate(row.original.lastModified)}</span>
    },
    {
        accessorKey: "status",
        header: "Status",
        maxSize: 300,
        cell: ({ getValue }: CellContext<PublicationDataType, unknown>) => {
            const status = getValue();
            const { 
                label, 
                labelColor, 
                dotColor, 
                bgColor 
            } = publicationStatusMap[status as PublicationDataType["status"]];

            return (
                <StatusBadge
                    label={label}
                    labelColor={labelColor}
                    bgColor={bgColor}
                    dotColor={dotColor}
                />
            )
        }
    },
    {
        id: "actions",
        header: "Actions",
        size: 150,
        cell: ({ row }: { row: Row<PublicationDataType> }) => {
            const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

            const open = Boolean(anchorEl);
            const navigate = useNavigate();

            const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
                setAnchorEl(event.currentTarget);
            }

            const handleClose = () => {
                setAnchorEl(null);
            }

            const handleViewPost = () => {
                handleClose()
                navigate(`/blog/submissions/${blogDetails.id}`)
            }
            
            return (
                <div>
                    <IconButton
                        aria-label="actions"
                        id="actions"
                        aria-haspopup="true"
                        aria-controls={open ? "actions" : undefined}
                        aria-expanded={open ? true : undefined}
                        onClick={handleClick}
                        sx={{
                            padding: ".5rem",
                            borderRadius: "5px",
                            border: "1px solid #00B686"
                        }}
                    >
                        <MoreVertical size={20} />
                    </IconButton>
                    <Menu
                        id="actions"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        slotProps={{
                        paper: {
                        sx: {
                            borderRadius: "0px 0px 10px 10px",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
                        }
                        },
                        list: {
                            'aria-labelledby': 'actions',
                            sx: {
                                display: "flex",
                                flexDirection: "column",
                                py: 0,
                                "& .MuiMenuItem-root": {
                                    px: 2,
                                    py: 2,
                                    borderRadius: "6px",
                                        "&:hover": {
                                            backgroundColor: "#f7f7f7"
                                        }
                                    }
                            }
                        }
                    }}
                    disableScrollLock
                    >
                        <MenuItem 
                            onClick={handleViewPost}
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: "#3E3E3E",
                                fontSize: ".875rem",
                            }}>
                                <span>View Post</span>
                           
                        </MenuItem>
                         <Divider 
                                sx={{ 
                                    width: "100%", 
                                    borderColor: "#E2E2E2", 
                                    marginTop:"0 !important",
                                    marginBottom: "0 !important",
                                    
                                }} 
                            />
                        <MenuItem 
                            onClick={() => { 
                                handleClose(); 
                                handleOpenDialog("approve", row.original.id); 
                            }}
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: "#00CA71",
                                fontSize: ".875rem",
                                fontWeight: 600,
                            }}>
                            Approve Post
                        </MenuItem>
                        <Divider 
                            sx={{ 
                                width: "100%", 
                                borderColor: "#E2E2E2", 
                                marginTop:"0 !important",
                                marginBottom: "0 !important",
                            }} 
                        />
                        <MenuItem 
                            onClick={() => { 
                                handleClose(); 
                                handleOpenDialog("reject", row.original.id); 
                            }}
                            sx={{
                                fontFamily: "'Montserrat', sans-serif",
                                color: "#FF0707",
                                fontSize: ".875rem",
                                fontWeight: 600,
                            }}>
                            Reject Post
                        </MenuItem>
                    </Menu>
                </div>
            )
            
        }
    }
]

