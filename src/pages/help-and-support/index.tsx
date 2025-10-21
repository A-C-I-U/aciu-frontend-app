import { helpSupportMenu } from "@/utils/data";
import { Box } from "@mui/material";
import { AnimatePresence, motion } from "motion/react";
import MenuCard from "./components/MenuCard";
import { useState } from "react";
import ContactUsForm from "./components/ContactUsForm";
import ContactInfo from "./components/ContactInfo";
import FAQSection from "./components/FaqSection";
import LocateBranch from "./components/LocateBranch";
import BranchSupportPage from "./components/BranchSupportPage";

const MotionBox = motion.create(Box)
export default function HelpAndSupportPage() {
    const [showBranchPopup, setShowBranchPopup] = useState(false);
    const [page, setPage] = useState<"index" | "branch-support">("index");

    return (
        <AnimatePresence>
            <div className="mt-4 mb-[6vw] flex flex-col gap-12">
                {page === "index" &&
                    <>
                        <MotionBox
                            key="index"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            borderRadius=".625rem"
                            bgcolor="#fff"
                            mx="1.25rem"
                            paddingX={{
                                xs: ".5rem",
                                md: 2
                            }}
                            paddingY="1.5rem"
                            display="flex"
                            flexDirection="column"
                            gap={6}
                        >

                            {/* Intro Section */}
                            <div className="flex flex-col gap-4 w-full lg:w-[70%]">
                                <h2 
                                    className="font-coolvetica font-bold text-aciu-border-grey text-xl line-height-120"
                                >
                                    Help & Support
                                </h2>
                                <p className="text-aciu-abriba leading-6">
                                    From locating your branch to resolving account issues 
                                    this is your central help desk. 
                                    <span className="block"></span>
                                    Explore common questions, get quick access, 
                                    and stay connected no matter where you are in the world.
                                </p>
                            </div>


                            {/* Help and Support Grid */}
                            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch">
                                {helpSupportMenu && helpSupportMenu.map(({ 
                                    icon, 
                                    title, 
                                    description, 
                                    route, 
                                    action
                                }, index) => (
                                    <MenuCard
                                        key={index}
                                        icon={icon}
                                        title={title}
                                        description={description}
                                        route={route}
                                        onClick={action ? () => {setShowBranchPopup(true)} : undefined}
                                    />
                                ))}
                            </div>
                        </MotionBox>


                        {/* FAQ Section */}
                        <MotionBox
                            key="faq-section"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.4, ease: "easeInOut"}}
                            borderRadius=".625rem"
                            bgcolor="#fff"
                            mx="1.25rem"
                            paddingY="3rem"
                        >
                            <FAQSection />
                        </MotionBox>


                        {/* Contact + Info Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch mx-5">
                            <ContactUsForm />
                            <ContactInfo />
                        </div>
                        

                        <LocateBranch 
                            open={showBranchPopup} 
                            onClose={() => setShowBranchPopup(false)}
                            onBranchLocation={() => setPage("branch-support")}
                        />
                    </>
                }

                {page === "branch-support" &&
                    <BranchSupportPage 
                        onBackToSupport={() => {
                            setPage("index");
                            setShowBranchPopup(false);
                        }}
                    />
                }
            </div>
        </AnimatePresence>
    )
}