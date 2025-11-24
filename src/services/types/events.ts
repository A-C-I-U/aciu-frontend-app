export interface Event {
  id: string;
  title: string;
  description: string;
  category: string; 
  type: string; 
  guestExpectation: number;
  dressCode: string; 
  entryFee: string;
  eventDate: string; 
  startTime: string; 
  endTime: string; 
  location: string;
  highlights: string[];
  coverImage: string;
  enableRSVP: boolean;
  enableDonations: boolean;
  enableCountdown: boolean;
  createdBy: string;
  branchId: string;
  verificationStatus: string; 
  registeredCount: number;
  shareableLink: string;
  createdAt: string; 
  updatedAt: string; 
}

export interface EventsResponse {
  events: Event[];
}

// Removed all the enum types since we're using strings