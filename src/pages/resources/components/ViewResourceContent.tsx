import FormikField from "@/components/FormikField";
import type { FileViewDrawerProps } from "@/utils/types";
import { Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { FilePreviewCard } from "./FilePreviewCard";
import { useState } from "react";
import { resourceDetail } from "@/utils/data";
import { editResourceSchema } from "@/utils/schemas";

interface ResourceContentProps extends FileViewDrawerProps {
    onSuccess: () => void
}


export default function ResourceContent({
    onClose, onSuccess
}: ResourceContentProps) {
    const [mode, setMode] = useState<"view" | "edit">("view");
    const { file, name, description } = resourceDetail;

    const initialValues = {
        fileName: name,
        fileDescription: description
    }

    const handleSubmit = (_values: any, _actions: any) => {
        // Update resource values here
        onSuccess()
    }
    
    return (
        <div className="resources-modal-section flex flex-col h-4/5 md:h-full overflow-hidden">

            <div className="relative flex items-center justify-between flex-shrink-0">
                <p className="resources-modal-title">
                    {mode === "view" ? "View resources" : "Edit resources"}
                </p>
                <button onClick={onClose} className="resources-modal-close">
                    <X width={24} height={24} color="#3E3E3E" />
                </button>
            </div>

            <Divider className="flex-shrink-0" />

            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={editResourceSchema}
                enableReinitialize
            >
                {({ isValid, submitForm }) => (
                    <div className="flex flex-col h-4/5 md:h-full overflow-hidden">
                        <Form className="resources-modal-body">
                            
                            <div className="w-full flex items-center justify-center pb-4.5">
                                <FilePreviewCard
                                    file={file}
                                    height="h-65"
                                    className="!mt-12"
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
                        </Form>

                        <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">

                            {mode === "view" ? (
                                <>
                                    <button
                                        className="btn btn-primary"
                                        type="button"
                                        onClick={() => setMode("edit")}
                                    >
                                        Edit Resource
                                    </button>

                                    <button className="btn btn-secondary" type="button">
                                        Archive Resource
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={submitForm}
                                        disabled={!isValid}
                                    >
                                        Update Resource
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setMode("view")}
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
             </Formik>

        </div>

    )
}