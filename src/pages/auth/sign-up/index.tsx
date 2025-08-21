import AuthCard from "@/components/AuthCard";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import StepRenderer, { getSignUpContent } from "./components/StepRenderer";
import { Box, Button, CircularProgress } from "@mui/material";
import { signupValidationSchemas } from "@/utils/schemas";
import type { SignUpFormValues } from "@/utils/types";
import SuccessPrompt from "./components/SuccessPrompt";

const stepButtonTexts = ["Proceed", "Verify", "Complete Registration"];

export default function SignUpPage() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState<SignUpFormValues | null>(null);
    const [success, setSuccess] = useState(false);

    const handleGoBack = () => {
        setStep(step - 1);
    }

    const handleNext = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(step + 1);
        }, 800)
    }

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 800);
    }

    const stepContent = getSignUpContent(values, handleNext, handleSubmit, handleGoBack);
   


    return (
        <>
            {success ? 
                <SuccessPrompt />
            :   
            <div className="flex flex-col gap-4">
                <AuthCard
                    header={stepContent[step].header}
                    subheader={stepContent[step].subheader}
                >
                    <Formik
                        validateOnMount={true}
                        initialValues={stepContent[step].initialValues}
                        enableReinitialize
                        validationSchema={signupValidationSchemas[step]}
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
                                                backgroundColor: !isValid ? '#ccc' : '#00CA71',
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
                                            {(isSubmitting || loading) &&
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