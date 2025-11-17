export interface HelpTicketRequest {
  fullName: string;
  email: string;
  phoneNumber: string;
  message: string;
  branchLocation: string;
  branch: string;
}

export interface HelpTicketResponse {
  message: string;
  ticket: {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    message: string;
    branchLocation: string;
    branch: string;
    status: string;
    createdAt: string;
  };
}

export interface Leadership {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  role: string;
  startDate: string;
  endDate: string | null;
}

export interface BranchEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
}

export interface BranchSearchResponse {
  leadership: Leadership[];
  events: BranchEvent[];
}