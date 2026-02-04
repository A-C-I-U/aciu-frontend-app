import FormikField from "@/components/FormikField";
import { ageGradeOptions, datePickerSx, formLabelSx } from "@/utils/data";
import { duesValidationSchema } from "@/utils/schemas";
import { formatDate } from "date-fns";
import { Form, Formik } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormLabel, CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { useCreateBranchDues } from "@/services/mutations/members";

const initialValues = {
    duesTitle: "",
    createdBy: "ACIU Leadership",
    createdOn: formatDate(new Date().toISOString(), "dd MMMMMMM, yyyy"),
    interval: "",
    amount: "",
    startDate: null,
    endDate: null,
    ageGrades: [],
    gender: "",
    currency: "",
    location: "",
    memberRoles: [],
    notifications: []
}


export default function BranchDuesForm({ onClose, onSuccess }: { onClose: () => void, onSuccess: (values: any) => void }) {
    const { mutate: createDues, isPending } = useCreateBranchDues();

    const handleSubmit = (values: any) => {
        const payload = {
            title: values.duesTitle,
            currency: values.currency,
            amount: values.amount,
            startDate: values.startDate ? dayjs(values.startDate).toISOString() : "",
            endDate: values.endDate ? dayjs(values.endDate).toISOString() : "",
            interval: values.interval,
            notifications: values.notifications,
            ageGrades: values.ageGrades,
            location: values.location,
            gender: values.gender === "all-genders" ? "All Genders" : (values.gender === "male" ? "Male Only" : "Female Only"),
            memberRoles: Array.isArray(values.memberRoles) ? values.memberRoles : [values.memberRoles]
        };

        createDues(payload, {
            onSuccess: () => {
                onClose();
                onSuccess(values);
            }
        });
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={duesValidationSchema}
            validateOnBlur
        >
            {({ setFieldValue, values, isValid }) => {
                return (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body flex-col gap-8 overflow-y-auto">
                            <div className="flex flex-col gap-4">
                                <h5 className="text-base md:text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Dues Information
                                </h5>
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
                                <h5 className="text-base md:text-lg !font-montserrat font-medium text-aciu-border-grey">
                                    Payment Details
                                </h5>
                                <div className="flex flex-col gap-4 lg:gap-2 items-start w-full">
                                    <FormikField
                                        label="Currency"
                                        name="currency"
                                        placeholder="Select currency"
                                        options={[
                                            { value: "USD", label: "USD" },
                                            { value: "NGN", label: "NGN" },
                                            { value: "EUR", label: "EUR" },
                                            { value: "GBP", label: "GBP" },
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
                                <div className="flex flex-col gap-4 items-start w-full">
                                    <FormikField
                                        label="Interval"
                                        name="interval"
                                        placeholder="Select interval"
                                        options={[
                                            { value: "One time", label: "One time" },
                                            { value: "Monthly", label: "Monthly" },
                                            { value: "Quarterly", label: "Quarterly" },
                                            { value: "Yearly", label: "Yearly" }
                                        ]}
                                        select
                                        fullWidth
                                    />
                                </div>
                                <div className="flex flex-col lg:flex-row gap-4 w-full">
                                    <div className="flex flex-col gap-2 items-start w-full">
                                        <FormLabel sx={formLabelSx}>
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
                                        <FormLabel sx={formLabelSx}>
                                            End Date
                                        </FormLabel>
                                        <DatePicker
                                            name="endDate"
                                            value={values.endDate ? dayjs(values.endDate) : null}
                                            onChange={(newValue) => setFieldValue("endDate", newValue)}
                                            className="w-full h-unset py-2"
                                            sx={datePickerSx}
                                            minDate={values.startDate ? dayjs(values.startDate) : undefined}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-6 mb-10">
                                <h5 className="text-base md:text-lg !font-montserrat font-medium text-aciu-border-grey">
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
                                        { value: "female", label: "Female Only" }
                                    ]}
                                    fullWidth
                                />
                                <FormikField
                                    name="location"
                                    label="Location"
                                    placeholder="Select location"
                                    options={[
                                        { value: "Nigeria", label: "Nigeria" },
                                        { value: "Diaspora", label: "Diaspora" },
                                        { value: "Branch Only", label: "Branch Only" },
                                        { value: "Both Diaspora and Nigeria branches", label: "Both Diaspora and Nigeria branches" }
                                    ]}
                                    select
                                    fullWidth
                                />
                                <FormikField
                                    name="memberRoles"
                                    label="Member Roles"
                                    placeholder="Select the member roles"
                                    select
                                    options={[
                                        { value: "All Members", label: "All Members" },
                                        { value: "National Executives", label: "National Executives" },
                                        { value: "Branch Executives", label: "Branch Executives" },
                                        { value: "Regular Members", label: "Regular Members" }
                                    ]}
                                    fullWidth
                                    multiple
                                />

                                <FormikField
                                    name="notifications"
                                    label="Notifications"
                                    placeholder="Select notification rules"
                                    select
                                    multiple
                                    options={[
                                        { value: "Yes - Every 7 days", label: "Yes - Every 7 days" },
                                        { value: "Yes - 3 days before deadline", label: "Yes - 3 days before deadline" },
                                        { value: "No - Manual reminders only", label: "No - Manual reminders only" }
                                    ]}
                                    fullWidth
                                />
                            </div>


                        </div>
                        <div className="py-5.5 px-10.5 resource-buttons-container">
                            <button
                                className="btn btn-primary min-w-[150px]"
                                type="submit"
                                disabled={!isValid || isPending}
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <CircularProgress size={16} color="inherit" />
                                        <span>Creating...</span>
                                    </div>
                                ) : "Create Dues"}
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={onClose}
                                type="button"
                                disabled={isPending}
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