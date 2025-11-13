import type { FileViewProps } from "@/utils/types";
import { Box } from "@mui/material";
import { useState } from "react";
import FileViewDrawer from "./FileViewDrawer";
import { formatSize, getExtension } from "@/utils/helpers";

export default function FileView({
    file,
    name,
    description
}: FileViewProps) {
    const [fileOpen, setFileOpen] = useState(false);

    const extension = getExtension(file);
    const size = formatSize(file.size);

    const handleOpen = () => {
        setFileOpen(true)
    }

    const handleClose = () => {
        setFileOpen(false)
    }

    return (
        <>
            <Box
                onClick={handleOpen}
                borderRadius="1.25rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bgcolor="#F9FBFC"
                sx={{
                    py: {
                        xs: "1.75rem",
                        md: "3.125rem"
                    },
                    px: {
                        xs: "1.25rem",
                        md: "2.25rem"
                    },
                    cursor: "pointer",
                        transition: "background-color 0.3s ease, color 0.3s ease",
                        "&:hover": {
                            bgcolor: "#00B686",
                        "& p": {
                            color: "#fff",
                        },
                        "& p.size": {
                            color: "#C9C9C9"
                        },
                        "& p.extension": {
                            color: "#737373"
                        }
                    },
                }}
                
            >
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    alignItems="center"
                    justifyContent="center"
                >
                    <div className="flex items-center justify-center 
                        border rounded-md w-[5.5rem] h-[5.5rem]
                        border-aciu-dashboard-background bg-white">
                        <p className="extension font-montserrat text-sm text-aciu-abriba uppercase">
                            {extension}
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <p className="font-montserrat text-sm font-semibold text-aciu-darker-grey">
                            {name}
                        </p>
                        <p className="size font-montserrat text-xs font-medium text-aciu-border-grey">
                            {size}
                        </p>
                    </div>
                </Box>
            </Box>
            <FileViewDrawer 
                file={file}
                name={name}
                description={description}
                open={fileOpen}
                onClose={handleClose}
            />
        </>
    )
}