import { useMediaQuery } from "@mui/material";
import MobileOverview from "./overview/Mobile";
import { type TabItem } from "@/utils/types";
import Desktop from "./overview/Desktop";
import { useMemberBranchDashboard } from "@/services/hooks/members";
import BranchDues from "./BranchDues";
import BranchLeadership from "./BranchLeadership";
import BranchEvents from "./BranchEvents";
import BranchGallery from "./BranchGallery";
import { useSearchParams } from "react-router-dom";

export const branchTabs: TabItem[] = [
  { key: "branch-dues", label: "Branch Dues", content: <BranchDues /> },
  { key: "branch-leadership", label: "Branch Leadership", content: <BranchLeadership /> },
  { key: "branch-events", label: "Branch Events", content: <BranchEvents /> },
  { key: "branch-gallery", label: "Branch Gallery", content: <BranchGallery /> },
];

export default function MemberBranch() {
  const isMedium = useMediaQuery("(max-width: 1024px)");
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading } = useMemberBranchDashboard();
  const activeTab = searchParams.get("tab");
  const currentTab = branchTabs.find((tab) => tab.key === activeTab);
  const handleTabChange = (tab: TabItem) => {
    setSearchParams({ tab: tab.key });
  };

  return (
    <div className="my-4 mx-5">
      {isMedium ? (
        <MobileOverview
          activeTab={currentTab}
          searchParams={searchParams}
          setActiveTab={handleTabChange}
          overviewData={data}
          isLoading={isLoading}
          clearSearchParams={() => setSearchParams({})}
        />
      ) : (
        <Desktop
          activeTab={currentTab ?? branchTabs[0]}
          setActiveTab={handleTabChange}
          overviewData={data}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
