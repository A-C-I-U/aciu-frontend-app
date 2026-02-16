import { RejectIcon } from "@/components/Icons";
import type { DialogFuncProps } from "@/utils/types";
import { Button, Dialog, CircularProgress } from "@mui/material";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";
import { useUpdateSubmissionStatus } from "@/services/hooks/blogs";

export default function RejectPost({
    id,
    open,
    onClose
}: DialogFuncProps & { id: string }) {
    const { mutateAsync, isPending } = useUpdateSubmissionStatus();

    const handleSubmit = async (values: { rejectionReasons: string }, _actions: any) => {
        try {
            await mutateAsync({
                postId: id,
                status: "Rejected",
                reason: values.rejectionReasons
            });
            enqueueSnackbar('Post has been rejected', {
                variant: 'success',
                autoHideDuration: 2000
            });
            onClose();
        } catch (err) {
            enqueueSnackbar('Failed to reject post', { variant: 'error' });
        }
    }

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
                initialValues={{ rejectionReasons: "" }}
                validateOnMount
            >

                {({ values, isValid, handleChange }) => (
                    <Form>
                        <div className="w-full flex flex-col gap-5.5 h-4/5 overflow-hidden">
                            <div className="flex px-7.5 pt-7.5 flex-col items-start gap-6 w-full">
                                <RejectIcon />
                                <div className="flex flex-col items-start gap-1.5">
                                    <h1 className="font-coolvetica text-aciu-border-grey font-bold text-2xl">
                                        Reject Post?
                                    </h1>
                                    <p className="font-montserrat text-aciu-neutral font-normal">
                                        The author will  be notified. They can edit and resubmit the article.
                                    </p>
                                </div>
                            </div>
                            <div className="px-7.5 flex-1 flex flex-col gap-5.5 overflow-y-auto">
                                <div className="flex flex-col gap-2">
                                    <label
                                        htmlFor="rejectionReasons"
                                        className="font-medium text-sm text-aciu-border-grey">
                                        Rejection Reasons
                                    </label>
                                    <textarea
                                        name="rejectionReasons"
                                        className="border-aciu-card-grey border text-sm 
                                            font-montserrat leading-5 focus:outline-0
                                            rounded-[.625rem] py-3 px-3 font-medium"
                                        placeholder="Please provide reasons for rejecting this post"
                                        rows={10}
                                        value={values.rejectionReasons}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="pb-7.5 px-7.5 flex items-center gap-5.5">
                                <Button
                                    sx={{
                                        color: 'white',
                                        fontSize: '.75rem',
                                        backgroundColor: '#FF0707',
                                        borderRadius: '.75rem',
                                        padding: '1rem',
                                        boxShadow: '0px 1px 2px 0px #0D0D120A',
                                        textTransform: 'none',
                                        minWidth: "12.5rem",
                                        '&.Mui-disabled': {
                                            backgroundColor: '#e0e0e0',
                                            color: '#9e9e9e',
                                            opacity: 0.6,
                                        }
                                    }}
                                    className="flex gap-2 items-center"
                                    disabled={isPending || !isValid}
                                    type="submit"
                                >
                                    <span className="font-coolvetica text-base">
                                        {isPending ? <CircularProgress size={24} color="inherit" /> : "Reject Post"}
                                    </span>
                                </Button>
                                <Button
                                    sx={{
                                        color: '#3E3E3E',
                                        fontSize: '.75rem',
                                        backgroundColor: 'inherit',
                                        borderRadius: '.75rem',
                                        border: "1px solid #E5E5E5",
                                        padding: '1rem',
                                        boxShadow: '0px 1px 2px 0px #0D0D120A',
                                        textTransform: 'none',
                                        minWidth: "12.5rem"
                                    }}
                                    className="flex gap-2 items-center min-w-49"
                                    onClick={() => onClose()}
                                >
                                    <span className="font-coolvetica text-base">
                                        Cancel
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}

            </Formik>
        </Dialog>
    )
}