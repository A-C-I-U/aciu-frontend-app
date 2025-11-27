import type { FileViewDrawerProps } from "@/utils/types";
import { useState } from "react";
import ResourceContent from "./ViewResourceContent";
import { SuccessDialog } from "@/components/SuccessDialog";
import { MarkIcon } from "@/components/Icons";
import ShellModal from "@/components/ShellModal";
import { useResourceById } from "@/services/hooks/resources"; // Import the hook
import { CircularProgress, Box } from "@mui/material"; // Add loading component

interface ViewResourceProps extends FileViewDrawerProps {
    resourceId?: string;
}

export default function ViewResource({
    open,
    onClose,
    resourceId,
}: ViewResourceProps) {
    const [openEditSuccess, setOpenEditSuccess] = useState(false);
    
    const { data: resource, isLoading, error } = useResourceById(resourceId!);

    return (
        <>
            <ShellModal
                open={open}
                onClose={onClose}
            >
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <CircularProgress size={24} color="success" />
                            <span>Loading resource...</span>
                        </Box>
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="text-center">
                            <p className="text-aciu-red">Error loading resource</p>
                            <p className="text-sm text-aciu-border-grey mt-2">
                                {error.message}
                            </p>
                        </div>
                    </div>
                ) : resource ? (
                    <ResourceContent
                        open={open}
                        onClose={onClose}
                        onSuccess={() => {
                            setOpenEditSuccess(true)
                            onClose()
                        }}
                        resource={resource} 
                    />
                ) : (
                    <div className="flex items-center justify-center h-64">
                        <p className="text-aciu-abriba">Resource not found</p>
                    </div>
                )}
            </ShellModal>
            <SuccessDialog
                open={openEditSuccess}
                onClose={() => setOpenEditSuccess(false)}
                title="Resource updated successfully"
                message="Your file has been updated."
                icon={<MarkIcon />}
                primaryAction={{
                    label: "Go back to Resources",
                    onClick: () => setOpenEditSuccess(false)
                }}
            />
        </>
    )
}