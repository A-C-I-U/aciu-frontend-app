import FormikField from "@/components/FormikField";
import type { FileViewDrawerProps } from "@/utils/types";
import { Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { FilePreviewCard } from "./FilePreviewCard";

interface ViewResourceContentProps extends FileViewDrawerProps {
    onEdit: () => void
}

export default function ViewResourceContent({
    onEdit,
    onClose,
    file,
    name,
    description,
}: ViewResourceContentProps) {
    const initialValues = {
        fileName: name,
        fileDescription: description
    }
    
    return (
        <div className="resources-modal-section">
            <p className="resources-modal-title">
                View resources
            </p>
            <button
                onClick={onClose}
                className="resources-modal-close"
            > 
                <X width={24} height={24} color="#3E3E3E"/>
            </button>
            <div className="overflow-y-auto">
                <div className="w-full flex items-center justify-center px-5.5 pb-4.5">
                    <FilePreviewCard 
                        file={file} 
                        height="h-65"
                        className="!mt-12"
                    />
                </div>

                <Divider orientation="horizontal" className="mt-16 text-aciu-dashboard-background" flexItem />
                <Formik initialValues={initialValues} onSubmit={() => {}}>
                    <Form className="resources-modal-body no-scrollbar my-5 px-5.5">
                        <FormikField
                            label="File Name"
                            name="fileName"
                            placeholder={name}
                            disabled
                            fullWidth
                        />
                        <FormikField
                            label="File Description"
                            name="fileDescription"
                            placeholder={description}
                            disabled
                            fullWidth
                        />
                    </Form>
                </Formik>
            </div>
            
            <div className="px-5.5 mb-4 flex items-center gap-2">
                <button
                    className="btn btn-primary"
                    onClick={onEdit}
                    >
                        Edit Resource
                </button>
                <button
                    className="btn btn-secondary"
                    >
                        Archive Resource
                </button>
            </div>
        </div>
    )
}