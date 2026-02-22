import AuthCard from "@/components/AuthCard";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import StepRenderer, { getForgotPasswordContent } from "./components/StepRenderer";
import { Box, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { forgotPasswordSchemas } from "@/utils/schemas";
import SuccessPrompt from "./components/SuccessPrompt";
import { useForgotPassword, useVerifyPasswordResetOtp, useResetPassword } from "@/services/mutations/auth";
import { enqueueSnackbar } from "notistack";
import type { ForgotPasswordValues } from "@/utils/types";


const stepButtonTexts = ["Reset Password", "Verify", "Create new password"];

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(0);
    const [values, setValues] = useState<ForgotPasswordValues | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const forgotPasswordMutation = useForgotPassword();
    const verifyOtpMutation = useVerifyPasswordResetOtp();
    const resetPasswordMutation = useResetPassword();

    const isLoading = forgotPasswordMutation.isPending || verifyOtpMutation.isPending || resetPasswordMutation.isPending;


    const handleGoBack = () => {
        setStep(step - 1);
    }

    const handleNext = () => {
        setStep(step + 1);
    }

    const handleSubmitComplete = () => {
        setSuccess(true);
    }

    const stepContent = getForgotPasswordContent(
        values,
        navigate,
        handleNext,
        handleSubmitComplete,
        handleGoBack,
        forgotPasswordMutation,
        verifyOtpMutation,
        resetPasswordMutation,
        enqueueSnackbar
    )

    return (
        <>
            {success ?
                <SuccessPrompt />
                :
                <div className="flex flex-col gap-4 w-full">
                    <AuthCard
                        header={stepContent[step].header}
                        subheader={stepContent[step].subheader}
                        optionalHeader={stepContent[step].optionalHeader}
                        optionalCardHeader={stepContent[step].optionalCardHeader}
                    >
                        <Formik
                            validateOnMount={true}
                            initialValues={stepContent[step].initialValues}
                            enableReinitialize
                            validationSchema={forgotPasswordSchemas[step]}
                            onSubmit={stepContent[step].submit}
                        >
                            {({ isSubmitting, isValid, values }) => {
                                useEffect(() => {
                                    setValues(values)
                                }, [values]);

                                return (
                                    <Form>
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                                            <StepRenderer step={step} />
                                            <Button
                                                sx={{
                                                    color: 'white',
                                                    fontSize: '.75rem',
                                                    backgroundColor: !isValid ? '#ccc' : '#00B686',
                                                    borderRadius: '.75rem',
                                                    padding: '1rem',
                                                    boxShadow: '0px 1px 2px 0px #0D0D120A',
                                                    textTransform: 'none',
                                                    '&.Mui-disabled': {
                                                        backgroundColor: '#e0e0e0',
                                                        color: '#9e9e9e',
                                                        opacity: 0.6,
                                                    }
                                                }}
                                                className="flex gap-2 items-center"
                                                disabled={isSubmitting || !isValid}
                                                type="submit"
                                            >
                                                <span className="font-coolvetica text-base">
                                                    {stepButtonTexts[step]}
                                                </span>
                                                {(isSubmitting || isLoading) &&
                                                    <span className="mt-1.5">
                                                        <CircularProgress
                                                            sx={{
                                                                color: "white",
                                                            }}
                                                            size={12} />
                                                    </span>
                                                }
                                            </Button>
                                        </Box>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </AuthCard>
                    <div className="mx-auto w-full text-center">
                        {stepContent[step].footer && stepContent[step].footer()}
                    </div>
                </div>
            }
        </>
    )
}