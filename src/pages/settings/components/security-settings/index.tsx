import CustomSwitch from "@/components/CustomSwitch";
import { Divider } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import ChangePassword from "./ChangePassword";
import { useState } from "react";
import { useUpdateSecurity } from "@/services/hooks/settings";
import { useUserSettings } from "@/services/hooks/settings";
import { enqueueSnackbar } from "notistack";

type MultiFactorType = {
    multiFactorAuth: boolean
}

export default function SecuritySettings() {
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const updateSecurityMutation = useUpdateSecurity();
    const { data: userSettings } = useUserSettings();

    const initialMfaState = userSettings?.security?.mfaEnabled || false;

    const handleSubmit = async (values: MultiFactorType, actions: FormikHelpers<MultiFactorType>) => {
        try {
            const payload = {
                mfaEnabled: values.multiFactorAuth
            };

            const result = await updateSecurityMutation.mutateAsync(payload);
            
            enqueueSnackbar(result.message || 'Security settings updated successfully', {
                variant: 'success',
            });
            
            actions.setSubmitting(false);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Failed to update security settings';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
            });
            
            actions.setSubmitting(false);
            
            actions.setFieldValue('multiFactorAuth', !values.multiFactorAuth);
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="lg:px-10 hidden lg:flex flex-col gap-2">
                <p className="lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                    Security Settings
                </p>
                <p className="text-sm lg:text-base">
                    Keep your account safe and secure.
                </p>
            </div>
            <Divider orientation="horizontal" flexItem className="hidden lg:block"/>
            <div className="flex flex-col gap-3 lg:px-10 py-4 lg:py-7">
                <div className="flex justify-between flex-col lg:flex-row gap-6 lg:gap-0">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm md:text-[1.125rem] text-aciu-border-grey">
                            Change Password
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                            Set a unique password to protect your account.
                        </p>
                    </div>
                    <button
                        className="rounded-xl p-4 border border-aciu-green-normal text-aciu-cyan-dark
                        font-clash-display bg-aciu-green-light text-sm font-medium max-w-fit
                        hover:bg-aciu-green-normal hover:text-white transition-colors"
                        onClick={() => setOpenChangePassword(true)}
                    >
                       Change Password
                    </button>
                </div>

                <div className="flex justify-between py-7">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm md:text-[1.125rem] text-aciu-border-grey">
                            Enable Multi Factor Authentication (MFA)
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                            Add an extra level of security to your account. 
                            An OTP would be sent to your email every time you want to access your account.
                        </p>
                    </div>
                    <Formik
                        initialValues={{ multiFactorAuth: initialMfaState }}
                        onSubmit={handleSubmit}
                        enableReinitialize
                    >
                        {({ values, setFieldValue, submitForm }) => (
                            <Form>
                                <div>
                                    <CustomSwitch 
                                        checked={values.multiFactorAuth}
                                        onChange={(fieldName, value) => {
                                            setFieldValue(fieldName, value);
                                            submitForm();
                                        }}
                                        fieldName="multiFactorAuth"
                                        sx={{
                                            width: "5rem",
                                            "& .MuiSwitch-switchBase": {
                                                transform: "translate(.275rem, -50%)",
                                                top: "50%",
                                            },
                                            "& .MuiSwitch-switchBase.Mui-checked": {
                                                color: "#fff",
                                                transform: "translate(1.875rem, -50%)",
                                            },
                                            "& .MuiSwitch-track": {
                                                height: "1.875rem",
                                                borderRadius: "99999px",
                                                backgroundColor: "#d1d5db",
                                                opacity: 1,
                                            },
                                            "& .MuiSwitch-thumb": {
                                                width: "1.625rem",
                                                height: "1.625rem",
                                            },
                                        }}
                                    />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>

                <Divider orientation="horizontal" className="text-aciu-white-dark" flexItem />
                <div className="flex justify-between flex-col gap-6 lg:flex-row lg:gap-0 py-4 lg:py-7">
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-sm md:text-[1.125rem] text-aciu-border-grey">
                            Deactivate account
                        </p>
                        <p className="text-xs leading-5 text-aciu-abriba">
                           All operations on this account will be discontinued.
                        </p>
                    </div>
                    <button
                        className="rounded-xl p-4 border border-red-50 max-w-fit
                        font-clash-display text-red-100 font-medium text-sm
                        hover:bg-red-50 hover:text-white transition-colors"
                    >
                       Deactivate Account
                    </button>
                </div>
            </div>

            <ChangePassword
                open={openChangePassword}
                onClose={() => setOpenChangePassword(false)}
            />
        </div>
    );
}