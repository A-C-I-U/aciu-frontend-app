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
    ageGrades: [],
    gender: "",
    currency: "",
    // Location is based on the current branch
    location: "Nigeria",
    memberRoles: "",
    notifications: []
}


export default function BranchDuesForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: (values: any) => void }) {

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
                onSuccess(values);
            }}
            validationSchema={duesValidationSchema}
            validateOnBlur
        >
            {() => {
                return (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body flex-col gap-8 overflow-y-auto">
                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Dues Information
                                </h5>
                                <FormikField
                                    label="Dues title"
                                    name="duesTitle"
                                    placeholder="Type in the dues title"
                                    fullWidth
                                />
                                <div className="flex gap-2 items-start w-full">
                                    <FormikField
                                        label="Created by"
                                        name="createdBy"
                                        disabled
                                        placeholder="Name of the creator"
                                        fullWidth
                                    />
                                    <FormikField
                                        label="Created on"
                                        name="createdOn"
                                        disabled
                                        placeholder="Date of creation"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h5 className="text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Payment Details
                                </h5>
                                <div className="flex gap-2 items-start w-full">
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
                                        placeholder="Type in the amount"
                                        fullWidth
                                    />
                                </div>
                                <div className="flex gap-2 items-start w-full">
                                    <FormikField
                                        label="Start Date"
                                        name="startDate"
                                        disabled
                                        placeholder="Select start date"
                                        fullWidth
                                    />
                                    <FormikField
                                        label="End Date"
                                        name="endDate"
                                        disabled
                                        placeholder="Select end date"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 mb-10">
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
                                    name="gender"
                                    label="Gender"
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
                                    fullWidth
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
                                    fullWidth
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
                                type="button"
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