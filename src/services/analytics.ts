import apiClient from "./index";
import type { NationalAnalyticsResponse } from "./types/analytics";

export const getNationalAnalytics = async (): Promise<NationalAnalyticsResponse> => {
    const response = await apiClient.get<NationalAnalyticsResponse>("/analytics/analytics/national");
    return response.data;
};
