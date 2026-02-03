import FormikField from "@/components/FormikField";
import { UploadImageShort, UploadImageShortMobile } from "@/components/Icons";
import { withdrawalRequestSchema } from "@/utils/schemas";
import { formatDate } from "date-fns";
import { Form, Formik } from "formik";
import { useRef, useState } from "react";
import { ImageUploaded } from "../branch-gallery/ImageUploaded";

// submittedBy - Name of Current User
const initialValues = {
    source: "",
    amount: "",
    submittedBy: "ACIU Leadership",
    submittedOn: formatDate(new Date().toISOString(), "dd MMMMMMM, yyyy"),
    bankName: "",
    accountName: "",
    accountNumber: "",
    reason: "",
    customReason: "",
    document: null
}

export default function SubmitRequestForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [progress, setProgress] = useState(0);

    const handleSubmit = (_values: any, _actions: any) => {
        onSuccess();
    }

    const simulateUpload = () => {
        const interval = setInterval(() => {
            setProgress(prev => (prev >= 100 ? 100 : prev + 10));
        }, 300);

        setTimeout(() => {
            clearInterval(interval);
        }, 300 * 11);
    };


    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={withdrawalRequestSchema}
        >
            {({
                values,
                setFieldValue
            }) => {
                return (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body">
                            <p className="due-label">
                                Request Summary
                            </p>
                            <FormikField 
                                label="Withdrawal Source"
                                name="source"
                                placeholder="Select the source of this withdrawal"
                                options={[
                                    { value: "dues", label: "Dues" }
                                ]}
                                select
                                fullWidth
                            />
                            <FormikField
                                label="Amount"
                                name="amount"
                                placeholder="Input the amount you'd like to withdraw"
                                fullWidth
                            />
                            <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
                                <FormikField
                                    label="Submitted By"
                                    name="submittedBy"
                                    disabled
                                    fullWidth
                                />
                                <FormikField
                                    label="Submitted on"
                                    name="submittedOn"
                                    disabled
                                    fullWidth
                                />
                            </div>


                            <p className="due-label">
                                Bank Account Details
                            </p>
                            <FormikField 
                                label="Bank Name"
                                name="bankName"
                                placeholder="Select the bank name"
                                options={[
                                    { value: "first-bank", label: "First Bank" }
                                ]}
                                select
                                fullWidth
                            />
                            <FormikField 
                                label="Account Name"
                                name="accountName"
                                placeholder="Input the name of the account"
                                fullWidth
                            />
                            <FormikField
                                label="Account Number"
                                name="accountNumber"
                                placeholder="Input the account number"
                                fullWidth
                            />


                            <p className="due-label">
                                Request Reason
                            </p>
                            <FormikField 
                                label="Select a Reason"
                                name="reason"
                                placeholder="Reason"
                                options={[
                                    { value: "welfare", label: "Welfare" }
                                ]}
                                fullWidth
                                select
                            />
                            <FormikField 
                                label="Custom Reason"
                                name="customReason"
                                placeholder="Custom Reason"
                                fullWidth
                            />


                            <p className="due-label">
                                Supporting Documents(if any)
                            </p>
                            <div className="flex flex-col gap-2 mb-10">
                                <label className="resources-form-label">
                                    Upload document
                                </label>
                                <div 
                                    className="cursor-pointer"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    {!values.document ?
                                        <div className="gap-2 flex flex-col w-full">
                                            <div className="md:block hidden">
                                                <UploadImageShort width="100%" className="h-auto" />
                                            </div>

                                            <div className="md:hidden block">
                                                <UploadImageShortMobile width="100%" className="h-auto" />
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="font-montserrat text-grayscale-100 text-xs md:text-sm">
                                                    Supported formats: pdf, jpg, png
                                                </p>
                                                <p className="font-montserrat text-grayscale-100 text-xs md:text-sm">
                                                    Max: 10mb
                                                </p>
                                            </div>
                                        </div> :
                                       <ImageUploaded
                                            image={values.document}
                                            progress={progress}
                                            onDelete={() => setFieldValue("document", "")}
                                        />
                                    }
                                </div>
                                <input 
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        simulateUpload();
                                        setFieldValue("document", e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="py-5.5 px-10.5 resource-buttons-container">
                            <button 
                                className="btn btn-primary"
                                type="submit"
                            >
                                Send Request
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
    )
}