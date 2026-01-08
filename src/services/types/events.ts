import type dayjs from "dayjs";

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
  totalPages?: number;
  currentPage?: number,
  total?: number
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

export interface EventsStatsResponse {
  stats: {
    totalEvents: number,
    totalNationalEvents: number,
    totalBranchEvents: number,
    totalZonalEvents: number,
    totalRSVPs: number,
    monthlyGrowth: {
      events: number,
      nationalEvents: number,
      branchEvents: number,
      zonalEvents: number,
      rsvps: number
    }
  }
}

export type EventCategory =  "NATIONAL_EVENT" | "LOCAL_EVENT" | "OTHER";
export type EventType = "VIRTUAL" | "PHYSICAL" | "HYBRID";
export type EventDressCode = "SMART_CASUAL" | "FORMAL" | "TRADITIONAL" | string;

export interface CreateEventData {
  title: string;
  description: string;
  category: EventCategory;
  type: EventType;
  guestExpectation: string;
  dressCode: EventDressCode;
  entryFee: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  highlights: string[];
  coverImage: File | string | null;
  enableRSVP: boolean;
  enableDonations: boolean;
  enableCountdown: boolean;
}


export interface EventFormValues {
  eventTitle: string;
  eventDescription: string;
  eventCategory: string;
  eventType: string;
  guestExpectation: string;
  dressCode: string;
  eventDate: dayjs.Dayjs | null;
  startTime: dayjs.Dayjs | null;
  endTime: dayjs.Dayjs | null;
  eventLocation: string;
  eventHighlights: string[];
  entryFee: string;
  image: string | File | null;
  enableRsvp: boolean;
  enableDonations: boolean;
  enableCountdown: boolean;
}