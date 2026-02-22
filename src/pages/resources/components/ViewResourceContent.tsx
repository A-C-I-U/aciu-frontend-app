import FormikField from "@/components/FormikField";
import type { FileViewDrawerProps,  } from "@/utils/types";
import { CircularProgress, Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { FilePreviewCard } from "./FilePreviewCard";
import { useState } from "react";
import { editResourceSchema } from "@/utils/schemas";
import type { Resource } from "@/services/types/resources";
import { useUser } from "@/context/UserContext";
import { useArchiveResource, useDownloadResource, useUpdateResource } from "@/services/mutations/resources";
import { enqueueSnackbar } from "notistack";
import ShellHeader from "@/components/ShellHeader";

interface ResourceContentProps extends FileViewDrawerProps {
    onSuccess: () => void;
    resource?: Resource; 
}

export default function ResourceContent({
    onClose, 
    onSuccess,
    resource 
}: ResourceContentProps) {
    const [mode, setMode] = useState<"view" | "edit">("view");
    const { user } = useUser();

    
    const initialValues = {
        fileName: resource?.file_name || "",
        fileDescription: resource?.file_description || ""
    }

    const { mutateAsync: downloadResource, isPending: isDownloading } = useDownloadResource();
    const { mutateAsync: archiveResource, isPending: isArchiving } = useArchiveResource();

   const handleDownload = async (id: string) => {
        const { downloadUrl } = await downloadResource(id);
        window.open(downloadUrl, "_blank");
    };

    const handleArchive = async (id: string) => {
        if (resource?.archived) {
            enqueueSnackbar({
                message: "Resource already archived",
                variant: "info"
            })
            return;
        }
        try {
            await archiveResource({
                id
            });
            enqueueSnackbar({
                message: "Resource Archived",
                variant: "success"
            })
        } catch (error) {
            enqueueSnackbar({message: 'Failed to archive resource', variant: "error"});
        }
    }

    const { mutateAsync: updateResource, isPending: isUpdating } = useUpdateResource();

    const handleSubmit = async (values: typeof initialValues, actions: any) => {
        try {
           await updateResource({ 
                id: resource!.id, 
                fileName: values.fileName, 
                fileDescription: values.fileDescription 
            });
            enqueueSnackbar("Resource updated successfully!", { variant: "success" });
            onSuccess();
            setMode("view");
        } catch (error: any) {
            enqueueSnackbar(`Update failed: ${error.message}`, { variant: "error" });
        } finally {
            actions.setSubmitting(false);
        }
    }

    if (!resource) {
        return (
            <div className="resources-modal-section flex flex-col h-4/5 md:h-full overflow-hidden">
                <div className="relative flex items-center justify-between shrink-0">
                    <p className="resources-modal-title">Resource Details</p>
                    <button onClick={onClose} className="resources-modal-close">
                        <X width={24} height={24} color="#3E3E3E" />
                    </button>
                </div>
                <div className="flex items-center justify-center h-full">
                    <p>Resource not found</p>
                </div>
            </div>
        );
    }



    
    return (
        <div className="resources-modal-section flex flex-col h-full overflow-hidden">
            <ShellHeader title={mode === "view" ? "View resources" : "Edit resources"} onClose={onClose}/>

            <Divider className="shrink-0" />

            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={editResourceSchema}
                enableReinitialize={false}
            >
                {({ isValid, isSubmitting }) => (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body pb-6">
                            <div className="w-full flex items-center justify-center pb-4.5">
                                <FilePreviewCard
                                    file={{
                                        url: resource.file_url,
                                        size: resource.file_size,
                                        format: resource.file_format,
                                        name: resource.file_name
                                    }}
                                    height="h-65"
                                    className="mt-12!"
                                />
                            </div>

                            <Divider className="mt-16 text-aciu-dashboard-background" />

                            <div className="my-6 flex flex-col gap-3.5">
                                <FormikField
                                    label="File Name"
                                    name="fileName"
                                    disabled={mode === "view"}
                                    fullWidth
                                />

                                <FormikField
                                    label="File Description"
                                    name="fileDescription"
                                    disabled={mode === "view"}
                                    fullWidth
                                />
                            </div>
                        </div>
                        {user?.role === "member" &&
                            <div className="py-5.5 px-10.5 resources-button-container">
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                    disabled={isDownloading}
                                    onClick={() => handleDownload(resource.id)}
                                >
                                    Download Resource
                                    {isDownloading && <CircularProgress size={16} color='inherit' />}
                                </button>
                            </div>
                        }
                         {!(user?.role === "member") &&
                            <div className="py-5.5 px-10.5 resource-buttons-container">
                                {mode === "view" ? (
                                    <>
                                        <button
                                            className="btn btn-primary"
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setMode("edit")
                                            }}
                                        >
                                            Edit Resource
                                        </button>

                                        {<button 
                                            className="btn btn-secondary" 
                                            type="button"
                                            disabled={resource.archived || isArchiving} 
                                            onClick={() => handleArchive(resource.id)}
                                        >  
                                            {resource.archived ? "Archived" :
                                                (isArchiving ?
                                                    <>
                                                        Archiving..
                                                        <CircularProgress size={16} color='inherit' />
                                                    </> : 
                                                        "Archive Resource"
                                                )}
                                        </button>}
                                    </>
                                ) : mode === "edit" && (
                                    <>
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={!isValid || isSubmitting || isUpdating}
                                        >
                                            {isUpdating ? 
                                            <>
                                                Updating..
                                                <CircularProgress size={16} color='inherit' />
                                            </> : 'Update Resource'}
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setMode("view")}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                )}
                            </div>
                        }  
                    </Form>
                )}
             </Formik>
        </div>
    )
}