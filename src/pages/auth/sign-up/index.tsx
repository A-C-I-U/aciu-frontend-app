// 




import AuthCard from "@/components/AuthCard";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import StepRenderer, { getSignUpContent } from "./components/StepRenderer";
import { Box, Button, CircularProgress } from "@mui/material";
import { signupValidationSchemas } from "@/utils/schemas";
import type { SignUpFormValues } from "@/utils/types";
import SuccessPrompt from "./components/SuccessPrompt";
import { enqueueSnackbar } from 'notistack';
import { useSignUp, useVerifyOtp, useSignUpComplete } from "@/services/mutations/auth";

const stepButtonTexts = ["Proceed", "Verify", "Complete Registration"];

export default function SignUpPage() {
    const [step, setStep] = useState(0);
    const [values, setValues] = useState<SignUpFormValues | null>(null);
    const [userId, setUserId] = useState<string | null>(null); // Store userId from step 0
    const [success, setSuccess] = useState(false);
    
    // Use the mutations
    const { mutateAsync: signUp, isPending: isSigningUp } = useSignUp();
    const { mutateAsync: verifyOtp, isPending: isVerifying } = useVerifyOtp();
    const { mutateAsync: signUpComplete, isPending: isCompleting } = useSignUpComplete();

    const handleGoBack = () => {
        setStep(step - 1);
    }

    const handleNext = () => {
        setStep(step + 1);
    }

    // Helper function to clean phone number
    const cleanPhoneNumber = (phone: string): string => {
        if (!phone) return '';
        return phone.replace(/\D/g, '');
    };

    // Handle OTP verification
    const handleVerifyOtp = async (otp: string) => {
        if (!values?.email) {
            enqueueSnackbar('Email not found', { variant: 'error' });
            return;
        }

        try {
            await verifyOtp({ 
                email: values.email, 
                otp 
            });
            
            enqueueSnackbar('OTP verified successfully!', {
                variant: 'success',
                autoHideDuration: 3000,
            });
            
            handleNext(); // Move to step 2
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 
                                'Invalid OTP. Please try again.';
            enqueueSnackbar(errorMessage, {
                variant: 'error',
                autoHideDuration: 5000,
            });
            throw error;
        }
    };

    // This function handles the step submissions
    const handleStepSubmit = async (formData: SignUpFormValues) => {
        if (step === 0) {
            // Step 0: Signup
            const cleanedPhone = cleanPhoneNumber(formData.phoneNumber || '');
            
            if (!cleanedPhone || cleanedPhone.length < 10) {
                enqueueSnackbar('Please enter a valid phone number', {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                throw new Error('Invalid phone number');
            }
            
            const signUpPayload = {
                fullName: formData.fullName || '',
                email: formData.email || '',
                password: formData.password || '',
                phone: cleanedPhone,
            };

            try {
                const result = await signUp(signUpPayload);
                
                // Store userId from response for step 2
                if (result.user?.id) {
                    setUserId(result.user.id);
                    console.log('User ID stored:', result.user.id);
                }
                
                enqueueSnackbar(result.message, {
                    variant: 'success',
                    autoHideDuration: 5000,
                });
                
                handleNext();
                
            } catch (error: any) {
                console.error('Signup error:', error);
                
                let errorMessage = 'Registration failed. Please try again.';
                
                if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                    
                    if (error.response.data.details && Array.isArray(error.response.data.details)) {
                        errorMessage += ': ' + error.response.data.details.join(', ');
                    }
                } else if (error.response?.data?.error) {
                    errorMessage = error.response.data.error;
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                
                throw error;
            }
        } else if (step === 1) {
            // Step 1: OTP Verification
            const otp = formData.verificationCode || '';
            if (otp.length === 6) {
                await handleVerifyOtp(otp);
            }
        } else if (step === 2) {
            // Step 2: Complete signup
            if (!userId) {
                enqueueSnackbar('User ID not found. Please restart registration.', {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                return;
            }

            // Prepare payload for complete signup
            const signUpCompletePayload = {
                userId: userId,
                gender: formData.gender || '',
                branch: formData.branch || '',
                branchLocation: formData.location || '', // Map 'location' to 'branchLocation'
                village: formData.village || '',
                ageGrade: formData.ageGrade || '',
                occupation: formData.occupation || '',
            };

            console.log('Sending complete signup payload:', signUpCompletePayload);

            try {
                const result = await signUpComplete(signUpCompletePayload);
                
                // Log the response to console
                console.log('Complete signup response:', result);
                
                // Show success message
                enqueueSnackbar('Registration completed successfully!', {
                    variant: 'success',
                    autoHideDuration: 5000,
                });
                
                setSuccess(true);
            } catch (error: any) {
                console.error('Complete signup error:', error);
                
                const errorMessage = error.response?.data?.message || 
                                    'Failed to complete registration. Please try again.';
                enqueueSnackbar(errorMessage, {
                    variant: 'error',
                    autoHideDuration: 5000,
                });
                throw error;
            }
        }
    };

    // Get step content
    const stepContent = getSignUpContent(values, handleNext, () => {
        console.log('Legacy handleSubmit called');
    }, handleGoBack);
   
    return (
        <>
            {success ? 
                <SuccessPrompt />
            :   
            <div className="flex flex-col gap-4 w-full">
                <AuthCard
                    header={stepContent[step].header}
                    subheader={stepContent[step].subheader}
                >
                    <Formik
                        validateOnMount={true}
                        initialValues={stepContent[step].initialValues}
                        enableReinitialize
                        validationSchema={signupValidationSchemas[step]}
                        onSubmit={async (formData, { setSubmitting }) => {
                            try {
                                const updatedValues = { ...values, ...formData };
                                setValues(updatedValues);
                                
                                await handleStepSubmit(updatedValues);
                            } catch (error) {
                                console.error('Step submission error caught:', error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting, isValid, values: currentStepValues }) => {
                            useEffect(() => {
                                const updatedValues = { ...values, ...currentStepValues };
                                setValues(updatedValues);
                            }, [currentStepValues]);

                            // Determine loading state based on step
                            let isLoading = isSubmitting;
                            if (step === 0) isLoading = isLoading || isSigningUp;
                            if (step === 1) isLoading = isLoading || isVerifying;
                            if (step === 2) isLoading = isLoading || isCompleting;

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
                                            disabled={isLoading || !isValid}
                                            type="submit"
                                        >
                                            <span className="font-coolvetica text-base">
                                                {stepButtonTexts[step]}
                                            </span>
                                            {isLoading &&
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