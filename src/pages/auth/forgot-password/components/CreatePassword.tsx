import FormikField from "@/components/FormikField";
import { Box } from "@mui/material";

export default function CreatePassword() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <FormikField
                label="Create Password"
                name="password"
                type="text"
                fullWidth
            />
            <FormikField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
            />
        </Box>
    )
}