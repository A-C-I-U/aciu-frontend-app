import { MarkIcon } from "@/components/Icons";
import { Button } from "@mui/material";

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
        <div className="w-full h-full p-7.5 flex flex-col gap-5.5">
            <div className="flex flex-col items-start gap-6 w-full h-full">
                <MarkIcon />
                <div className="flex flex-col items-start gap-1.5">
                    <h1 className="font-coolvetica text-aciu-border-grey font-bold text-2xl">
                        {title}
                    </h1>
                    <p className="font-montserrat text-aciu-neutral font-normal">
                        {description}
                    </p>
                </div>
            </div>
            <Button
                sx={{
                    color: 'white',
                    fontSize: '.75rem',
                    backgroundColor: '#00B686',
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
                className="flex gap-2 items-center max-w-fit"
                onClick={onClose}
            >
                <span className="font-coolvetica text-base">
                    Go back to Projects
                </span>
            </Button>

        </div>
    )
}