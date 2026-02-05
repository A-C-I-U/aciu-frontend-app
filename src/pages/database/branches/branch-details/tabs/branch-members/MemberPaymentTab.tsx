/**
 * Not recreating dummy data for this table
 * but a new columns array and the table instance 
 * will appear here
 */
import { EmptyPaymentsState } from "@/components/EmptyStates";
import type { MemberProfile } from "@/services/types/database";

export default function MemberPaymentTab({ branchMember }: { branchMember: MemberProfile}) {
    
    return (
       branchMember ? (
          <EmptyPaymentsState />)  :
          (<span>State</span>)
    )
}

