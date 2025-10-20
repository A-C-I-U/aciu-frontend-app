import { Box, Typography } from "@mui/material"
import type { Icon } from "iconsax-react"

export const StatTag = ({ icon: Icon, stat }: { icon: Icon, stat: string}) => {
    return (
        <Box
            display="flex"
            gap=".625rem"
            alignItems="center"
            padding=".625rem 1rem"
            border="1px solid #EEEEEE"
            borderRadius=".625rem"
        >
            <Icon size={24} color="#00B686" />
            <Typography
                fontFamily="'Montserrat', sans-serif"
                lineHeight="120%"
                color="#737373"
            >
                {stat}
            </Typography>
        </Box>
    )
}