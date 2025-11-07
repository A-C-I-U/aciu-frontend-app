import MotionBox from "@/components/MotionBox";
import type { TabItem } from "@/utils/types";
import { Divider, useMediaQuery } from "@mui/material";
import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileSettings from "./components/profile-settings";
import NotificationSettings from "./components/notification-settings";
import SecuritySettings from "./components/security-settings";
import { useUser } from "@/context/UserContext";
import ProfileVerificationPopup from "./components/profile-settings/ProfileVerificationPopup";
import { ArrowRight2 } from "iconsax-react";

interface ExtendedTabItem extends TabItem {
  description?: string;
}

const settingsTabs: ExtendedTabItem[] = [
    { 
        key: "profile-settings", 
        label: "Profile Settings", 
        description: "Personal Information, Contact Details", 
        content: <ProfileSettings />
    },
    { 
        key: "notification-settings", 
        label: "Notification Settings", 
        description: "Emails, Sms, In-App",
        content: <NotificationSettings />
    },
    { 
        key: "security-settings", 
        label: "Security Settings", 
        description: "Change Password, 2FA",
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
    
    //   We might need this function later
    // const handleBack = () => setScreen("overview");

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
                                        className="w-full flex justify-between items-center p-4.5 bg-white h-19 rounded-[.625rem]"
                                    >
                                        <span className="font-medium font-montserrat text-sm text-aciu-abriba leading-[140%]">
                                            {tab.label}
                                        </span>
                                        <ArrowRight2 size={20} variant="Linear" color="#151515" />
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
                            {activeTab.content}
                        </MotionBox>
                    )}
                </MotionBox>
            )}
        </div>
    )
}