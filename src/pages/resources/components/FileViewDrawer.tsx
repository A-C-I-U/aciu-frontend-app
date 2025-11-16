import { ScrollLock } from "@/components/ScrollLock";
import type { FileViewDrawerProps } from "@/utils/types";
import { Dialog, Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ViewResourceContent from "./ViewResourceContent";
import EditResourceContent from "./EditResourceContent";
import SuccessfulUpload from "./SuccessfulUpload";


// Retrieve file using id here instead of passing props
export default function FileViewDrawer({
    file,
    name,
    description,
    open,
    onClose,
}: FileViewDrawerProps) {
    const [contentMode, setContentMode] = useState<'edit' | 'view'>('view');
    const [openEditSuccess, setOpenEditSuccess] = useState(false)
    const isMobile = useMediaQuery("(max-width: 768px)");

    const dialogStyles = {
        "& .MuiDialog-paper": {
            overflow: "auto",
            width: {
                xs: "92%",
                md: "38.25rem",
            },
            margin: "0 auto",
            borderRadius: "1.25rem"
        },
    }

    const drawerStyles = {
        "& .MuiDrawer-paper": {
            width: "40%",
            maxWidth: "70%",
        }
    }

    const content = contentMode === "view" ? (
        <ViewResourceContent
            open={open}
            onEdit={() => setContentMode("edit")}
            onClose={onClose}
            file={file}
            name={name}
            description={description}
        />
        ) : (
        <EditResourceContent
            onClose={() => {
            onClose();
            setContentMode("view");
            }}
            onSubmit={() => setOpenEditSuccess(true)}
        />
    );



    return (
        <>
            <ScrollLock open={open} />
             {isMobile ? (
                <Dialog
                    open={open}
                    onClose={onClose}
                    disableScrollLock={false}
                    sx={dialogStyles}
                >
                    {content}
                </Dialog>
            ) : (
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={onClose}
                    disableScrollLock={false}
                    sx={drawerStyles}
                >
                    {content}
                </Drawer>
            )}
            <SuccessfulUpload
                open={openEditSuccess}
                onClose={() => {
                    setContentMode("view")
                    setOpenEditSuccess(false)
                }}
            />
        </>
    )
}