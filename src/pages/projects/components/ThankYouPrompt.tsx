import AuthCard from "@/components/AuthCard";
import { Button } from "@mui/material";
import MarkIcon from "/icons/mark-icon.svg";

export default function ThankYouPrompt({
    title,
    description,
    onClose,
}: { 
    onClose: () => void,
    description: string,
    title: string
 }) {

    return (
        <AuthCard
            optionalHeader={true}
            optionalCardHeader={
                 <div className="flex flex-col items-center gap-6">
                    <img 
                        src={MarkIcon}
                        alt="Green colored background behind a white checkmark"
                    />
                    <div className="flex flex-col items-center gap-1.5">
                        <h1 className="font-coolvetica text-aciu-border-grey font-bold text-[2rem]">
                            {title}
                        </h1>
                        <p className="font-montserrat text-aciu-neutral font-normal">
                            {description}
                        </p>
                    </div>
                </div>
            }
        >
            <Button
                sx={{
                    color: 'white',
                    fontSize: '.75rem',
                    backgroundColor: '#00CA71',
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
                className="flex gap-2 items-center w-full"
                onClick={onClose}
            >
                <span className="font-coolvetica text-base">
                    Go back to Projects
                </span>
            </Button>

        </AuthCard>
    )
}