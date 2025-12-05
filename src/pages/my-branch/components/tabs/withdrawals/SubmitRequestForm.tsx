import FormikField from "@/components/FormikField";
import { UploadFileImage } from "@/components/Icons";
import { Form, Formik } from "formik";
import { Trash } from "iconsax-react";
import { useRef } from "react";

const initialValues = {
    source: "",
    amount: "",
    submittedBy: "",
    submittedOn: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    reason: "",
    customReason: "",
    document: ""
}

export default function SubmitRequestForm() {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (_values: any, _actions: any) => {

    }
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({
                values
            }) => {
                return (
                    <Form className="flex flex-col h-4/5 md:h-full overflow-hidden">
                        <div className="resources-modal-body">
                            <h5 className="text-lg font-medium text-aciu-border-grey">
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
                            <div className="flex gap-4 items-center">
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


                            <h5 className="text-lg font-medium text-aciu-border-grey">
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


                            <h5 className="text-lg font-medium text-aciu-border-grey">
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


                            <h5 className="text-lg font-medium text-aciu-border-grey">
                                Supporting Documents(if any)
                            </h5>
                            <div className="flex flex-col gap-2">
                                <label className="resources-form-label">
                                    Upload document
                                </label>
                                <div 
                                    className="cursor-pointer"
                                    onClick={() => inputRef.current?.click()}
                                >
                                    {!values.document ?
                                        <div className="gap-2 flex flex-col">
                                            <UploadFileImage width="100%" capHeight={76} height="auto" />
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
                            </div>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}