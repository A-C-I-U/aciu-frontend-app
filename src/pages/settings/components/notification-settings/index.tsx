import { Divider } from "@mui/material";
import { Form, Formik, type FormikHelpers } from "formik";
import NotificationCategory from "./NotificationCategory";

const initialValues = {
    newsAndUpdates: false,
    importantNotifications: false,
    criticalAlerts: false,
    transactionUpdates: false,
    accountAlerts: false,
    commentsAndReplies: false,
    newPost: false
}

type NotificationSettingsType = typeof initialValues;

export default function NotificationSettings() {
    const handleSubmit = async (_values: typeof initialValues, _actions: FormikHelpers<NotificationSettingsType>) => {
        // TODO: Remove underscores once API is integrated
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
        >
            {({ values, setFieldValue }) => (
                <Form>
                    <div className="flex flex-col gap-6">
                        <div className="lg:pl-10 flex flex-col gap-2">
                            <p className="lg:text-xl font-semibold leading-5 text-aciu-border-grey">
                                Notification Settings
                            </p>
                            <p className="text-sm lg:text-base">
                                Choose how and where you receive updates from ACIU.
                            </p>
                        </div>
                        <Divider orientation="horizontal" flexItem />
                        <div className="flex flex-col gap-3 px-3 lg:px-10">
                            <NotificationCategory 
                                heading="Email Notifications"
                                subtext="Get emails to find out what’s going on when you are offline. You can turn them off anytime."
                                section={{
                                    title: "Notifications From Us",
                                    description: "Receive the latest updates and news from us.",
                                    options: [
                                    {
                                        label: "News and Updates",
                                        description: "Get the latest news about products and features.",
                                        fieldName: "newsAndUpdates",
                                        checked: values.newsAndUpdates,
                                        onChange: setFieldValue
                                    },
                                    {
                                        label: "Important Notifications",
                                        description: "Receive alerts about critical account activities.",
                                        fieldName: "importantNotifications",
                                        checked: values.importantNotifications,
                                        onChange: setFieldValue
                                    },
                                ]}}
                            />

                                <NotificationCategory 
                                    heading="SMS Notifications"
                                    subtext="Get important notifications via text messages, such as login alerts and transaction updates."
                                    section={{
                                        title: "Customize Your SMS Alerts",
                                        description: "Choose which SMS notifications you’d like to receive, including critical account alerts and transaction updates.",
                                        options: [
                                        {
                                            label: "Critical Alerts Only",
                                            description: "Receive SMS for important actions like login attempts or password changes.",
                                            fieldName: "criticalAlerts",
                                            checked: values.criticalAlerts,
                                            onChange: setFieldValue
                                        },
                                        {
                                            label: "Transaction Updates",
                                            description: "Receive SMS for every successful or failed transaction.",
                                            fieldName: "transactionUpdates",
                                            checked: values.transactionUpdates,
                                            onChange: setFieldValue
                                        },
                                    ]}}
                                />

                                <NotificationCategory 
                                    heading="Push Notifications"
                                    subtext="Control which notifications you receive directly on your device."
                                    section={{
                                        title: "Tailor Your Push Notifications",
                                        description: "Select the types of notifications you want to receive, from general updates to comments.",
                                        options: [
                                        {
                                            label: "Account Alerts",
                                            description: "Real-time alerts for account activity, such as session logins.",
                                            fieldName: "accountAlerts",
                                            checked: values.accountAlerts,
                                            onChange: setFieldValue
                                        },
                                        {
                                            label: "Comments Replies",
                                            description: "Receive a a notification when someone replies a comment on our blog.",
                                            fieldName: "commentsReplies",
                                            checked: values.commentsAndReplies,
                                            onChange: setFieldValue
                                        },
                                        {
                                            label: "New Post",
                                            description: "Get notified when a member makes a post on ACIU Blog.",
                                            fieldName: "newPost",
                                            checked: values.newPost,
                                            onChange: setFieldValue
                                        }
                                    ]}}
                                />
                        </div>
                    </div>
                    <div className="p-7 flex justify-end w-full">
                        <button 
                            className="p-4 rounded-xl bg-color-red-100 font-coolvetica text-white"
                            type="submit"
                        >
                            Reset Changes
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
        
    )
}