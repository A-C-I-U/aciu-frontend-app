import { formatSize, getExtension } from "@/utils/helpers";
import type { FileViewDrawerProps } from "@/utils/types";
import { Box, capitalize, Drawer, Typography } from "@mui/material";
import { X } from "lucide-react";

export default function FileViewDrawer({
    file,
    name,
    description,
    open,
    onClose,
}: FileViewDrawerProps) {
    const size = formatSize(file.size);
    const extension = getExtension(file);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
        >
            <Box
                px="1.375rem"
                py="1.125rem"
                display="flex"
            >
                <div className="flex justify-between items-center">
                    <Typography variant="h3" color="#313131">
                        View Resources
                    </Typography>
                    <X size={24} color="#3E3E3E" />
                </div>
                <div className="w-full flex items-center justify-center">
                    <Box
                        marginTop="4rem"
                        py="3.125rem"
                        px="2.25rem"
                        borderRadius="xl"
                        bgcolor="#F9FBFC"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={4}
                    >
                        <Box 
                            borderRadius="7px"
                            borderColor="#E5E5E5"
                            textAlign="center">
                                <p className="font-montserrat text-sm">
                                    {capitalize(extension)}
                                </p>
                        </Box>
                        <p className="font-montserrat font-medium text-xs text-aciu-border-grey">
                            {size}
                        </p>
                    </Box>
                </div>
                <hr className="mt-[4rem] text-aciu-dashboard-background w-full" />
                <Box 
                    marginTop="3.375rem"
                    gap="1rem"
                >
                    <Box
                        display="flex"
                        gap={2}
                    >
                        {/* <FormikField
                            value={name}
                            name="name"
                            label="File Name"
                            fullWidth
                        /> */}
                        <p>{name}</p>
                        <p>{description}</p>
                    </Box>
                    <Box
                        display="flex"
                        gap={2}
                    >
                        {/* <FormikField
                            // value={description}
                            type="text"
                            name="description"
                            label="File Description"
                            fullWidth
                        /> */}
                    </Box>
                </Box>
                <Box
                    width="100%"
                    display="flex"
                    alignSelf="flex-end"
                    gap="1.125rem"
                >
                    <button
                        style={{
                            padding: "1rem",
                            gap: ".5rem",
                            borderRadius: ".75rem",
                            backgroundColor: "#00B686",
                            color: "#fff",
                            fontFamily: "'Coolvetica', sans-serif",
                            width: "100%"
                        }}
                        >
                            Edit Resource
                    </button>
                    <button
                        style={{
                            padding: "1rem",
                            gap: ".5rem",
                            borderColor: "#E5E5E5",
                            borderRadius: ".75rem",
                            color: "#3E3E3E",
                            fontFamily: "'Coolvetica', sans-serif",
                            width: "100%"
                        }}
                        >
                            Archive Resource
                    </button>
                </Box>
            </Box>
        </Drawer>
    )
}