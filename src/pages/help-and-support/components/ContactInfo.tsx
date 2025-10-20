import { Box, Typography } from "@mui/material";

export default function ContactInfo() {
    return (
        <Box
            borderRadius=".625rem"
            py={{
                xs: "1.375rem",
                md: "3.3rem"
            }}
            px={{
                xs: ".875rem",
                md: "3rem"
            }}
            display="flex"
            flexDirection="column"
            bgcolor="#FBF4E1"
            gap="3rem"
        >
            <div className="flex flex-col gap-4">
                <Typography
                    sx={{
                        fontFamily: "'Montserrat', sans-serif",
                            fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        },
                        color: "#3E3E3E"
                    }}
                >
                    National Secretariat
                </Typography>
                <Typography 
                    sx={{
                        fontWeight: 600,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        }
                    }}>
                    ACIU Headquarters, Enachioken Road, Abiriba Abia State, Nigeria
                </Typography>
            </div>

            <div className="flex flex-col gap-4">
                <Typography
                    sx={{
                        fontFamily: "'Montserrat', sans-serif",
                            fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        },
                        color: "#3E3E3E"
                    }}
                >
                    Telephone
                </Typography>
                 <Typography 
                    sx={{
                        fontWeight: 600,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        }
                    }}>
                    +234 701 000 0000
                </Typography>
            </div>

            <div className="flex flex-col gap-4">
                <Typography
                    sx={{
                        fontFamily: "'Montserrat', sans-serif",
                            fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        },
                        color: "#3E3E3E"
                    }}
                >
                    Email
                </Typography>
                 <Typography 
                    sx={{
                        fontWeight: 600,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        }
                    }}
                >
                    info@aciuabiriba.org
                </Typography>
            </div>

            <div className="flex flex-col gap-4">
                <Typography
                    sx={{
                        fontFamily: "'Montserrat', sans-serif",
                            fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        },
                        color: "#3E3E3E"
                    }}
                >
                    Office Hours
                </Typography>
                <Typography 
                    sx={{
                        fontWeight: 600,
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: {
                            xs: "1rem",
                            lg: "1.25rem"
                        }
                    }}
                >
                    info@aciuabiriba.org
                </Typography>
            </div>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}
            >
                <p className="font-coolvetica text-gray-900 text-xl lg:text-2xl">
                    Our Social Media
                </p>
                <p className="font-coolvetica text-aciu-green-normal leading-8"
                >Facebook  <span className="text-gray-900">|</span>  Twitter  <span className="text-gray-900">|</span>  Whatsapp</p>
            </Box>
        </Box>
    )
}