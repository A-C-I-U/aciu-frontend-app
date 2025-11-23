import MotionBox from "@/components/MotionBox";
import type { ExtendedTabItem, TabItem } from "@/utils/types";
import { Divider, useMediaQuery } from "@mui/material";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileSettings from "./components/profile-settings";
import NotificationSettings from "./components/notification-settings";
import SecuritySettings from "./components/security-settings";
import { useUser } from "@/context/UserContext";
import ProfileVerificationPopup from "./components/profile-settings/ProfileVerificationPopup";
import { ArrowLeft2 } from "iconsax-react";

const settingsTabs: ExtendedTabItem[] = [
    { 
        key: "profile-settings", 
        label: "Profile Settings", 
        description: "Personal Information, Contact Details", 
        contentDescription: "Edit your personal information and update your branch or contact details.",
        content: <ProfileSettings />
    },
    { 
        key: "notification-settings", 
        label: "Notification Settings", 
        description: "Emails, Sms, In-App",
        contentDescription: "Choose how and where you receive updates from ACIU.",
        content: <NotificationSettings />
    },
    { 
        key: "security-settings", 
        label: "Security Settings", 
        description: "Change Password, 2FA",
        contentDescription: "Keep your account safe and secure.",
        content: <SecuritySettings />
    }
]

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState(settingsTabs[0]);
    const { user } = useUser();
    const [screen, setScreen] = useState<"overview" | "content">("overview");
    const isMedium = useMediaQuery("(max-width: 1024px)");

    const handleTabClick = (tab: ExtendedTabItem) => {
        setActiveTab(tab)
    }

    const handleOpenContent = (tab: TabItem) => {
        setActiveTab(tab);
        setScreen("content");
    };
    
    const handleBack = () => setScreen("overview");

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }, [activeTab]);

    useEffect(() => {
        setScreen("overview")
    }, [])

    return (
        <div className="flex flex-col gap-6">
            <div className="bg-white md:mx-5 rounded-lg md:px-6 px-2.5 pt-4 flex flex-col gap-4">
                <h1 className="font-coolvetica text-xl text-aciu-border-grey">
                    Settings
                </h1>
                <div className="flex gap-4 md:gap-8 items-center">
                    <button
                        className="text-aciu-red font-semibold
                        text-xs md:text-sm font-montserrat flex flex-col gap-4"
                    >
                        My Account Settings
                        <span className="block w-full h-0.5 bg-aciu-red rounded-full"></span>
                    </button>
                </div>
            </div>


            {!isMedium
            && (
                <MotionBox
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-white relative mx-5 flex"
                >
                    <div className="hidden md:flex py-8 px-6.5 flex-col gap-8 lg:min-w-105">
                        {user?.verified ?
                            <ProfileVerificationPopup /> : 
                        ""}
                        <div className="flex flex-col gap-4 w-full">
                            {settingsTabs.map((tab) => (
                                <button 
                                    key={tab?.key}
                                    onClick={() => handleTabClick(tab)}
                                    className={`
                                        ${activeTab?.key === tab.key ?
                                            'bg-aciu-bg-grey' :
                                            'bg-inherit'}
                                        py-4 px-2.5 flex justify-between items-start w-full`}
                                >
                                    <span className="font-montserrat flex flex-col gap-2 items-start">
                                        <span className={`
                                            ${activeTab?.key === tab.key ?
                                                'text-aciu-border-grey font-semibold ' : 'text-aciu-dark-grey'} 
                                            `}
                                        >
                                            {tab.label}
                                        </span>
                                        <span className={`
                                            ${activeTab?.key === tab.key ?
                                                'text-aciu-abriba' : 'text-aciu-dark-grey'} 
                                            text-sm `}>
                                            {tab.description}
                                        </span>
                                    </span>
                                    <ArrowRightIcon color={`${activeTab.key === tab.key ? '#00B686' : '#C9C9C9'}`} size={20}/>
                                </button>
                            ))}
                        </div>
                        
                    </div>
                    <Divider orientation="vertical" flexItem />
                    <div className="pl-1.5 py-8 w-full">
                        {activeTab.content}
                    </div>
                </MotionBox>

            )}


            
            {isMedium && (
                <MotionBox
                    key={screen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    mx="1.25rem"
                    mt={3}
                    mb={8}
                    position="relative"
                >
                    {screen === "overview" && (
                        <div className="flex flex-col gap-8">
                            {user?.verified ?
                                <ProfileVerificationPopup /> : 
                            ""}
                            <div className="flex flex-col gap-2 mt-3 w-full">
                                {settingsTabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => handleOpenContent(tab)}
                                        className={`bg-aciu-bg-grey py-4 px-2.5 flex justify-between items-center w-full`}
                                    >
                                    <span className="font-montserrat flex flex-col gap-2 items-start">
                                        <span className="text-aciu-border-grey font-semibold "
                                        >
                                            {tab.label}
                                        </span>
                                        <span className={`text-aciu-abriba text-sm `}>
                                            {tab.description}
                                        </span>
                                    </span>
                                    <ArrowRightIcon color="#00B686" size={20}/>
                                </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {screen === "content" && activeTab && (
                        <MotionBox
                            key={activeTab?.key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            bgcolor="#fff"
                            borderRadius=".625rem"
                            py={3}
                            px={2}
                        > 
                            
                            <div className="flex flex-col gap-6 w-full mb-6">
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        aria-label="Go back to Settings Overview"
                                        title="Go back to Settings Overview"
                                        className="flex items-center text-aciu-neutral font-montserrat text-sm
                                            border border-neutrals-100 rounded-[0.75rem] px-2 py-4 bg-transparent hover:bg-neutrals-50 transition-colors"
                                    >
                                        <ArrowLeft2 size={20} color="#898483" />
                                    </button>
                                    <div className="lg:pl-10 flex flex-col gap-2 max-h-fit">
                                        <p className="font-montserrat lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                                            {activeTab?.key === "profile-settings" ?
                                            "Personal Information" : activeTab?.label}
                                        </p>
                                        <p className="text-sm lg:text-base">
                                            {activeTab?.contentDescription}
                                        </p>
                                    </div>
                                </div>
                                <Divider orientation="horizontal" flexItem />  
                            </div> 
                            {activeTab.content}
                        </MotionBox>
                    )}
                </MotionBox>
            )}
        </div>
    )
}