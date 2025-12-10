import { Link } from "react-router-dom";
import AccountCreation from "./AccountCreation";
import EmailConfirmation from "./EmailConfirmation";
import FurtherIdentification from "./FurtherIdentification";
import type { SignUpFormValues } from "@/utils/types";

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
        handleGoBack: () => void
    ) => [
        {
            header: "Create an account",
            subheader: "Enter your details to create an account",
            initialValues: { 
                fullName: "", 
                email: "", 
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
            submit: async () => handleNext()
        },
        {
            header: "Confirm email",
            subheader: (
                <span>
                    Please enter the 6 digit code we sent to 
                    <span className="font-semibold">
                        {values?.email}
                    </span>
                </span>
            ),
            initialValues: { verificationCode: "" },
            footer: () => {
                return (
                    <button 
                        onClick={handleGoBack} 
                        className="text-aciu-green-normal font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async() => handleNext()
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
                        onClick={handleGoBack} 
                        className="text-aciu-green-normal font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async() => handleSubmit()
        },
    ]