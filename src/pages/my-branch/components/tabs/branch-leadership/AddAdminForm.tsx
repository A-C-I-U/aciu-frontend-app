import FormikField from "@/components/FormikField";
import { adminSchema } from "@/utils/schemas";
import { Checkbox, FormLabel, Autocomplete, TextField, CircularProgress, InputAdornment } from "@mui/material";
import { formatDate } from "date-fns";
import { Form, Formik, useField } from "formik";
import { TickSquare, SearchNormal1 } from "iconsax-react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { datePickerSx as baseDatePickerSx, formLabelSx } from "@/utils/data";
import { useState, useEffect } from "react";
import { useSearchMembers } from "@/services/hooks/branch";
import { useAssignExecutive } from "@/services/mutations/members";

const datePickerSx = {
    ...baseDatePickerSx,
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: '#00CA71',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#00CA71',
        },
    }
};

// createdBy - Name of Current User
const initialValues = {
    userId: "",
    fullName: "", // For display in search
    createdBy: "ACIU Leadership",
    createdOn: formatDate(new Date().toISOString(), "dd MMMMMMM, yyyy"),
    role: "",
    customRole: "",
    startDate: null,
    endDate: null,
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
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const { mutate: assignExecutive, isPending: isAssigning } = useAssignExecutive();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    const { data: searchResults, isLoading: isSearching } = useSearchMembers(debouncedSearch);

    const handleSubmit = (values: any, _actions: any) => {
        const permissionsMap: Record<string, string> = {
            viewProfiles: "VIEW_PROFILES",
            approveMembers: "APPROVE_MEMBERS",
            deleteMemberInfo: "DELETE_MEMBER_INFO",
            createEditDues: "CREATE_DUES",
            viewPayments: "VIEW_PAYMENTS",
            sendReminders: "SEND_REMINDERS",
            createEvents: "CREATE_EVENTS",
            approvePublications: "APPROVE_PUBLICATIONS"
        };

        const payload = {
            userId: values.userId,
            role: values.role || undefined,
            customRole: values.customRole || undefined,
            startDate: values.startDate ? dayjs(values.startDate).toISOString() : "",
            endDate: values.endDate ? dayjs(values.endDate).toISOString() : "",
            permissions: Object.entries(values.permissions)
                .map(([key, value]) => ({
                    type: permissionsMap[key],
                    allowed: value as boolean
                }))
                .filter(p => p.type) // Ensure we only send valid permission types
        };

        // Clean payload to send only 'role' or 'customRole'
        if (values.role) {
            delete (payload as any).customRole;
        } else if (values.customRole) {
            delete (payload as any).role;
        }

        assignExecutive(payload, {
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
            validationSchema={adminSchema}
        >
            {({ isValid, setFieldValue, values, touched, errors }) => {
                return (
                    <Form className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body">
                            <p className="text-lg font-medium text-aciu-border-grey">
                                Search Member
                            </p>
                            <div className="flex flex-col gap-2 items-start w-full mb-4">
                                <FormLabel sx={formLabelSx}>Member Name</FormLabel>
                                <Autocomplete
                                    fullWidth
                                    options={searchResults || []}
                                    popupIcon={null}
                                    getOptionLabel={(option) => option.fullName || ""}
                                    loading={isSearching}
                                    onInputChange={(_event, newInputValue) => {
                                        setSearchTerm(newInputValue);
                                    }}
                                    onChange={(_event, newValue) => {
                                        setFieldValue("userId", newValue?.id || "");
                                        setFieldValue("fullName", newValue?.fullName || "");
                                    }}
                                    renderOption={(props, option) => (
                                        <li {...props} key={option.id} className="p-3 border-b last:border-0 hover:bg-aciu-light-green/20">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-aciu-border-grey">{option.fullName}</span>
                                                <span className="text-xs text-gray-400">{option.email} • {option.phone}</span>
                                            </div>
                                        </li>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            placeholder="Type name, phone or email"
                                            error={touched.userId && !!errors.userId}
                                            helperText={touched.userId && errors.userId}
                                            slotProps={{
                                                input: {
                                                    ...params.InputProps,
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchNormal1 size={20} color="#737373" />
                                                        </InputAdornment>
                                                    ),
                                                    endAdornment: (
                                                        <>
                                                            {isSearching ? <CircularProgress color="inherit" size={20} /> : null}
                                                            {params.InputProps.endAdornment}
                                                        </>
                                                    ),
                                                }
                                            }}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    borderRadius: '.625rem',
                                                    '& fieldset': {
                                                        borderColor: '#DFE1E7',
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: '#00CA71',
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: '#00CA71',
                                                    },
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>

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
                                placeholder="Choose an executive role"
                                options={[
                                    { value: "Chairman", label: "Chairman" },
                                    { value: "President", label: "President" },
                                    { value: "Secretary", label: "Secretary" },
                                    { value: "Treasurer", label: "Treasurer" },
                                ]}
                                fullWidth
                                select
                                disabled={!!values.customRole}
                            />
                            <FormikField
                                label="Custom role"
                                name="customRole"
                                placeholder="Enter custom role name"
                                fullWidth
                                disabled={!!values.role}
                            />

                            <p className="text-lg font-medium text-aciu-border-grey">
                                Set Team Duration
                            </p>
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
                                className="btn btn-primary min-w-[150px]"
                                type="submit"
                                disabled={!isValid || isAssigning}
                            >
                                {isAssigning ? (
                                    <div className="flex items-center gap-2">
                                        <CircularProgress size={16} color="inherit" />
                                        <span>Assigning...</span>
                                    </div>
                                ) : "Assign Executive"}
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={onClose}
                                type="button"
                                disabled={isAssigning}
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


export function PermissionCheckbox({ name, label }: { name: string, label: string }) {
    const [field] = useField({ name, type: 'checkbox' });
    return (
        <div className="flex gap-2 items-center">
            <Checkbox
                {...field}
                checked={field.value}
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

            <div className="flex flex-wrap items-center gap-4 lg:gap-8.5">
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