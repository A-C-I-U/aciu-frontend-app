import type { DialogFuncProps, ProfileFormValues } from "@/utils/types";
import { CircularProgress, Dialog, Skeleton } from "@mui/material";
import PersonalInfoForm from "./PersonalInfoForm";
import { Form, Formik } from "formik";
import { profileValidationSchema } from "@/utils/schemas";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useUserSettings, useUpdateProfile } from "@/services/hooks/settings";
import { enqueueSnackbar } from "notistack";

const transformFormToPayload = (values: ProfileFormValues) => ({
  occupation: values.occupation,
  phone: values.phoneNumber,
});

const mapSettingsToFormValues = (settings: any): ProfileFormValues => ({
  email: settings?.profile.email || '',
  name: settings?.profile.fullName || '',
  ageGrade: settings?.profile.ageGrade || '',
  branch: settings?.profile.branch || '',
  occupation: settings?.profile.occupation || '',
  phoneNumber: settings?.profile.phoneNumber || '',
});

export default function PersonalInfoModal({
    open,
    onClose,
    initialValues
}: DialogFuncProps & { initialValues?: ProfileFormValues }) {
    const { data: userSettings, isLoading, error } = useUserSettings();
    const updateProfileMutation = useUpdateProfile();    
    
    const formInitialValues = initialValues || mapSettingsToFormValues(userSettings);

    const handleSubmit = async (values: ProfileFormValues, actions: any) => {
        try {
            const payload = transformFormToPayload(values);
            const result = await updateProfileMutation.mutateAsync(payload);
            
            enqueueSnackbar(result.message || 'Profile updated successfully', {
                variant: 'success',
            });
            
            actions.setSubmitting(false);
            onClose(); 
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update profile';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
            
            actions.setSubmitting(false);
        }
    }

    useEffect(() => {
        const scrollContainer = document.querySelector<HTMLElement>('main');
        if (!scrollContainer) return;

        scrollContainer.style.overflow = open ? "hidden" : "";
        return () => {
            scrollContainer.style.overflow = "";
        };
    }, [open]);

    if (isLoading && !initialValues) {
        return (
            <Dialog open={open} onClose={onClose}>
                <div className="relative flex flex-col gap-8 h-4/5 w-full bg-white rounded-lg overflow-hidden">
                    <div className="flex justify-between items-center px-6 pt-5 lg:px-20 lg:pt-10.5">
                        <Skeleton variant="text" width={200} height={32} />
                    </div>
                    <div className="flex-1 overflow-y-auto px-6 lg:px-20 pb-10">
                        <div className="flex flex-col gap-10">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <Skeleton variant="text" width="40%" height={24} />
                                    <Skeleton variant="rounded" width="100%" height={56} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="w-full px-6 lg:px-20 pb-6">
                        <Skeleton variant="rounded" width="100%" height={56} />
                    </div>
                </div>
            </Dialog>
        );
    }

    if (error && !initialValues) {
        return (
            <Dialog open={open} onClose={onClose}>
                <div className="p-8 text-center">
                    <div className="text-red-500 mb-4">
                        Failed to load user settings
                    </div>
                    <button 
                        onClick={onClose}
                        className="bg-aciu-green-normal rounded-xl p-4 font-coolvetica text-white"
                    >
                        Close
                    </button>
                </div>
            </Dialog>
        );
    }

    return (
        <Dialog
            onClose={(_event, reason) => {
                if (reason !== 'backdropClick' && !updateProfileMutation.isPending) {
                    onClose()
                }
            }}
            open={open}
            disableScrollLock={false}
            sx={{
                "& .MuiDialog-paper": {
                    overflow: "hidden",
                    width: {
                        xs: "92%",
                        md: "38.25rem",
                    },
                    margin: "0 auto",
                    position: "relative"
                },
            }}
        >
            <Formik
                initialValues={formInitialValues}
                validationSchema={profileValidationSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ isSubmitting, isValid, dirty }) => (
                    <div className="relative flex flex-col gap-8 h-4/5 w-full bg-white rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center px-6 pt-5 lg:px-20 lg:pt-10.5">
                            <h3 className="text-xl md:text-2xl text-aciu-dark">Edit Personal Info</h3>
                        </div>
                        <button 
                            className="absolute top-5 lg:top-7.5 right-8" 
                            onClick={onClose}
                            disabled={updateProfileMutation.isPending}
                        >
                            <X size={24} color="#3E3E3E" />
                        </button>
                        <div className="flex-1 overflow-y-auto px-6 lg:px-20 pb-10">
                            <Form className="flex flex-col gap-10">
                                <PersonalInfoForm />
                            </Form>
                        </div>

                        <div className="w-full px-6 lg:px-20 pb-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid || !dirty || updateProfileMutation.isPending}
                                className="bg-aciu-green-normal rounded-xl p-4 font-coolvetica text-white w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                            {updateProfileMutation.isPending ? (
                                <>
                                    <CircularProgress size={12} className="mr-2" />
                                    Saving...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                            </button>
                        </div>
                    </div>
                )}
            </Formik>
        </Dialog>
    );
}