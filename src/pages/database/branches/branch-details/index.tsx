import type { ExtendedTabItem } from "@/utils/types";
import { useMediaQuery } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { branchTabs } from "./BranchTabs";
import BranchMobileOverview from "./overview/Mobile";
import BranchDesktopOverview from "./overview/Desktop";
import { ArrowLeft2 } from "iconsax-react";

export default function BranchDetails() {
  const isMedium = useMediaQuery("(max-width: 1024px)");
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") ?? branchTabs[0];
  const currentTab: ExtendedTabItem =
    branchTabs.find((tab) => tab.key === activeTab) ?? branchTabs[0];

  const handleTabChange = (tab: ExtendedTabItem) => {
    setSearchParams({ tab: tab.key });
  };

  return (
    <div className="relative">
      {isMedium && (
        <button
          type="button"
          onClick={() => {
            navigate("/database?tab=branches");
          }}
          className="btn-back"
        >
          <ArrowLeft2 size={isMedium ? 20 : 18} color="#898483" />
          <span className="ml-3 hidden lg:inline-block">Go Back</span>
        </button>
      )}
      {isMedium ? (
        <BranchMobileOverview activeTab={currentTab} onTabChange={handleTabChange} />
      ) : (
        <BranchDesktopOverview activeTab={currentTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
}
