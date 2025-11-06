import FormikField from "@/components/FormikField";
import { RejectIcon } from "@/components/Icons";
import type { DialogFuncProps } from "@/utils/types";
import { Button, Dialog } from "@mui/material";
import { Form, Formik } from "formik";
import { enqueueSnackbar } from "notistack";

export default function RejectPost({
    open,
    onClose
}: DialogFuncProps & { id: string }) {
    const handleSubmit = async (_values: any, _actions: any) => {
        // TODO: use `id` when integrating the reject post API
        // await rejectPost(id);
        try {
            enqueueSnackbar('Post has been rejected', {
                variant: 'info',
                autoHideDuration: 2000
            })
        } catch (err) {
            enqueueSnackbar('Failed to reject post', { variant: 'error'})
        }
        onClose();
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
        <div className="w-full h-full p-7.5 flex flex-col gap-5.5">
            <div className="flex flex-col items-start gap-6 w-full h-full">
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
            <Formik
                onSubmit={handleSubmit}
                initialValues={{ rejectionReasons: "" }}
                validateOnMount
            >
                {({ isValid, isSubmitting }) => (
                    <Form>
                        <div className="flex flex-col gap-5.5">
                            <FormikField 
                                label="Rejection reasons"
                                name="rejectionReasons"
                                type="text"
                                placeholder="Please provide reasons for rejecting this post"
                                textarea
                                rows={10}
                                fullWidth
                            />
                            <div className="flex items-center gap-5.5">
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
                                    disabled={isSubmitting || !isValid}
                                    type="submit"
                                >
                                    <span className="font-coolvetica text-base">
                                        Reject Post
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
            
            

        </div>
        </Dialog>
    )
}