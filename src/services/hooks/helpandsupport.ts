import apiClient from '..';
import type { BranchSearchResponse, HelpTicketRequest, HelpTicketResponse } from '../types/helpandsupport';


export const submitHelpTicket = async (ticketData: HelpTicketRequest): Promise<HelpTicketResponse> => {
  const response = await apiClient.post<HelpTicketResponse>(
    '/help-support/tickets',
    ticketData
  );
  return response.data;
};


export const searchBranch = async (branchLocation: string, branch: string): Promise<BranchSearchResponse> => {
  const response = await apiClient.get<BranchSearchResponse>(
    '/help-support/branch-search',
    {
      params: {
        branchLocation,
        branch
      }
    }
  );
  return response.data;
};