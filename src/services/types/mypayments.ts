export interface DashboardAmount {
  amount: number;
  growth?: string;
}

export interface TimeUntilDue {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export interface NextMonthlyDue {
  amount: number;
  timeUntilDue: TimeUntilDue;
}

export interface DuesDashboardResponse {
  totalContributions: DashboardAmount;
  outstandingBalance: DashboardAmount;
  nextMonthlyDue: NextMonthlyDue;
}

export interface DonationAmount {
  amount: number;
  growth: string;
}

export interface CountWithGrowth {
  count: number;
  growth: string;
}

export interface DonationsDashboardResponse {
  totalDonations: DonationAmount;
  projectsSupported: CountWithGrowth;
  eventsSupported: CountWithGrowth;
}

export interface Payment {
  type: 'DUE' | 'DONATION';
  date: string;
  amountPaid: number;
  status: string;
  dueType?: string;
  period?: string; 
  category?: string | null; 
  description?: string | null; 
  targetType?: string; 
}