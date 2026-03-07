import AuthCard from "@/components/AuthCard";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';


interface SuccessPromptProps {
    onContactAdmin: () => void;
    onViewDetails: () => void;
}

export default function SuccessPrompt({ onContactAdmin, onViewDetails }: SuccessPromptProps) {
    const [loadingDetails, setLoadingDetails] = useState(false);

    const handleViewDetails = () => {
        setLoadingDetails(true);
        setTimeout(() => {
            onViewDetails();
            setLoadingDetails(false);
        }, 600);
    }

    return (
        <AuthCard
            optionalHeader={true}
            optionalCardHeader={
                <div className="flex flex-col items-center gap-6">
                    {/* Layered Orange Icon */}
                    <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-aciu-light-yellow">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-aciu-orange-100">
                            <CheckIcon sx={{ fontSize: 28, color: "white" }} />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 text-center">
                        <h1 className="font-coolvetica text-aciu-border-grey font-bold text-xl md:text-[1.5rem] leading-[115%]">
                            Your Membership is Pending Verification
                        </h1>
                        <p className="font-montserrat text-aciu-neutral font-normal text-[0.8rem] md:text-sm max-w-[95%] md:max-w-[90%] mx-auto">
                            Thank you for signing up. Your account details have been submitted and are now awaiting review by your branch representatives.
                        </p>
                    </div>
                </div>
            }
        >
            <div className="flex flex-col gap-6">
                {/* Action Buttons */}
                <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 w-full mt-2">
                    <Button
                        sx={{
                            color: 'white',
                            fontSize: '.875rem',
                            backgroundColor: '#00B686',
                            borderRadius: '.75rem',
                            padding: '1rem',
                            boxShadow: '0px 1px 2px 0px #0D0D120A',
                            textTransform: 'none',
                            width: '100%',
                            fontWeight: 700,
                            fontFamily: 'Coolvetica',
                            '&:hover': {
                                backgroundColor: '#00A479',
                            }
                        }}
                        onClick={onContactAdmin}
                    >
                        Contact Admin
                    </Button>

                    <Button
                        variant="outlined"
                        sx={{
                            color: '#00B686',
                            fontSize: '.875rem',
                            borderColor: '#00B686',
                            borderRadius: '.75rem',
                            padding: '1rem',
                            textTransform: 'none',
                            width: '100%',
                            fontWeight: 700,
                            fontFamily: 'Coolvetica',
                            borderWidth: '1.5px',
                            '&:hover': {
                                borderColor: '#00A479',
                                backgroundColor: 'rgba(0, 182, 134, 0.04)',
                                borderWidth: '1.5px'
                            }
                        }}
                        onClick={handleViewDetails}
                        disabled={loadingDetails}
                    >
                        {loadingDetails ? <CircularProgress size={20} color="inherit" /> : "View my Details"}
                    </Button>
                </div>

                {/* Divider and Alert Footer */}
                <div className="flex flex-col gap-6 md:gap-8">
                    <hr className="border-aciu-card-grey border-t w-full opacity-60 mt-1 md:mt-2" />
                    
                    <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-aciu-cyan-light border border-aciu-green-light rounded-2xl">
                        <div className="flex-shrink-0 bg-aciu-green-normal rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                            <span className="text-white font-bold text-[9px] md:text-[10px]">!</span>
                        </div>
                        <p className="font-montserrat text-aciu-border-grey text-[10px] md:text-sm font-medium leading-relaxed">
                            Until your account is verified, you won't be able to access payments, events, projects, or community features.
                        </p>
                    </div>
                </div>
            </div>
        </AuthCard>
    )
}