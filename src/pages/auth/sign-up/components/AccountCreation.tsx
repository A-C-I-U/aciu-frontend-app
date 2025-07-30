import FormikField from "@/components/FormikField";
import FormikPhoneInput from "@/components/FormikPhoneInput";
import { Box } from "@mui/material";

export default function AccountCreation() {
    return (
         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <FormikField
                label="Full Name"
                name="fullName"
                type="text"
                fullWidth
            />
            <FormikField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
            />
            <FormikPhoneInput
                label="Phone Number"
                name="phoneNumber"
            />
            <FormikField 
                label="Password"
                name="password"
                type="password"
                fullWidth
            />
        </Box>
    )
}