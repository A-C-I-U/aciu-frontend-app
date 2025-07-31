import OtpInput from "@/components/OtpInput"
import { Box } from "@mui/material"
import { RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react";

export default function EmailConfirmation() {
    const [resendTimer, setResendTimer] = useState(0);
    const RESEND_WAIT = 120;

    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((prev: number) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleResend = () => {
        if (resendTimer > 0) return;

        setResendTimer(RESEND_WAIT);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <OtpInput name="verificationCode" />
            <div className="flex justify-between items-center">
                <p className="font-montserrat font-medium text-aciu-dark-gray">
                    Didn't receive any OTP?
                </p>
                <button 
                    className={`flex gap-2 items-center text-aciu-red font-coolvetica ${
                        resendTimer > 0 ? '!cursor-not-allowed' : ''
                    }`}
                    onClick={handleResend}
                    disabled={resendTimer > 0}
                >
                    {resendTimer <= 0 && <RefreshCcw size={20}/>}
                    {resendTimer > 0 ? (
                        <span>
                            Resend in {Math.floor(resendTimer / 60)}:
                             {String(resendTimer % 60).padStart(2, '0')}
                        </span>
                    ) : (
                        <span>Resend</span>
                    )}
                </button>
            </div>
        </Box>
    )
}

