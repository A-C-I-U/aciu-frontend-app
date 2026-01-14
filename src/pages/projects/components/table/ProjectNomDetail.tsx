import { DetailSkeleton } from "@/components/DetailSkeleton";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { EmptyRecords } from "@/pages/my-branch/components/EmptyStates";
import { useProjectNominationDetail } from "@/services/hooks/project";
import type { ProjectNominationDetail } from "@/services/types/projects";
import { copyTextToClipboard } from "@/utils/helpers";
import { Divider } from "@mui/material";
import { Copy } from "iconsax-react";

export default function ProjectNomDetail({ open, onClose, id, projectId }: {
    open: boolean,
    onClose: () => void,
    id: string | null,
    projectId: string | null
}) {

    if (!id || !projectId) return null;

    const { data, isLoading, isError } = useProjectNominationDetail(id)

    return (
        <ShellModal open={open} onClose={onClose}>
            <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                <ShellHeader title="View Nomination" onClose={onClose} />
                <Divider className="flex shrink-0" />
                <div className="flex flex-col h-full overflow-hidden">
                    <div className="resources-modal-body overflow-x-auto">
                        {isLoading && <DetailSkeleton />}
                        {data && <ProjectNomDetailContent data={data} projectId={projectId}/>}
                        {(isError && !data && !isLoading) && (
                            <div className="text-aciu-abriba p-4">
                                Unable to load nominated project's details.
                                Please open the modal again.
                            </div>
                        )}
                    </div>
                    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                        <button className="btn btn-primary" disabled={!data}>
                            Mark as Approved
                        </button>
                        <button className="btn btn-danger" disabled={!data}>
                            Reject Nomination
                        </button>
                    </div>
                </div>
            </div>
        </ShellModal>
    )
}

const ProjectNomDetailContent = ({ data, projectId }: { data: ProjectNominationDetail, projectId: string}) => {
    if (!data) return <EmptyRecords />;

    const { title, submittedBy, emailAddress, phoneNumber, branch, location, estimatedCostUSD, category, briefDescription, expectedImpact, date } = data;
    // const { 
    //     label, 
    //     labelColor, 
    //     dotColor, 
    //     bgColor 
    // } = withdrawalStatusMap[status.toLocaleLowerCase() as WithdrawalDataType["status"]];

    return (
        <table className="table-auto border-collapse">
            <thead>
                <tr className="text-left">
                    <th className="payment-table-column title">Title</th>
                    <th className="payment-table-column desc">Description</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="payment-table-column title whitespace-nowrap">Project ID</td>
                    <td className="payment-table-column">
                         <span className=" flex items-center justify-between">
                            <span className="desc capitalize whitespace-nowrap truncate max-w-25 sm:max-w-45 md:max-w-60 text-xs md:text-sm">
                                {projectId}
                            </span>
                            <button
                                aria-label="Copy Transaction ID"
                                onClick={() => copyTextToClipboard(projectId)}
                            >
                                <Copy variant="Bulk" size={20} color="#00B686" />
                            </button>
                        </span>
                    </td>
                </tr>
                <ViewDetailRow label="Project Title" content={title} />
                <tr>
                    <td className="payment-table-column title whitespace-nowrap">Submitted By</td>
                    <td className="payment-table-column">
                         <span className=" flex items-center justify-between">
                            <span className="desc capitalize whitespace-nowrap truncate max-w-25 sm:max-w-45 md:max-w-60 text-xs md:text-sm">
                                {submittedBy}
                            </span>
                            <button
                                aria-label="Copy Submitter's Name"
                                onClick={() => copyTextToClipboard(submittedBy)}
                            >
                                <Copy variant="Bulk" size={20} color="#00B686" />
                            </button>
                        </span>
                    </td>
                </tr>
                <ViewDetailRow label="Email Address" content={<a href={`mailto:${emailAddress}`} className="lowercase">{emailAddress}</a>} />
                <ViewDetailRow label="Phone Number" content={phoneNumber} />
                <ViewDetailRow label="Branch" content={branch} />
                <ViewDetailRow label="Location" content={location} />
                <ViewDetailRow label="Estimated Cost" content={estimatedCostUSD} />
                <ViewDetailRow label="Project Category" content={category} />
                <ViewDetailRow label="Brief Description" content={briefDescription} />
                <ViewDetailRow label="Expected Impact" content={expectedImpact} />
                <ViewDetailRow label="Date" content={date} />
                {/* <ViewDetailRow label="Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} /> */}
            </tbody>
        </table>
    )
}

