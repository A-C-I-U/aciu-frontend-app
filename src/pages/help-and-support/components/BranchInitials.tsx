import { Box, Typography } from "@mui/material";

export const BranchInitials = ({ branchName }: { branchName: string }) => {
    const nameParts = branchName.split(' ');
    let initials = '';

    for (let i = 0; i < nameParts.length; i++) {
        if (nameParts[i].length > 0 ) {
            initials += nameParts[i][0].toUpperCase();
        }
    }

    return (
        <Box
            display="flex"
            width="4.25rem"
            height="4.25rem"
            border="3px solid #00B686"
            bgcolor="#D9F7EA"
            alignItems="center"
            justifyContent="center"
            borderRadius="2.125rem"
        >
            <Typography
                fontFamily="'Coolvetica', sans-serif"
                fontWeight="bold"
                fontSize="1.5rem"
                lineHeight="1.5rem"
            >
                {initials}
            </Typography>
        </Box>
    )
}