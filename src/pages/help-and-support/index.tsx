import { helpSupportMenu } from "@/utils/data";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import MenuCard from "./components/MenuCard";
import { useState } from "react";
import ContactUsForm from "./components/ContactUsForm";
import ContactInfo from "./components/ContactInfo";
import FAQSection from "./components/FaqSection";

const MotionBox = motion(Box)
export default function HelpAndSupportPage() {
    const [showBranchPopup, setShowBranchPopup] = useState(false);

    return (
        <AnimatePresence>
            <Box
                mt="1rem"
                marginBottom="6vw"
                display="flex"
                flexDirection="column"
                gap={6}
            >
                <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    borderRadius=".625rem"
                    bgcolor="#fff"
                    mx={5}
                    paddingX={4}
                    paddingY={6}
                    display="flex"
                    flexDirection="column"
                    gap={6}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 4,
                            maxWidth: {
                                sm: "100%",
                                lg: "70%"
                            }
                        }}
                       
                    >
                        <h2 
                            className="font-coolvetica font-bold text-aciu-border-grey text-[1.25rem] leading-[120%]"
                        >
                            Help & Support
                        </h2>
                        <p className="font-montserrat text-aciu-abriba leading-6">
                            From locating your branch to resolving account issues 
                            this is your central help desk. 
                            <span className="block"></span>
                            Explore common questions, get quick access, 
                            and stay connected no matter where you are in the world.
                        </p>
                    </Box>
                    <Box
                        display="flex"
                        gap="20px"
                        alignItems="center"
                        sx={{
                            flexDirection: {
                                xs: "column",
                                lg: "row"
                            }
                        }}
                    >
                        {helpSupportMenu && helpSupportMenu.map(({ 
                            icon, 
                            title, 
                            description, 
                            route, 
                            action
                        }) => (
                            <MenuCard
                                icon={icon}
                                title={title}
                                description={description}
                                route={route}
                                onClick={action ? () => setShowBranchPopup(true) : undefined}
                            />
                        ))}
                    </Box>
                </MotionBox>

                <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeInOut"}}
                    borderRadius=".625rem"
                    bgcolor="#fff"
                    mx={5}
                    paddingY="3rem"
                >
                    <FAQSection />
                </MotionBox>
                 <Box
                    display="grid"
                    gridTemplateColumns={{
                        xs: "1fr",
                        lg: "repeat(2, 1fr)"
                    }}
                    columnGap="20px"
                    rowGap="20px"
                    alignItems="stretch"
                    mx={5}
                >
                    <ContactUsForm />
                    <ContactInfo />
                </Box>
            </Box>
        </AnimatePresence>
    )
}