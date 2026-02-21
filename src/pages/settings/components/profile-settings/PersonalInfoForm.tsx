import FormikField from "@/components/FormikField";
import { useUserSettings } from "@/services/hooks/settings";
import { Skeleton } from "@mui/material";

export default function PersonalInfoForm({ allowEditContact = false }: { allowEditContact?: boolean }) {
    const { isLoading, error } = useUserSettings();

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="flex flex-col gap-2">
                        <Skeleton variant="text" width="40%" height={24} />
                        <Skeleton variant="rounded" width="100%" height={56} />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-8 text-red-500">
                Failed to load user settings. Please try again.
            </div>
        );
    }

    return (
        <>
            <FormikField
                label="Email Address"
                name="email"
                type="email"
                placeholder="princeugbuta@gmail.com"
                disabled
                fullWidth
            />

            <FormikField
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                disabled
                fullWidth
            />

            <FormikField
                label="Age Grade"
                name="ageGrade"
                placeholder="Please input your age grade here"
                disabled
                fullWidth
            />

            <FormikField
                label="Branch"
                name="branch"
                placeholder="Please input your current branch"
                disabled
                fullWidth
            />

            <FormikField
                label="Occupation"
                name="occupation"
                placeholder="Please input your occupation"
                disabled={!allowEditContact}
                fullWidth
            />

            <FormikField
                label="Phone Number"
                name="phoneNumber"
                placeholder="Please input your phone number"
                disabled={!allowEditContact}
                fullWidth
            />
        </>
    );
}