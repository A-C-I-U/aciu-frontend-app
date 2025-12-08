import FormikField from "@/components/FormikField";
import { adminSchema } from "@/utils/schemas";
import { Checkbox } from "@mui/material";
import { formatDate } from "date-fns";
import { Form, Formik } from "formik";
import { TickSquare } from "iconsax-react";

// createdBy - Name of Current User
const initialValues = {
    memberName: "",
    createdBy: "ACIU Leadership",
    createdOn: formatDate(new Date().toISOString(), "dd MMMMMMM, yyyy"),
    role: "", // Executive role - Chairman, Secretary
    customRole: "",
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
export default function AddAdminForm({
    onClose, onSuccess
}: { onClose: () => void, onSuccess: (values: any) => void }) {

    const handleSubmit = (values: any, _actions: any) => {
        onSuccess(values);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={adminSchema}
        >
            {({ isValid, isSubmitting }) => {
                return (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body">
                            <p className="text-lg font-medium text-aciu-border-grey">
                                Select Member
                            </p>
                            <FormikField
                                label="Member Name"
                                name="memberName"
                                placeholder="Select member"
                                options={[
                                    { value: "dues", label: "Dues" }
                                ]}
                                select
                                fullWidth
                            />
                            <div className="flex gap-2 items-center w-full">
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
                                placeholder="Choose an executive role"
                                options={[
                                    { value: "secretary", label: "Secretary" }
                                ]}
                                fullWidth
                                select
                            />
                            <FormikField 
                                label="Custom role"
                                name="customRole"
                                placeholder="Enter custom role name"
                                fullWidth
                            />

                            <p className="text-lg font-medium text-aciu-border-grey">
                                Set Team Duration
                            </p>
                            {/* Add Calendar here */}

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
                                Assign Executive
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


export function PermissionCheckbox({ name, label }: { name: string, label: string}) {
  return (
    <div className="flex gap-2 items-center">
        <Checkbox
            name={name}
            icon={<TickSquare size={24} color="#737373" />}
            checkedIcon={<TickSquare size={24} color="#00B686" variant="Bold" />}
            sx={{
                padding: 0
            }}
        />
        <p className="leading-[100%] text-sm text-aciu-border-grey">
            {label}
        </p>
    </div>
  );
}

export function PermissionGroup({ title, permissions }: {
    title: string,
    permissions: { name: string, label: string }[]
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <TickSquare size={24} color="#737373" />
                <p className="leading-[100%] text-sm font-semibold text-aciu-border-grey">
                    {title}
                </p>
            </div>

            <div className="flex items-center gap-8.5">
                {permissions.map((perm) => (
                    <PermissionCheckbox
                        key={perm.name}
                        name={perm.name}
                        label={perm.label}
                    />
                ))}
            </div>
        </div>
    );
}