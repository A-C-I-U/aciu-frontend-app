import type { ForgotPasswordValues } from "@/utils/types";
import EmailConfirmation from "../../sign-up/components/EmailConfirmation";
import CreatePassword from "./CreatePassword";
import ForgotPassword from "./ForgotPassword";
import KeyIcon from "/public/icons/key.svg";
import { type NavigateFunction } from "react-router-dom";

export default function StepRenderer({ step }: { step: number }) {
     switch (step) {
        case 0:
            return <ForgotPassword />;
        case 1:
            return <EmailConfirmation />;
        case 2:
            return <CreatePassword />;
        default:
            null;
    }
}


export const getForgotPasswordContent = (
        values: ForgotPasswordValues | null,
        navigate: NavigateFunction,
        handleNext: () => void, 
        handleSubmit: () => void, 
        handleGoBack: () => void
    ) =>
        [{
            header: "",
            subheader: "",
            optionalHeader: true,
            optionalCardHeader: (
                <div className="flex flex-col items-start gap-6">
                    <img 
                        src={KeyIcon}
                        alt="White colored key behind green background" 
                    />
                    <div className="flex flex-col gap-1">
                        <h1 className="text-aciu-border-grey font-bold text-2xl md:text-[2rem] leading-[120%]">
                            Forgot Password
                        </h1>
                        <p className="text-aciu-neutral text-xs md:text-base leading-[160%]">
                            No worries, we'll send you reset instructions
                        </p>
                    </div>
                </div>
            ),
            initialValues: { email: "" },
            footer: () => {
                return (
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-aciu-red font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async() => handleNext()
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
                        className="text-aciu-red font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async() => handleNext()
        },
            {
            header: "Create new password",
            subheader: "Create a secure password you’ll remember",
            initialValues: { password: "", confirmPassword: "" },
            footer: () => {
                return (
                    <button 
                        onClick={handleGoBack} 
                        className="text-aciu-red font-coolvetica"
                    >
                        Go back
                    </button>
                )
            },
            submit: async() => handleSubmit()
        },
    ]