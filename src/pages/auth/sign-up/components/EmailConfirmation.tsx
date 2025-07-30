import OtpInput from "@/components/OtpInput"
import { Box } from "@mui/material"
import { RefreshCcw } from "lucide-react"

export default function EmailConfirmation() {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <OtpInput name="verificationCode" />
            <div className="flex justify-between items-center">
                <p className="font-montserrat font-medium text-aciu-dark-gray">
                    Didn't receive any OTP?
                </p>
                <p className="flex gap-2 items-center text-aciu-red font-coolvetica">
                    <RefreshCcw size={20}/>
                    <span>Resend</span>
                </p>
            </div>
        </Box>
    )
}

