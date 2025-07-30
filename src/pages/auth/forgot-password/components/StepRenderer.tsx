import EmailConfirmation from "../../sign-up/components/EmailConfirmation";
import CreatePassword from "./CreatePassword";
import ForgotPassword from "./ForgotPassword";

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