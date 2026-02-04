import FormikField from "@/components/FormikField";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { branchPresidentSchema } from "@/utils/schemas";
import type { DialogFuncProps } from "@/utils/types";
import { Divider, FormLabel } from "@mui/material";
import { Form, Formik } from "formik";
import { PermissionGroup } from "./PermissionGroup";
import { datePickerSx, formLabelSx } from "@/utils/data";
import dayjs from "dayjs";
import { formatDate } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { SuccessDialog } from "@/components/SuccessDialog";
import { MarkIcon } from "@/components/Icons";

const initialValues = {
    memberName: "",
    createdBy: "ACIU Leadership",
    createdOn: formatDate(new Date().toISOString(), "dd MMMMMMM, yyyy"),
    role: "Branch President",
    startDate: "",
    endDate: "",
    permissions: {
      viewProfiles: false,
      approveMembers: false,
      deleteMemberInfo: false,
      createEditDues: false,
      viewPayments: false,
      sendReminders: false,
      createEvents: false,
      approvePublications: false,
    },
}

// Add id to parameters and retrieve branch chairman details

export default function BranchPresidentForm({
    mode, open, onClose
}: DialogFuncProps & { id?: string; mode: "create" | "edit" }) {
    const [memberIdentity, setMemberIdentity] = useState<{ name: string } | null>(null);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [successMode, setSuccessMode] = useState<"create" | "edit">("create")

    const handleSubmit = (values: any, _actions: any) => {
        setIsSuccessOpen(true);
        setSuccessMode(mode);
        setMemberIdentity({
            name: values.name
        })
    }

    return (
        <>
            <ShellModal
                open={open}
                onClose={onClose}
            >
                <div className="resources-modal-section">
                    <ShellHeader title={`${mode === "create" ? "Assign Branch President" : "Change Branch Chairman"}`} onClose={onClose} />
                    <Divider className="flex shrink-0" />
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={branchPresidentSchema}
                    >
                        {({ values, setFieldValue, isValid, isSubmitting }) => {
                            return (
                                <Form className="flex flex-col h-full overflow-hidden">
                                    <div className="resources-modal-body">
                                        <p className="text-lg font-medium text-aciu-border-grey">
                                            Search Member
                                        </p>
                                        <FormikField
                                            label="Member Name"
                                            name="memberName"
                                            placeholder="Type name, phone or email"
                                            options={[
                                                { value: "dues", label: "Dues" }
                                            ]}
                                            select
                                            fullWidth
                                        />
                                        <div className="flex flex-col gap-4 lg:gap-2 items-center w-full">
                                            <FormikField
                                                label="Created By"
                                                name="createdBy"
                                                disabled
                                                fullWidth
                                            />
                                            <FormikField
                                                label="Created on"
                                                name="createdOn"
                                                disabled
                                                fullWidth
                                            />
                                        </div>


                                        <p className="text-lg font-medium text-aciu-border-grey">
                                            Assign Role
                                        </p>
                                        <FormikField 
                                            label="Role"
                                            name="role"
                                            fullWidth
                                            select
                                        />

                                        <p className="text-lg font-medium text-aciu-border-grey">
                                            Set Team Duration
                                        </p>
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
                                        <p className="text-lg font-medium text-aciu-border-grey">
                                            Assign Permissions
                                        </p>
                                        <div className="flex flex-col gap-6 mb-10">
                                            <PermissionGroup
                                                title="Member Access"
                                                permissions={[
                                                    { name: "permissions.viewProfiles", label: "View Profile" },
                                                    { name: "permissions.approveMembers", label: "Approve Members" },
                                                    { name: "permissions.deleteMemberInfo", label: "Delete Member Info" },
                                                ]}
                                            />
                                            <PermissionGroup
                                                title="Dues & Payments"
                                                permissions={[
                                                    { name: "permissions.createEditDues", label: "Create/Edit Dues" },
                                                    { name: "permissions.viewPayments", label: "View Payments" },
                                                    { name: "permissions.sendReminders", label: "Send Reminders" }
                                                ]}
                                            />
                                            <PermissionGroup
                                                title="Events & Communications"
                                                permissions={[
                                                    { name: "permissions.createEvents", label: "Create Events" },
                                                    { name: "permissions.approvePublications", label: "Approve Publications" }
                                                ]}
                                            />
                                        </div>
                                    </div>
                                    <div className="py-5.5 px-10.5 resource-buttons-container">
                                        <button 
                                            className="btn btn-primary"
                                            type="submit"
                                            disabled={!isValid || isSubmitting}
                                        >
                                            Assign President
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
                </div>
            </ShellModal>
            <SuccessDialog
                key={successMode}
                open={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
                icon={<MarkIcon />}
                title={`Branch President Successfully ${successMode === "edit" ? "Updated": "Assigned"}`}
                message={(
                    <><span className="font-medium capitalize">"{memberIdentity?.name ?? "User"}"</span> has been assigned the role of <span className="font-medium capitalize">"Branch President"</span></>
                )}
                primaryAction={{
                    label: "Return to the Leadership List",
                    onClick: () => setIsSuccessOpen(false)
                }}
            />
        </>
    )
}