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
        const scrollContainer = document.querySelector<HTMLElement>('main');
        if (!scrollContainer) return;

        scrollContainer.style.overflow = open ? "hidden" : "";
        return () => {
            scrollContainer.style.overflow = "";
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
            disableScrollLock={false}
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
                    <div className="relative flex flex-col gap-8 h-4/5 w-full bg-white rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center px-6 pt-5 lg:px-20 lg:pt-10.5">
                            <h3 className="text-xl md:text-2xl text-aciu-dark">Edit Personal Info</h3>
                            
                        </div>
                        <button className="absolute top-5 lg:top-7.5 right-8" onClick={onClose}>
                            <X size={24} color="#3E3E3E" />
                        </button>
                        <div className="flex-1 overflow-y-auto px-6 lg:px-20 pb-10">
                            <Form className="flex flex-col gap-10">
                                <PersonalInfoForm />
                            </Form>
                        </div>

                        <div className="w-full px-6 lg:px-20 pb-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className="bg-aciu-green-normal rounded-xl p-4 font-coolvetica text-white w-full"
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