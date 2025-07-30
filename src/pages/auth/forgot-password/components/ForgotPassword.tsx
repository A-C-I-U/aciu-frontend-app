import FormikField from "@/components/FormikField";
import { Box } from "@mui/material";

export default function ForgotPassword() {
    return (
        <Box>
            <FormikField
                label="Email Address"
                name="email"
                type="email"
                fullWidth
            />
        </Box>
    )
}