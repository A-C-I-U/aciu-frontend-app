import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { CreateEventData } from "../types/events";

const createEvent = async (payload: CreateEventData): Promise<{ message: string }> => {
    const formData = new FormData();

    formData.append('title', payload.title);
    formData.append('description', payload.description);
    formData.append('category', payload.category);
    formData.append('type', payload.type);
    formData.append('guessExpectation', payload.guestExpectation.toString());
    formData.append('dressCode', payload.dressCode);
    formData.append('entryFee', payload.entryFee.toString());
    formData.append('eventDate', payload.eventDate);
    formData.append('startTime', payload.startTime);
    formData.append('endTime', payload.endTime);
    formData.append('location', payload.location);
    payload.highlights.forEach((h, i) => { 
        formData.append(`highlights[${i}]`, h); 
    });
    if (payload.coverImage) {
        formData.append("coverImage", payload.coverImage);
    }
    formData.append("enableRSVP", String(payload.enableRSVP)); 
    formData.append("enableDonations", String(payload.enableDonations)); 
    formData.append("enableCountdown", String(payload.enableCountdown));

    const response = await apiClient.post<{ message: string }>('/events', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return response.data;
}


export const useCreateEvent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: createEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        }
    })
}