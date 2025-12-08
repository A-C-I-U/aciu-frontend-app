import { useMutation } from "@tanstack/react-query";
import type { PaymentIntentResponse } from "../types/mypayments";
import apiClient from "..";

export const createMonthlyDuesPaymentIntent = async (): Promise<PaymentIntentResponse> => {
  const response = await apiClient.post<PaymentIntentResponse>(
    "/payments/payment-intent/due-monthly"
  );
  return response.data;
};

export const useMonthlyDuesPaymentIntent = () => {
  return useMutation({
    mutationFn: createMonthlyDuesPaymentIntent,
    onError: (error: any) => {
      if (error.response?.data?.error?.includes('already paid')) {
        throw new Error('You have already paid this month\'s due');
      }
      throw error;
    },
  });
};