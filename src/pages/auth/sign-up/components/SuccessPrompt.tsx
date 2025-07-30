import AuthCard from "@/components/AuthCard";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MarkIcon from "/icons/mark-icon.png";

export default function SuccessPrompt() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const proceedToLogin = () => {
        setLoading(true);
        setTimeout(() => {
            navigate('/');
            setLoading(false);
        }, 800);
    }

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
                            Registration Complete!
                        </h1>
                        <p className="font-montserrat text-aciu-neutral font-normal">
                            Your account has been created. We’ll notify you once 
                            your membership is verified by your branch or admin.
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
                onClick={proceedToLogin}
            >
                <span className="font-coolvetica text-base">
                    Go to Dashboard
                </span>
                {loading &&
                    <span className="mt-1.5">
                        <CircularProgress
                            sx={{
                                color: "white",
                            }}
                            size={12} />
                    </span>
                }
            </Button>

        </AuthCard>
    )
}