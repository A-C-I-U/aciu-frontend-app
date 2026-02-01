export interface DashboardProfile {
  fullName: string;
  occupation: string;
  ageGrade: string;
  isVerified: boolean;
  phone: string;
  email: string;
  profilePhoto: string | null;
}

export interface DashboardResponse {
  message: string;
  profile: DashboardProfile;
}

export interface TimeUntilDue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FinancialMetric {
  amount: number;
  growth: string;
}

export interface NextMonthlyDue {
  amount: number;
  timeUntilDue: TimeUntilDue;
}

export interface FinancesResponse {
  monthlyContributions: FinancialMetric;
  projectDonations: FinancialMetric;
  nextMonthlyDue: NextMonthlyDue;
}


export interface GrowthStat {
  members: number,
  donations: number,
  branches: number
}

export interface NationalDashboardStats {
  totalMembers: number,
  totalDonations: number,
  totalBranches: number,
  growth: GrowthStat
}


export interface DashboardWithdrawalApiResponse {
  id: string;
  TransactionID: string;
  "Payment Type": string;
  Date: string | number | Date;
  Amount: number;
  Status: string;
  "Submitted By": string;
  "Branch Name": string;
}

export interface MonthlyTransaction {
  month: string;
  dues: number;
  projects: number;
  events: number;
}

export interface TransactionsResponse {
  year: number;
  monthlyTransactions: MonthlyTransaction[];
}