import FormikField from "@/components/FormikField";
import { NotificationBell } from "@/components/Icons";
import { ScrollLock } from "@/components/ScrollLock";
import type { DialogFuncProps } from "@/utils/types";
import { Dialog } from "@mui/material";
import { Form, Formik } from "formik";

const dialogSx = {
    "& .MuiDialog-paper": {
        overflow: "hidden",
        width: { xs: "92%", md: "31.25rem" },
        margin: "0 auto",
        borderRadius: "1.25rem",
    },
}

export default function DuesReminder({
    open,
    onClose,
}: DialogFuncProps) {

    const handleSubmit = (_values: any, _actions: any) => {
        // Prompt toast on success
    }


    return (
        <>
            <ScrollLock open={open} />
            <Dialog
                open={open}
                onClose={onClose}
                sx={dialogSx}
            >
                <div className="flex flex-col p-7.5 gap-5.5">
                    <NotificationBell width={66} height="auto" />
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <h1 className="success-modal-title">Dues Reminder</h1>
                            <p className="text-aciu-neutral">
                                Select the dues you want to send out reminders for and the members will receive email notifications.
                            </p>
                        </div>
                        <Formik
                            initialValues={{ dueType: "" }}
                            onSubmit={handleSubmit}
                        >
                            {({
                               isSubmitting 
                            }) => {
                                return (
                                    <Form className="flex flex-col gap-5.5">
                                        <FormikField 
                                            label="Due Type"
                                            name="dueType"
                                            placeholder="Due Type"
                                            options={[
                                                { value: "monthly-due", label: "Monthly Dues" }
                                            ]}
                                            select
                                            fullWidth
                                        />
                                        <button 
                                            className="btn btn-primary"
                                            disabled={isSubmitting}
                                        >
                                            Send out Reminder
                                        </button>
                                    </Form>
                                )}}
                        </Formik>
                    </div>
                </div>
            </Dialog>
        </>
    )
}