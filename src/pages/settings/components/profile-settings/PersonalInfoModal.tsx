import type { DialogFuncProps, ProfileFormValues } from "@/utils/types";
import { CircularProgress, Dialog } from "@mui/material";
import PersonalInfoForm from "./PersonalInfoForm";
import { Form, Formik } from "formik";
import { profileValidationSchema } from "@/utils/schemas";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function PersonalInfoModal({
    open,
    onClose,
    initialValues
}: DialogFuncProps & { initialValues: ProfileFormValues }) {
    

    const handleSubmit = (_values: any, _actions: any) => {
        // TODO: Remove underscores when integrating API
    }

     useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset'; // or 'auto'
        }
        return () => {
            document.body.style.overflow = 'unset'; // Clean up on unmount
        };
    }, [open]);

    return (
        <Dialog
            onClose={(_event, reason) => {
                if (reason !== 'backdropClick') {
                    onClose()
                }
            }}
            open={open}
            disableScrollLock
            sx={{
                "& .MuiDialog-paper": {
                    overflow: "hidden",
                    width: {
                        xs: "92%",
                        md: "38.25rem",
                    },
                    margin: "0 auto",
                    position: "relative"
                },
            }}
        >
            <Formik
                initialValues={initialValues}
                validationSchema={profileValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, isValid }) => (
                    <div className="flex flex-col h-[80vh] w-full bg-white rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center px-20 py-6">
                            <h3 className="text-2xl text-aciu-dark">Edit Personal Info</h3>
                            <button onClick={onClose}>
                                <X size={24} color="#3E3E3E" />
                            </button>
                        </div>

                    <div className="flex-1 overflow-y-auto px-20 py-10">
                        <Form className="flex flex-col gap-10">
                            <PersonalInfoForm />
                        </Form>
                    </div>

                    <div className="w-full px-20 py-6">
                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className="bg-aciu-green-normal rounded p-4 font-coolvetica text-white w-full"
                        >
                        {isSubmitting ? (
                            <>
                                <CircularProgress size={12} className="mr-2" />
                                Saving...
                            </>
                        ) : (
                            "Save Changes"
                        )}
                        </button>
                    </div>
                    </div>
                )}
                </Formik>
        </Dialog>
    )
}