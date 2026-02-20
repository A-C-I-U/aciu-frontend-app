import type { TabItem } from "@/utils/types";
import type { Event } from "./events";

export interface MemberProfileOverview {
  fullName: string;
  occupation: string;
  ageGrade: string;
  isVerified: boolean;
  phone: string;
  email: string;
  profilePhoto: string | null;
}

export interface GetMemberProfileResponse {
  message: string;
  profile: MemberProfileOverview;
}


interface ContributionMetric {
  amount: number;
  growth: string;
}

interface TimeUntilDue {
  days: string | number;
  hours: string | number;
  minutes: string | number;
  seconds: string | number;
}

interface NextMonthlyDue {
  amount: number;
  timeUntilDue: TimeUntilDue;
}

export interface MemberContributionsSummary {
  monthlyContributions: ContributionMetric;
  projectDonations: ContributionMetric;
  nextMonthlyDue: NextMonthlyDue;
}

export interface GetMemberDuesSummary {
    totalContributions: ContributionMetric;
    outstandingBalance: {
        amount: number
    },
    nextMonthlyDue: NextMonthlyDue
}


export interface GetUpcomingEventsResponse {
  message: string;
  events: Event[];
}

export interface DashboardBranchInfo {
  branchLogo: string | null;
  branchTitle: string;
  meetingLocation: string;
  registeredMembers: number;
  isActive: boolean;
}

export interface GetMemberDashboardResponse {
  dashboard: DashboardBranchInfo;
}

interface DonationMetric {
  amount: number;
  growth: string;
}

interface CountMetric {
  count: number;
  growth: string;
}

export interface GetMemberImpactSummary {
  totalDonations: DonationMetric;
  projectsSupported: CountMetric;
  eventsSupported: CountMetric;
}

export interface BranchOverviewProps {
    activeTab?: TabItem,
    setActiveTab: (activeTab: TabItem) => void,
    overviewData?: GetMemberDashboardResponse,
    isLoading: boolean;
}

export interface GetMemberDues {
  title: string;
  status: "Active" | "Inactive";
  interval: "Monthly" | "Weekly" | "Yearly";
  amount: string;
  nextPayment: string;
}