import MotionBox from "@/components/MotionBox";
import type { TabItem } from "@/utils/types";
import { Divider } from "@mui/material";
import { ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import ProfileSettings from "./components/profile-settings";
import NotificationSettings from "./components/notification-settings";
import SecuritySettings from "./components/security-settings";

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

    const handleTabClick = (tab: ExtendedTabItem) => {
        setActiveTab(tab)
    }
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
            <MotionBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white relative mx-5 flex"
            >
                <div className="hidden lg:flex py-8 px-6.5 flex-col gap-8 min-w-105">
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
        </div>
    )
}