import FormikField from "@/components/FormikField"
import { changePasswordSchema } from "@/utils/schemas"
import type { DialogFuncProps } from "@/utils/types"
import { CircularProgress, Dialog } from "@mui/material"
import { Form, Formik } from "formik"
import { X } from "lucide-react"

const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
}

export default function ChangePassword({
    open,
    onClose
}: DialogFuncProps) {
    const handleSubmit = (_values: any, _actions: any) => {
        // TODO: Remove underscores when integrating API
    }

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
                validationSchema={changePasswordSchema}
                onSubmit={handleSubmit}
                validateOnMount
            >
                {({ isSubmitting, isValid }) => (
                    <div className="relative flex flex-col gap-8 h-4/5 w-full bg-white rounded-lg overflow-hidden">
                        <div className="flex justify-between items-center px-20 pt-10.5">
                            <h3 className="text-2xl text-aciu-dark">Change Password</h3>
                            
                        </div>
                        <button className="absolute top-7.5 right-8" onClick={onClose}>
                            <X size={24} color="#3E3E3E" />
                        </button>
                        <div className="flex-1 overflow-y-auto px-20 pb-10 w-full">
                            <Form className="flex flex-col gap-10">
                                <FormikField 
                                    label="Old password"
                                    name="oldPassword"
                                    type="password"
                                    placeholder="Type in your old password"
                                    fullWidth
                                />
                                <FormikField 
                                    label="New password"
                                    name="newPassword"
                                    type="password"
                                    placeholder="Type in your new password"
                                    fullWidth
                                />
                                <FormikField 
                                    label="Confirm password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Re-type your new password"
                                    fullWidth
                                />
                            </Form>
                        </div>

                        <div className="w-full px-20 pb-6">
                            <button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                                className="bg-aciu-green-normal disabled:bg-aciu-card-grey disabled:text-aciu-grey 
                                rounded-xl p-4 font-coolvetica text-white w-full"
                            >
                            {isSubmitting ? (
                                <>
                                    <CircularProgress size={12} className="mr-2" />
                                    Saving...
                                </>
                            ) : (
                                "Change Password"
                            )}
                            </button>
                        </div>
                    </div>
                )}
            </Formik>
        </Dialog>
    )
}