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

export interface FormattedActivityLog {
  userName: string;
  field: string;
  displayField: string;
  oldValue: string;
  newValue: string;
  formattedOldValue: string;
  formattedNewValue: string;
  createdAt: string;
  formattedDate: string;
  hasActualChange: boolean;
}

export interface ToggleDueStatusResponse {
  message: string;
  due: Due;
}

export interface Due {
  id: string;
  branchId: string;
  isNational: boolean;
  title: string;
  createdBy: string;
  createdOn: string;
  currency: string;
  amount: string;
  amountUsd: number;
  amountNaira: number;
  startDate: string;
  endDate: string;
  interval: Interval;
  ageGrades: string[];
  gender: Gender;
  location: string;
  memberRoles: string[];
  notifications: string[];
  status: "Active" | "Inactive";
  createdAt: string;
  updatedAt: string;
}
