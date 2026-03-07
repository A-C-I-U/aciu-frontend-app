import OtpInput from "@/components/OtpInput"
import { Box, CircularProgress } from "@mui/material"
import { RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react";
import { useResendOtp } from "@/services/mutations/auth";
import { enqueueSnackbar } from "notistack";

interface EmailConfirmationProps {
    email?: string;
    purpose?: "signup" | "password-reset";
}

export default function EmailConfirmation({ email, purpose }: EmailConfirmationProps) {
    const [resendTimer, setResendTimer] = useState(0);
    const RESEND_WAIT = 60;
    const { mutateAsync: resendOtp, isPending } = useResendOtp();

    useEffect(() => {
        if (resendTimer <= 0) return;

        const timer = setInterval(() => {
            setResendTimer((prev: number) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendTimer]);

    const handleResend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (resendTimer > 0 || !email || !purpose) return;

        try {
            await resendOtp({ email, purpose });
            enqueueSnackbar("OTP resent successfully", { variant: "success" });
            setResendTimer(RESEND_WAIT);
        } catch (error: any) {
            enqueueSnackbar("Failed to send OTP", { variant: "error" });
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <OtpInput name="verificationCode" />
            <div className="flex justify-between items-center">
                <p className="text-xs md:text-base font-medium text-aciu-dark-gray">
                    Didn't receive any OTP?
                </p>
                <button
                    type="button"
                    className={`flex gap-2 items-center text-aciu-red font-coolvetica ${resendTimer > 0 || isPending ? '!cursor-not-allowed' : ''
                        } text-xs md:text-base`}
                    onClick={handleResend}
                    disabled={resendTimer > 0 || isPending}
                >
                    {isPending ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        resendTimer <= 0 && <RefreshCcw size={20} />
                    )}
                    {resendTimer > 0 ? (
                        <span>
                            Resend in {Math.floor(resendTimer / 60)}:
                            {String(resendTimer % 60).padStart(2, '0')}
                        </span>
                    ) : (
                        <span>{isPending ? 'Resending...' : 'Resend'}</span>
                    )}
                </button>
            </div>
        </Box>
    )
}

