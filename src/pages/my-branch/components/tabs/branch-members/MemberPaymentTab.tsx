/**
 * Not recreating dummy data for this table
 * but a new columns array and the table instance 
 * will appear here
 */

import type { BranchMemberDataType } from "@/utils/types";
import { EmptyPaymentsState } from "../../EmptyStates";

export default function MemberPaymentTab({ branchMember }: { branchMember: BranchMemberDataType}) {
    
    return (
       branchMember ? (
          <EmptyPaymentsState />)  :
          (<span>State</span>)
    )
}

