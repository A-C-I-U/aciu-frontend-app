import FormikField from "@/components/FormikField";
import { UploadImageShort } from "@/components/Icons";
import { withdrawalRequestSchema } from "@/utils/schemas";
import { formatDate } from "date-fns";
import { Form, Formik } from "formik";
import { Trash } from "iconsax-react";
import { useRef } from "react";

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
    document: ""
}

export default function SubmitRequestForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (_values: any, _actions: any) => {
        onSuccess();
    }

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
                            <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                Request Summary
                            </h5>
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
                            <div className="flex gap-2 items-start w-full">
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


                            <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                Bank Account Details
                            </h5>
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


                            <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                Request Reason
                            </h5>
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


                            <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                Supporting Documents(if any)
                            </h5>
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
                                            <UploadImageShort width="100%" height="auto" />
                                            <div className="flex justify-between items-center">
                                                <p className="font-montserrat text-grayscale-100 text-sm">
                                                    Supported formats: pdf, jpg, png
                                                </p>
                                                <p className="font-montserrat text-grayscale-100 text-sm">
                                                    Max: 10mb
                                                </p>
                                            </div>
                                        </div> :
                                        <div className="border border-aciu-dashboard-background py-2 px-2.25">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <div className="border border-aciu-dashboard-background h-auto">
                                                        <p className="text-center">
                                                            File
                                                        </p>
                                                    </div>
                                                    <div className="flex flex-col gap-3 text-aciu-border-grey">
                                                        <p title={values.document} className="text-sm font-semibold truncate max-w-40 line-height-120">
                                                            {values.document}
                                                        </p>
                                                        <p className="text-xs font-medium line-height-120"></p>
                                                    </div>
                                                </div>
                                                <Trash width={20} height={20} color="#737373" />
                                            </div>
                                        </div>
                                    }
                                </div>
                                <input 
                                    ref={inputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFieldValue("document", e.target.value)}
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