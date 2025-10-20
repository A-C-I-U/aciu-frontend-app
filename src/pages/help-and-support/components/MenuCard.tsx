import type { MenuCardProps } from "@/utils/types";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function MenuCard({
    icon: Icon,
    title,
    description,
    route,
    onClick
}: MenuCardProps) {

    const content = (
        <Box
            borderRadius=".625rem"
            border="1px solid #EEEEEE"
            paddingY=".875rem"
            paddingX=".688rem"
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{
                minWidth: {
                    xs: "100%",
                    lg: "16.5rem"
                },
                height: "100%"
            }}
        >
            <Box
                px="7px"
                py="7px"
                width="fit-content"
                height="fit-content"
                bgcolor="#E6F8F3"
                borderRadius="5.65px"
                border="1px solid #EEEEEE"
            >
                <Icon size={20} color="#00B686" />
            </Box> 
            <p className="font-semibold font-montserrat leading-6"
            >
                {title}
            </p>
            <p className="text-sm leading-6 text-aciu-dark-grey-active">
                {description}
            </p>
        </Box>
    )

    if (!onClick) {
        return (
            <Link
                to={route} 
                style={{ 
                    textDecoration: 'none', 
                    color: 'inherit',
                    cursor: "pointer",
                    width: "100%"
                }}
                className="w-full h-full"
            >
                {content}
            </Link>
        )
    }
    return (
       <div 
            className="cursor-pointer" 
            onClick={() => onClick()}
        >
            {content}
        </div>
    )
}