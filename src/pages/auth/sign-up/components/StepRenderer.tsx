import { Link } from "react-router-dom";
import AccountCreation from "./AccountCreation";
import EmailConfirmation from "./EmailConfirmation";
import FurtherIdentification from "./FurtherIdentification";
import type { SignUpFormValues } from "@/utils/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type {
    SignUpResponse, SignUpPayload,
    VerifyOtpResponse, VerifyOtpPayload,
    CompleteSignUpResponse, CompleteSignUpPayload
} from "@/services/types/auth";
import type { EnqueueSnackbar } from "notistack";
import { nigerianBranches, abroadBranches } from "@/utils/data";

export default function StepRenderer({ step }: { step: number }) {
    switch (step) {
        case 0:
            return <AccountCreation />;
        case 1:
            return <EmailConfirmation />;
        case 2:
            return <FurtherIdentification />;
        default:
            null;
    }
}

export const getSignUpContent = (
    values: SignUpFormValues | null,
    handleNext: () => void,
    handleSubmit: () => void,
    handleGoBack: () => void,
    signUpMutation: UseMutationResult<SignUpResponse, Error, SignUpPayload, unknown>,
    verifyOtpMutation: UseMutationResult<VerifyOtpResponse, Error, VerifyOtpPayload, unknown>,
    completeSignUpMutation: UseMutationResult<CompleteSignUpResponse, Error, CompleteSignUpPayload, unknown>,
    enqueueSnackbar: EnqueueSnackbar,
    setUserId: (id: string) => void
) => [
        {
            header: "Create an account",
            subheader: "Enter your details to create an account",
            initialValues: {
                fullName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: ""
            },
            footer: () => {
                return (
                    <p className="w-full flex gap-2 justify-center items-center font-coolvetica text-sm md:text-base text-aciu-grey">
                        Already have an account?
                        <Link to='/login' className="text-aciu-red">
                            Sign in
                        </Link>
                    </p>
                )
            },
            submit: async (formValues: SignUpFormValues) => {
                try {
                    const formattedPhone = (formValues.phoneNumber || "").replace(/\D/g, '');

                    const response = await signUpMutation.mutateAsync({
                        fullName: formValues.fullName || "",
                        email: formValues.email || "",
                        password: formValues.password || "",
                        phone: formattedPhone
                    });

                    if (response?.user?.id) {
                        setUserId(response.user.id);
                    }

                    handleNext();
                } catch (error: any) {
                    const message = error.response?.data?.details?.[0] || error.response?.data?.message || "Sign up failed";
                    enqueueSnackbar(message, { variant: "error" });
                }
            }
        },
        {
            header: "Confirm email",
            subheader: (
                <span>
                    Please enter the 6 digit code we sent to
                    <span className="font-semibold">
                        {" "}{values?.email}
                    </span>
                </span>
            ),
            initialValues: { verificationCode: "" },
            footer: () => {
                return (
                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="text-aciu-green-normal font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async (formValues: SignUpFormValues) => {
                try {
                    await verifyOtpMutation.mutateAsync({
                        email: values?.email || "",
                        otp: formValues.verificationCode || ""
                    });
                    enqueueSnackbar("OTP verified successfully", { variant: "success" });
                    handleNext();
                } catch (error: any) {
                    const message = error.response?.data?.details?.[0] || error.response?.data?.message || "OTP verification failed";
                    enqueueSnackbar(message, { variant: "error" });
                }
            }
        },
        {
            header: "You're almost there",
            subheader: "We need more identification to further identify you",
            initialValues: {
                gender: "",
                location: "",
                branch: "",
                village: "",
                ageGrade: "",
                occupation: ""
            },
            footer: () => {
                return (
                    <button
                        type="button"
                        onClick={handleGoBack}
                        className="text-aciu-green-normal font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async (formValues: SignUpFormValues, userId?: string) => {
                try {
                    let branchLocation = formValues.location;
                    if (branchLocation && branchLocation.toLowerCase() === 'nigeria') branchLocation = 'Nigeria';
                    if (branchLocation && branchLocation.toLowerCase() === 'abroad') branchLocation = 'Abroad';

                    const allBranches = [...nigerianBranches, ...abroadBranches];
                    const mappedBranch = allBranches.find(b => b.value === formValues.branch)?.label || formValues.branch;

                    await completeSignUpMutation.mutateAsync({
                        userId: userId,
                        gender: formValues.gender === 'man' ? 'Man' : formValues.gender === 'woman' ? 'Woman' : (formValues.gender || ""),
                        branch: mappedBranch || "",
                        branchLocation: branchLocation || "",
                        village: formValues.village === 'ameke' ? 'Ameke' : formValues.village === 'amogudu' ? 'Amogudu' : formValues.village === 'agboji' ? 'Agboji' : (formValues.village || ""),
                        ageGrade: formValues.ageGrade || "",
                        occupation: formValues.occupation || ""
                    });
                    handleSubmit();
                } catch (error: any) {
                    const message = error.response?.data?.details?.[0] || error.response?.data?.message || "Sign up completion failed";
                    enqueueSnackbar(message, { variant: "error" });
                }
            }
        },
    ]