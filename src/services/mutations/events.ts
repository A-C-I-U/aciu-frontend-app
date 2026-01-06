import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "..";
import type { CreateEventData } from "../types/events";

const saveEvent = async (
    { eventId, payload }: { eventId?: string; payload: CreateEventData }
): Promise<{ message: string }> => {
    const formData = new FormData();

    formData.append("title", payload.title);
    formData.append("description", payload.description);
    formData.append("category", payload.category);
    formData.append("type", payload.type);
    formData.append("guestExpectation", payload.guestExpectation.toString());
    formData.append("dressCode", payload.dressCode);
    formData.append("entryFee", payload.entryFee.toString());
    formData.append("eventDate", payload.eventDate);
    formData.append("startTime", payload.startTime);
    formData.append("endTime", payload.endTime);
    formData.append("location", payload.location);

    payload.highlights.forEach((h, i) => {
        formData.append(`highlights[${i}]`, h);
    });

    if (payload.coverImage) {
        formData.append("coverImage", payload.coverImage);
    }

    formData.append("enableRSVP", String(payload.enableRSVP));
    formData.append("enableDonations", String(payload.enableDonations));
    formData.append("enableCountdown", String(payload.enableCountdown));

    const url = eventId ? `/events/${eventId}` : `/events`;
    const method = eventId ? "put" : "post";

    const response = await apiClient[method]<{ message: string }>(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

  return response.data;
};

export const useSaveEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveEvent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
    });
};
