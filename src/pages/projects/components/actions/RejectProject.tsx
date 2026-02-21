import { RejectIcon } from "@/components/Icons";
import { useUpdateProjectStatus } from "@/services/mutations/projects";
import type { DialogFuncProps } from "@/utils/types";
import { CircularProgress, Dialog } from "@mui/material";
import { Field, Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { object, string } from "yup";

export default function RejectProject({
    open,
    onClose, id
}: DialogFuncProps & { id: string }) {

    const { mutateAsync: updateStatus, isPending } = useUpdateProjectStatus();
    const handleReject = async (id: string, reason: string) => {
        await updateStatus({
            id,
            payload: { approve: false, reason },
        });
    };

    const handleSubmit = async (values: { reason: string }) => {
        try {
            await handleReject(id, values.reason);
            enqueueSnackbar('Nomination has been rejected', {
                variant: 'success',
                autoHideDuration: 2000,
            });
            onClose()
        } catch (err) {
            enqueueSnackbar('Failed to reject Nomination', { variant: 'error' });
        }
    };




    return (
        <Dialog
            onClose={() => onClose()}
            open={open}
            disableScrollLock
            sx={{
                "& .MuiDialog-paper": {
                    overflow: "hidden",
                    width: {
                        xs: "92%",
                        md: "31.25rem",
                    },
                    margin: "0 auto",
                    borderRadius: "1.25rem"
                },
            }}
        >
            <Formik
                onSubmit={handleSubmit}
                initialValues={{ reason: "" }}
                validationSchema={object({
                    reason: string().required("Reason for rejection is required")
                })}
                validateOnMount
            >

                {({ values, isValid, isSubmitting }) => (
                    <Form>
                        <div className="w-full flex flex-col gap-5.5 h-4/5 overflow-hidden">
                            <div className="flex px-7.5 pt-7.5 flex-col items-start gap-5.5 w-full">
                                <RejectIcon />
                                <div className="flex flex-col items-start gap-1">
                                    <h1 className="text-aciu-border-grey font-bold text-2xl">
                                        Reject Nomination
                                    </h1>
                                    <p className="text-aciu-neutral leading-[160%]">
                                        This user will be notified about this action, kindly state reasons why it was rejected.
                                    </p>
                                </div>
                            </div>
                            <div className="px-7.5 flex-1 flex flex-col gap-5.5 overflow-y-auto">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="reason"
                                        className="font-medium text-sm text-aciu-border-grey">
                                        Rejection Reason
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="reason"
                                        className="border-aciu-card-grey border text-sm 
                                            font-montserrat leading-5 focus:outline-0
                                            rounded-2xs py-3 px-3 font-medium"
                                        placeholder="Please provide reasons for rejecting this nomination"
                                        rows={10}
                                        {...values}
                                    />
                                </div>
                            </div>
                            <div className="pb-7.5 px-7.5 flex items-center gap-5.5">
                                <button
                                    className="btn btn-danger bg-red-100 text-white !text-sm md:!text-base"
                                    disabled={isSubmitting || !isValid}
                                    type="submit"
                                >
                                    Reject Nomination
                                    {isPending && <CircularProgress sx={{ color: "white" }} size={12} />}
                                </button>
                                <button
                                    className="btn !text-sm md:!text-base border text-aciu-border-grey leading-[155%]"
                                    onClick={() => onClose()}
                                >
                                    Back
                                </button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </Dialog>
    )
}