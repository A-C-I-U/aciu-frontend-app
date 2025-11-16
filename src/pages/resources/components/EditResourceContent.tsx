import FormikField from "@/components/FormikField";
import { UploadFileImage } from "@/components/Icons";
import { TagInput } from "@/components/TagInput";
import { Divider } from "@mui/material";
import { Form, Formik } from "formik";
import { X } from "lucide-react";
import { useRef } from "react";
import { FilePreviewCard } from "./FilePreviewCard";
import { editResourceSchema } from "@/utils/schemas";

const initialValues = {
    name: "",
    description: "",
    accessLevel: [],
    doc: ""
}

export default function EditResourceContent({
    onClose,
    onSubmit
}: { onClose: () => void, onSubmit: () => void }) {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (_values: any, _actions: any) => {
        onSubmit()
        onClose()
    };

    return (
        <div className="resources-modal-section">
            <p className="resources-modal-title">
                Upload Material
            </p>
            <button
                onClick={onClose}
                className="resources-modal-close"
            > 
                <X width={24} height={24} color="#3E3E3E"/>
            </button>
            <Divider orientation="horizontal" flexItem />
            <Formik 
                initialValues={initialValues} 
                onSubmit={handleSubmit}
                validationSchema={editResourceSchema}
                validateOnMount
            >
                 {({
                    values,
                    errors,
                    setFieldValue,
                    isSubmitting,
                    isValid
                }) => {
                    console.log(errors, values)
                    return (
                        <Form className="w-full h-full relative flex flex-col justify-between">
                            <div className="resources-modal-body mb-4 no-scrollbar">
                                <FormikField
                                    label="File Name"
                                    name="name"
                                    placeholder="Input the file name"
                                    fullWidth
                                />
                                <FormikField
                                    label="File Description"
                                    name="description"
                                    placeholder="Provide an appropriate description"
                                    fullWidth
                                />
                                <div className="flex flex-col gap-2">
                                    <label className="resources-form-label">
                                        Access Level
                                    </label>
                                    <TagInput 
                                        name="accessLevel" 
                                        value={values.accessLevel}
                                        onChange={(newTags) => setFieldValue("accessLevel", newTags)}
                                        className="py-4"
                                        placeholder="Add access level(s)"
                                    />
                                </div>


                                <div className="flex flex-col gap-2">
                                    <label className="resources-form-label">
                                        Upload document
                                    </label>
                                    <div 
                                        className="cursor-pointer"
                                        onClick={() => inputRef.current?.click()}>
                                        {!values.doc ?
                                            <div className="gap-2 flex flex-col">
                                                <UploadFileImage width="100%" height="auto"/>
                                                <div className="flex justify-between items-center">
                                                    <p className="font-montserrat text-grayscale-100 text-sm">
                                                        Supported formats: pdf,docx,xml
                                                    </p>
                                                    <p className="font-montserrat text-grayscale-100 text-sm">
                                                        Max: 10mb
                                                    </p>
                                                </div>
                                            </div>
                                            :
                                            <div className="flex flex-col gap-[.625rem] items-center">
                                                <FilePreviewCard 
                                                    file={values.doc} 
                                                    width="w-65" 
                                                    height="h-full" 
                                                    className="!mt-0"
                                                />
                                                <div className="w-full self-end">
                                                    <p className="text-aciu-green-normal font-coolvetica text-xl">
                                                        Edit file
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept="application/pdf, application/vnd.ms-excel, .pdf, .xls, .xlsx"
                                        hidden
                                        onChange={(e) => setFieldValue("doc", e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>
                            <div className="py-5.5 px-10.5 resource-buttons-container">
                                <button
                                    className="btn btn-primary"
                                        type="submit"
                                        disabled={isSubmitting || !isValid}
                                    >
                                        Upload Resource
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={onClose}
                                    >
                                        Cancel
                                </button>
                            </div>
                        </Form>
                    )
                }}
                
            </Formik>
            
        </div>
    )
}