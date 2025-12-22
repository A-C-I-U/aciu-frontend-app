import { useUser } from "@/context/UserContext";
import apiClient from "..";
import type { EventDetailsResponse, EventsResponse, EventsStatsResponse } from "../types/events";
import { useQuery } from "@tanstack/react-query";

const fetchEvents = async (): Promise<EventsResponse> => {
  const response = await apiClient.get<EventsResponse>("/events");
  return response.data;
};

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

const fetchAllEvents = async (): Promise<EventsResponse> => {
  const response = await apiClient.get<EventsResponse>("/events/public")
  return response.data
};

export const useAllEvents = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ["events", "all-events"],
    queryFn: fetchAllEvents,
    enabled: user?.role === "national_admin",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

const fetchUpcomingEvents = async (): Promise<EventsResponse> => {
  const response = await apiClient.get<EventsResponse>("/events/upcoming")
  return response.data
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["events", "upcoming-events"],
    queryFn: fetchUpcomingEvents,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

const fetchPastEvents = async (): Promise<EventsResponse> => {
  const response = await apiClient.get<EventsResponse>("/events/past")
  return response.data
};

export const usePastEvents = () => {
  return useQuery({
    queryKey: ["events", "past-events"],
    queryFn: fetchPastEvents,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

const fetchEventDetails = async (
  eventId: string
): Promise<EventDetailsResponse> => {
  const response = await apiClient.get<EventDetailsResponse>(
    `/events/${eventId}`
  );
  return response.data;
};

export const useEventDetails = (eventId: string) => {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventDetails(eventId),
    enabled: !!eventId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

const fetchEventsStats = async (): Promise<EventsStatsResponse> => {
  const response = await apiClient.get<EventsStatsResponse>("/events/stats");
  return response.data
}

export const useEventsStats = () => {
  const { user } = useUser();
  return useQuery({
    queryKey: ["events", "stats"],
    queryFn: () => fetchEventsStats(),
    enabled: user?.role === "national_admin",
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}