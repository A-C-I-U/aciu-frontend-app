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