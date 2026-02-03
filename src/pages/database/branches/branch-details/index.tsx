import type { ExtendedTabItem } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { myBranchTabs } from "./BranchTabs";
import BranchMobileOverview from "./overview/Mobile";
import BranchDesktopOverview from "./overview/Desktop";
import { ArrowLeft2 } from "iconsax-react";

export default function BranchDetails() {
    const isMedium = useMediaQuery("(max-width: 1024px)");
    const [activeTab, setActiveTab] = useState<ExtendedTabItem>(myBranchTabs[0])
    const navigate = useNavigate();

    
    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => {
                    navigate('/database?tab=branches')
                }}
                className="btn-back"
            >
                <ArrowLeft2 size={isMedium ? 20 : 18} color="#898483" />
                <span className="ml-3 hidden lg:inline-block">Go Back</span>
            </button>
            {isMedium ? (
                <BranchMobileOverview activeTab={activeTab} setActiveTab={setActiveTab} />
            ) : (
                <BranchDesktopOverview activeTab={activeTab} setActiveTab={setActiveTab} />
            )}
        </div>
    )
}