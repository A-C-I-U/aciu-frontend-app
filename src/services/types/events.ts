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

export interface EventDetailsResponse {
  event: {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    branchId: string;
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
    verificationStatus: string;
    registeredCount: number;
    shareableLink: string;
    createdAt: string;
    updatedAt: string;
    registrations: any[];
  };
}