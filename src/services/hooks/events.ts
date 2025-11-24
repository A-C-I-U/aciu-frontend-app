import apiClient from "..";
import type { EventsResponse } from "../types/events";
import { useQuery } from '@tanstack/react-query';


const fetchEvents = async (): Promise<EventsResponse> => {
  const response = await apiClient.get<EventsResponse>('/events');
  return response.data;
};

export const useEvents = () => {
  return useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
  });
};