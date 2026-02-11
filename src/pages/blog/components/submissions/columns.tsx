import { formatDate, publicationStatusMap } from "@/utils/helpers";
import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVertical } from "lucide-react";
import type { Submission } from "@/services/types/blogs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { StatusBadge } from "@/components/StatusBadge";

export const getColumns = (
    handleOpenDialog: (type: "approve" | "reject", id: string) => void
): ColumnDef<Submission>[] => [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }: { row: Row<Submission> }) => <span className="font-medium text-aciu-border-grey">{row.original.title}</span>
        },
        {
            accessorKey: "createdAt",
            header: "Creation Date",
            cell: ({ row }: { row: Row<Submission> }) => <span className="text-aciu-abriba">{formatDate(row.original.createdAt)}</span>
        },
        {
            accessorKey: "authorName",
            header: "Author",
            cell: ({ row }: { row: Row<Submission> }) => <span className="text-aciu-abriba">{row.original.authorName}</span>
        },
        {
            accessorKey: "branch",
            header: "Branch",
            cell: ({ row }: { row: Row<Submission> }) => <span className="text-aciu-abriba">{row.original.branch}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            maxSize: 300,
            cell: ({ row }: { row: Row<Submission> }) => {
                const status = row.original.status;
                const statusConfig = publicationStatusMap[status.toLowerCase() as keyof typeof publicationStatusMap] || publicationStatusMap["pending approval"];

                return (
                    <StatusBadge
                        label={statusConfig.label}
                        labelColor={statusConfig.labelColor}
                        bgColor={statusConfig.bgColor}
                        dotColor={statusConfig.dotColor}
                    />
                )
            }
        },
        {
            id: "actions",
            header: "Actions",
            size: 150,
            cell: ({ row }: { row: Row<Submission> }) => {
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
                    navigate(`/blog/posts/${row.original.id}`)
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
                                    marginTop: "0 !important",
                                    marginBottom: "0 !important",

                                }}
                            />
                            {row.original.status !== 'Published' && (
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
                            )}
                            {row.original.status !== 'Rejected' && (
                                <>
                                    <Divider
                                        sx={{
                                            width: "100%",
                                            borderColor: "#E2E2E2",
                                            marginTop: "0 !important",
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
                                </>
                            )}
                        </Menu>
                    </div>
                )

            }
        }
    ]
