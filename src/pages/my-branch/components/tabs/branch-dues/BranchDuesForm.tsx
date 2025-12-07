import FormikField from "@/components/FormikField";
import { ageGradeOptions } from "@/utils/data";
import { duesValidationSchema } from "@/utils/schemas";
import { formatDate } from "date-fns";
import { Form, Formik } from "formik";

const initialValues = {
    duesTitle: "",
    createdBy: "ACIU Leadership",
    createdOn: formatDate(new Date().toISOString(), "dd MMMMMMM, yyyy"),
    interval: "",
    amount: "",
    startDate: "",
    endDate: "",
    ageGrades: [""],
    gender: "",
    location: "",
    memberRoles: "",
    notifications: [""]
}


export default function BranchDuesForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: () => void }) {
    const handleSubmit = (_values: any, _actions: any) => {
        onSuccess();
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={duesValidationSchema}
        >
            {() => {
                return (
                    <Form className="flex flex-col h-4/5 md:h-full overflow-hidden">
                        <div className="resources-modal-body flex-col gap-8">
                            <div className="flex flex-col gap-6">
                                <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Dues Information
                                </h5>
                                <FormikField
                                    label="Dues title is required"
                                    name="duesTitle"
                                    placeholder="Type in the dues title"
                                    fullWidth
                                />
                                <div className="flex gap-2 items-start">
                                    <FormikField
                                        label="Created by"
                                        name="createdBy"
                                        disabled
                                        placeholder="Name of the creator"
                                    />
                                    <FormikField
                                        label="Created on"
                                        name="createdOn"
                                        disabled
                                        placeholder="Date of creation"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Payment Details
                                </h5>
                                <div className="flex gap-2 items-start">
                                    <FormikField
                                        label="Currency"
                                        name="currency"
                                        placeholder="Select currency"
                                        options={[
                                            { value: "dollar", label: "Dollar" },
                                            { value: "naira", label: "Naira" }
                                        ]}
                                        select
                                        fullWidth
                                    />
                                    <FormikField
                                        label="Amount"
                                        name="amount"
                                        disabled
                                        placeholder="Date of creation"
                                    />
                                </div>
                                <div className="flex gap-2 items-start">
                                    <FormikField
                                        label="Start Date"
                                        name="startDate"
                                        disabled
                                        placeholder="Select start date"
                                    />
                                    <FormikField
                                        label="End Date"
                                        name="endDate"
                                        disabled
                                        placeholder="Select end date"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Dues Rules
                                </h5>
                                <FormikField
                                    name="ageGrades"
                                    label="Age Grades"
                                    placeholder="Select age grades"
                                    options={ageGradeOptions}
                                    select
                                    fullWidth
                                    multiple
                                />
                                <FormikField
                                    name="Gender"
                                    label="gender"
                                    placeholder="Select gender"
                                    select
                                    options={[
                                        { value: "all-genders", label: "All Genders" },
                                        { value: "male", label: "Male Only" },
                                        { value: "female", label: "Female Only"}
                                    ]}
                                    fullWidth
                                />
                                <FormikField
                                    name="location"
                                    label="Location"
                                    placeholder="Input location"
                                    disabled
                                    fullWidth
                                />
                                <FormikField
                                    name="memberRoles"
                                    label="Member Roles"
                                    placeholder="Select the member roles"
                                    select
                                    options={[
                                        { value: "all-members", label: "All Members" },
                                        { value: "national-executives", label: "National Executives" },
                                        { value: "branch-executives", label: "Branch Executives" },
                                        { value: "regular-members", label: "Regular Members" }
                                    ]}
                                />

                                <FormikField
                                    name="notifications"
                                    label="Notifications"
                                    placeholder="Select notification rules"
                                    select
                                    multiple
                                    options={[
                                        { value: "days-7", label: "Yes – Every 7 days" },
                                        { value: "days-3", label: "Yes - 3 days before deadline" },
                                        { value: "manual", label: "No - Manual reminders only"}
                                    ]}
                                />
                            </div>
                           

                        </div>
                        <div className="py-5.5 px-10.5 resource-buttons-container">
                            <button 
                                className="btn btn-primary"
                                type="submit"
                            >
                                Create Dues
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