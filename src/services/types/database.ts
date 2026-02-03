export interface Member {
  id: string;
  fullName: string;
  ageGrade: string;
  joinedOn: string;
  occupation: string;
  verificationStatus: false | true;
}

export interface MemberProfile {
  fullName: string;
  phone: string;
  email: string;
  ageGrade: string;
  village: string;
  occupation: string;
  gender: 'Man' | 'Woman' | string;
  branch: string | null;
  joinedOn: string;
  verifiedOn: string | null;
  verifiedBy: string | null;
  events: string;
  projects: string;
}

export interface Branch {
  id: string;
  branchName: string;
  meetingLocation: string;
  status: 'active' | 'inactive';
  branchMembers: number;
  branchPresident: string | null;
}


export interface AgeGrade {
  name: string;
  yearFormed: string;
  members: number;
  associatedBranches: number;
  status: 'Active' | 'Inactive';
}

export interface DatabaseTotals {
  members: number;
  verifiedMembers: number;
  branches: number;
  ageGrades: number;
}

export interface DatabaseStats {
  totals: DatabaseTotals;
  growth: DatabaseTotals;
}
