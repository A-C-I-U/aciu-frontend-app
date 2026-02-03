import FormikField from "@/components/FormikField";
import { ageGradeOptions, datePickerSx, formLabelSx } from "@/utils/data";
import { duesValidationSchema } from "@/utils/schemas";
import { FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDate } from "date-fns";
import dayjs from "dayjs";
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
            {({ values, setFieldValue }) => {
                return (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body flex-col gap-8 overflow-y-auto">
                            <div className="flex flex-col gap-4">
                                <p className="due-label">
                                    Dues Information
                                </p>
                                <FormikField
                                    label="Dues title"
                                    name="duesTitle"
                                    placeholder="Type in the dues title"
                                    fullWidth
                                />
                                <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
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
                                <p className="due-label">
                                    Payment Details
                                </p>
                                <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
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
                                <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
                                    <div className="flex flex-col gap-2 items-start w-full">
                                        <FormLabel
                                            sx={formLabelSx}
                                        >
                                            Start Date
                                        </FormLabel>
                                        <DatePicker
                                            name="startDate"
                                            value={values.startDate ? dayjs(values.startDate) : null}
                                            onChange={(newValue) => setFieldValue("startDate", newValue)}
                                            className="w-full h-unset py-2"
                                            sx={datePickerSx}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 items-start w-full">
                                        <FormLabel
                                            sx={formLabelSx}
                                        >
                                            End Date
                                        </FormLabel>
                                        <DatePicker
                                            name="endDate"
                                            value={values.endDate ? dayjs(values.endDate) : null}
                                            onChange={(newValue) => setFieldValue("endDate", newValue)}
                                            className="w-full h-unset py-2"
                                            sx={datePickerSx}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 mb-10">
                                <p className="due-label">
                                    Dues Rules
                                </p>
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
                                    options={[
                                        { value: "All Genders", label: "All Genders" },
                                        { value: "Male", label: "Male" },
                                        { value: "Female", label: "Female" }
                                    ]}
                                    select
                                    fullWidth
                                />
                                <FormikField
                                    name="location"
                                    label="Location"
                                    placeholder="Select the location to create dues for"
                                    options={[
                                        { value: "Nigeria", label: "Nigeria" },
                                        { value: "Abroad", label: "Abroad" }
                                    ]}
                                    select
                                    fullWidth
                                />
                               <FormikField
                                    name="memberRoles"
                                    label="Member Roles"
                                    placeholder="Select the member roles this payment applies to"
                                    options={[
                                        { value: "All Members", label: "All Members"},
                                        { value: "National Executives", label: "National Executives" },
                                        { value: "Branch Executives", label: "Branch Executives" },
                                        { value: "Regular Members", label: "Regular Members" },
                                    ]}
                                    select
                                    fullWidth
                                    multiple
                                />

                               <FormikField
                                    name="notifications"
                                    label="Notifications"
                                    placeholder="Select the timeline to run the reminder"
                                    options={[
                                        { value: "Yes - Every 7 days", label: "Yes - Every 7 days" },
                                        { value: "Yes - 3 days before deadline", label: "Yes - 3 days before deadline" },
                                        { value: "No - Manual reminders only", label: "No - Manual reminders only" }
                                    ]}
                                    select
                                    fullWidth
                                    multiple
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