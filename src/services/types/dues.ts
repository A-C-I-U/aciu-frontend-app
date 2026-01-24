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
