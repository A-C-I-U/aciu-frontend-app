import { DetailSkeleton } from "@/components/DetailSkeleton";
import ShellHeader from "@/components/ShellHeader";
import ShellModal from "@/components/ShellModal";
import { ViewDetailRow } from "@/components/ViewDetailRow";
import { EmptyRecords } from "@/components/EmptyStates";
import { useProjectNominationDetail } from "@/services/hooks/project";
import { useUpdateProjectStatus } from "@/services/mutations/projects";
import type { ProjectNominationDetail } from "@/services/types/projects";
import { withdrawalStatusMap } from "@/utils/helpers";
import { CircularProgress, Divider } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import RejectProject from "../actions/RejectProject";
import { StatusBadge } from "@/components/StatusBadge";
import { FileCard } from "@/components/FileCard";
import ViewCopyDetailRow from "@/components/ViewCopyDetailRow";

export default function ProjectNomDetail({ open, onClose, id, projectId }: {
    open: boolean,
    onClose: () => void,
    id: string | null,
    projectId: string | null
}) {

    if (!id || !projectId) return null;

    const { data, isLoading, isError } = useProjectNominationDetail(id)
    const { mutateAsync: updateStatus, isPending } = useUpdateProjectStatus();
    const [openReject, setOpenReject] = useState(false);

    const handleApprove = async (id: string) => {
        await updateStatus({
            id,
            payload: { approve: true },
        });
    };

    const handleSubmit = async (id: string) => {
        try {
            await handleApprove(id)
            enqueueSnackbar('Nomination Approved', {
                variant: 'success',
                autoHideDuration: 2000
            })
            onClose();
        } catch (err) {
            enqueueSnackbar('Failed to approve Nomination', { variant: 'error' })
        }
    }


    return (
        <>
            <ShellModal open={open} onClose={onClose}>
                <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                    <ShellHeader title="View Nomination" onClose={onClose} />
                    <Divider className="flex shrink-0" />
                    <div className="flex flex-col h-full overflow-hidden">
                        <div className="resources-modal-body pb-6">
                            {isLoading && <DetailSkeleton />}
                            {data && <ProjectNomDetailContent data={data} projectId={projectId} />}
                            {(isError && !data && !isLoading) && (
                                <div className="text-aciu-abriba p-4">
                                    Unable to load nominated project's details.
                                    Please open the modal again.
                                </div>
                            )}
                        </div>
                        <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 flex-shrink-0">
                            <button className="btn btn-primary" disabled={!data}
                                onClick={() => handleSubmit(id)}>
                                {isPending && <CircularProgress sx={{ color: "white" }} size={12} />}
                                Mark as Approved
                            </button>
                            <button className="btn btn-danger tracking-[5%]" disabled={!data} onClick={() => { setOpenReject(true); onClose() }}>
                                Reject Nomination
                            </button>
                        </div>
                    </div>
                </div>
            </ShellModal>
            <RejectProject
                open={openReject}
                onClose={() => setOpenReject(false)}
                id={id}
            />
        </>
    )
}

const ProjectNomDetailContent = ({ data, projectId }: { data: ProjectNominationDetail, projectId: string }) => {
    const [showPreview, setShowPreview] = useState(false);
    if (!data) return <EmptyRecords />;

    const { title, submittedBy, emailAddress, phoneNumber, branch, location, estimatedCostUSD, category, briefDescription, expectedImpact, date, status, image } = data;

    const { label, labelColor, dotColor, bgColor } =
        withdrawalStatusMap[status.toLowerCase() as ProjectNominationDetail["status"]];

    return (
        <div className="flex flex-col gap-4">
            <div className="overflow-x-auto scroll-unset pb-2 w-full">
                <table className="table-auto border-collapse min-w-2xs w-full">
                    <thead>
                        <tr className="text-left">
                            <th className="payment-table-column title">Title</th>
                            <th className="payment-table-column desc">Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        <ViewCopyDetailRow label="Transaction ID" content={projectId} ariaLabel="Copy Transaction ID" />
                        <ViewDetailRow label="Project Title" content={title} />
                        <ViewCopyDetailRow label="Submitted By" content={submittedBy} ariaLabel="Copy Submitter's Name" />
                        <ViewDetailRow label="Email Address" content={<a href={`mailto:${emailAddress}`} className="lowercase">{emailAddress}</a>} />
                        <ViewDetailRow label="Phone Number" content={phoneNumber} />
                        <ViewDetailRow label="Branch" content={branch} />
                        <ViewDetailRow label="Location" content={location} />
                        <ViewDetailRow label="Estimated Cost (USD)" content={`$${Math.round(estimatedCostUSD).toLocaleString()}`} />
                        <ViewDetailRow label="Project Category" content={category} />
                        <ViewDetailRow label="Brief Description" content={briefDescription} />
                        <ViewDetailRow label="Expected Impact" content={expectedImpact} />
                        <ViewDetailRow label="Date" content={date} />
                        <ViewDetailRow label="Status" content={<StatusBadge label={label} labelColor={labelColor} bgColor={bgColor} dotColor={dotColor} />} />
                    </tbody>
                </table>
            </div>
            <FileCard
                fileType="img"
                fileUrl={image}
                fileLabel="Project Image"
                onPreview={() => setShowPreview(true)}
            />

            {/* In-app Image Preview Modal */}
            <ShellModal open={showPreview} onClose={() => setShowPreview(false)}>
                <div className="resources-modal-section flex flex-col h-full overflow-hidden">
                    <ShellHeader title="Image Preview" onClose={() => setShowPreview(false)} />
                    <Divider className="flex shrink-0" />
                    <div className="flex-1 overflow-y-auto overflow-y-hidden p-4 flex items-center justify-center bg-black/5">
                        <img
                            src={image}
                            alt="Project Preview"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </ShellModal>
        </div>
    )
}