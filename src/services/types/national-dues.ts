export interface DuesRulesResponse {
  id: string;
  rules: {
    ageGrades: string[];
    gender: string;
    location: string;
    memberRoles: string[];
    currency: string;
  };
  notifications: string[];
}

export interface ActivityLog {
  userName: string;
  field: string;
  oldValue: string;
  newValue: string;
  createdAt: string;
};

export interface ActivityLogResponse {
  message: string;
  details: ActivityLog[];
};

export type Interval = "Yearly" | "Monthly" | "Quarterly" | "One-time"

export type Gender =
  | "All Genders"
  | "Male"
  | "Female"

export interface CreateNationalDuesPayload {
  title: string
  currency: string
  amount: string
  startDate: string
  endDate: string
  interval: Interval
  ageGrades: string[]
  gender: Gender
  location: string
  memberRoles: string[]
  notifications: string[]
}
