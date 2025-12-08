import { useMutation } from '@tanstack/react-query';
import { searchBranch, submitHelpTicket } from '../hooks/helpandsupport';
import type { HelpTicketRequest } from '../types/helpandsupport';


export const useHelpTicketMutation = () => {
  return useMutation({
    mutationFn: (ticketData: Omit<HelpTicketRequest, 'branchLocation' | 'branch'>) => {
      const completeTicketData: HelpTicketRequest = {
        ...ticketData,
        branchLocation: 'Nigeria',
        branch: 'Lagos Branch'
      };
      return submitHelpTicket(completeTicketData);
    },
  });
};

export const useBranchSearch = () => {
  return useMutation({
    mutationFn: ({ branchLocation, branch }: { branchLocation: string; branch: string }) => {
      return searchBranch(branchLocation, branch);
    },
  });
};