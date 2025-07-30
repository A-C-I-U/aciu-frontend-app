import AccountCreation from "./AccountCreation";
import EmailConfirmation from "./EmailConfirmation";
import FurtherIdentification from "./FurtherIdentification";

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