import FormikField from "@/components/FormikField";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { useUser } from "@/context/UserContext";
import { useDuesDetails } from "@/services/hooks/dues";
import { useSaveNationalDues } from "@/services/mutations/nationaldues";
import type { CreateNationalDuesPayload } from "@/services/types/national-dues";
import { datePickerSx, dueAgeGradeOptions, formLabelSx } from "@/utils/data";
import { createNationalDuesSchema } from "@/utils/schemas";
import type { DialogFuncProps } from "@/utils/types";
import { CircularProgress, Divider, FormLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { formatDate } from "date-fns";
import dayjs from "dayjs";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SuccessDialog } from "@/components/SuccessDialog";
import { MarkIcon } from "@/components/Icons";

const initialValues: CreateNationalDuesPayload = {
  title: "",
  currency: "",
  amount: "",
  startDate: "",
  endDate: "",
  interval: "Yearly",
  ageGrades: [],
  gender: "All Genders",
  location: "Nigeria",
  memberRoles: [],
  notifications: [],
}

export default function NationalDuesForm({ 
    id, 
    open, 
    onClose,
    mode
}: DialogFuncProps & { 
    id?: string;
    mode: "create" | "edit";
}) {
    const [showSuccess, setShowSuccess] = useState(false);
    const [duesTitle, setDuesTitle] = useState("");
    const [successMode, setSuccessMode] = useState<"create" | "edit">("create");

    const navigate = useNavigate();
    const saveNationalDuesMutation = useSaveNationalDues();
    const { data: duesDetails } = useDuesDetails(mode === "edit" ? id! : "")
    const { user } = useUser();

    const initialFormikValues = duesDetails ? {
        title: duesDetails.title,
        currency: duesDetails.currency,
        amount: duesDetails.amount,
        startDate: duesDetails.startDate,
        endDate: duesDetails.endDate,
        interval: duesDetails.interval,
        ageGrades: duesDetails.ageGrades,
        gender: duesDetails.gender,
        location: duesDetails.location,
        memberRoles: duesDetails.memberRoles,
        notifications: duesDetails.notifications
    } : initialValues;

    const handleSubmit = async (values: CreateNationalDuesPayload, actions: any) => {     
        const payload = {
            title: values.title,
            currency: values.currency,
            amount: values.amount,
            startDate: new Date(values.startDate)?.toISOString(),
            endDate: new Date(values.endDate)?.toISOString(),
            interval: values.interval,
            ageGrades: values.ageGrades,
            gender: values.gender,
            location: values.location,
            memberRoles: values.memberRoles,
            notifications: values.notifications
        }
        setDuesTitle(values.title);
        setSuccessMode(mode)
        try {
            const result =
                mode === "edit"
                    ? await saveNationalDuesMutation.mutateAsync({ id, payload })
                    : await saveNationalDuesMutation.mutateAsync({ payload });
            enqueueSnackbar(result.message, { variant: "success" });
            actions.setSubmitting(false);
            onClose();
            setShowSuccess(true);
        } catch (error: any) {
            console.error("Create National Dues error:", error);
            enqueueSnackbar(error, { variant: 'error' })
        }
    }


    return (
        <>
            <ShellModal
                open={open}
                onClose={onClose}
            >
                <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                    <ShellHeader 
                        title={`${mode === "create" ? "Add National Dues" : "Edit National Dues" }`} 
                        onClose={onClose} 
                    />
                    <Divider className="flex shrink-0" />
                    <Formik
                        initialValues={initialFormikValues}
                        validationSchema={createNationalDuesSchema}
                        onSubmit={handleSubmit}
                        validateOnBlur
                        enableReinitialize
                    >
                        {({ isValid, isSubmitting, setFieldValue, values }) => {
                            return (
                                <Form className="flex flex-col h-full overflow-hidden">
                                    <div className="flex flex-col gap-8 resources-modal-body pb-8">
                                        <div className="flex flex-col gap-4">
                                            <p className="due-label">
                                                Dues Information
                                            </p>
                                            <FormikField
                                                label="Dues title"
                                                name="title"
                                                placeholder="Type in the dues title"
                                                fullWidth
                                            />
                                            <div className="flex flex-col lg:flex-row gap-4 w-full">
                                                <FormikField
                                                    label="Created By"
                                                    name="createdBy"
                                                    value={user?.name}
                                                    disabled
                                                    placeholder="Name of the creator"
                                                    fullWidth
                                                />
                                                <FormikField
                                                    label="Created On"
                                                    name="createdOn"
                                                    value={formatDate(new Date(), "dd MMMMMM yyyy")}
                                                    disabled
                                                    placeholder="Name of the creator"
                                                    fullWidth
                                                />
                                            </div>
                                            <FormikField
                                                label="Intervals"
                                                name="interval"
                                                placeholder="Select the interval type"
                                                options={[
                                                    { value: "One-time", label: "One-time" },
                                                    { value: "Monthly", label: "Monthly" },
                                                    { value: "Quarterly", label: "Quarterly" },
                                                    { value: "Yearly", label: "Yearly" },
                                                ]}
                                                fullWidth
                                                select
                                            />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <p className="due-label">
                                                Payment Details
                                            </p>
                                            <div className="flex flex-col lg:flex-row gap-4 w-full">
                                                <FormikField
                                                    label="Select Currency"
                                                    name="currency"
                                                    placeholder="Select Currency"
                                                    options={[
                                                        { value: "USD", label: "USD" },
                                                        { value: "NGN", label: "NGN"}
                                                    ]}
                                                    fullWidth
                                                    select
                                                />
                                                <FormikField
                                                    label="Amount"
                                                    name="amount"
                                                    placeholder="Type in the amount"
                                                    fullWidth
                                                />
                                            </div>
                                            <div className="flex flex-col lg:flex-row gap-4 w-full">
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

                                        <div className="flex flex-col gap-4">
                                            <p className="due-label">
                                                Dues Rules
                                            </p>

                                            <FormikField
                                                name="ageGrades"
                                                label="Age Grades"
                                                placeholder="Select age grades"
                                                options={dueAgeGradeOptions}
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
                                    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                                        <button disabled={!isValid || isSubmitting} className="btn btn-primary">
                                            {saveNationalDuesMutation.isPending ? (
                                                <>
                                                    <CircularProgress sx={{ color: "white" }} size={12} />
                                                    {mode === "edit" ? "Updating..." : "Creating..."}
                                                </>
                                            ) : (
                                                mode === "edit" ? "Update Dues" : "Create Dues"
                                            )}
                                        </button>
                                        <button className="btn btn-secondary" type="button" onClick={onClose}>
                                            Cancel
                                        </button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </ShellModal>
             <SuccessDialog
                key={duesTitle + successMode}
                open={showSuccess}
                onClose={() => setShowSuccess(false)}
                icon={<MarkIcon />}
                title={`Dues ${mode === "edit" ? "Updated" : "Created"} Successfuly`}
                message={`Your dues item “${duesTitle}” has been ${mode === "edit" ? "updated" : "created" } and is now active.`}
                primaryAction={{
                    label: "Go back to dashboard",
                    onClick: () => {
                        setShowSuccess(false);
                        navigate("/dashboard");
                    }}
                }
                secondaryAction={{
                    label: successMode === "edit" ? "Create Dues" : "Create Another Dues",
                    onClick: () => setShowSuccess(false),
                }}
            />
        </>
    )
}