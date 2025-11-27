import { Divider, Skeleton } from "@mui/material";
import NotificationCategory from "./NotificationCategory";
import { useUserSettings, useUpdateNotifications } from "@/services/hooks/settings";
import { enqueueSnackbar } from "notistack";
import { useCallback } from "react";

export default function NotificationSettings() {
  const { data: userSettings, isLoading, error } = useUserSettings();
  const updateNotificationsMutation = useUpdateNotifications();

  const handleToggleUpdate = useCallback(async (field: string, value: boolean) => {
    if (!userSettings?.notifications) return;

    try {
      const payload = {
        emailNotifications: userSettings.notifications.emailNotifications,
        smsNotifications: userSettings.notifications.smsNotifications,
        pushNotifications: userSettings.notifications.pushNotifications,
        newsUpdates: userSettings.notifications.newsUpdates,
        importantNotifications: userSettings.notifications.importantNotifications,
        criticalAlerts: userSettings.notifications.criticalAlerts,
        transactionUpdates: userSettings.notifications.transactionUpdates,
        commentReplies: userSettings.notifications.commentReplies,
        newPosts: userSettings.notifications.newPosts,
        [field]: value, 
      };

      const result = await updateNotificationsMutation.mutateAsync(payload);
      
      enqueueSnackbar(result.message || 'Notification setting updated successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to update notification setting';
      enqueueSnackbar(errorMessage, {
        variant: 'error',
      });
    }
  }, [userSettings, updateNotificationsMutation]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8 lg:gap-6">
        <div className="lg:pl-10 hidden lg:flex flex-col gap-2">
          <Skeleton variant="text" width={200} height={32} />
          <Skeleton variant="text" width={300} height={24} />
        </div>
        <Divider orientation="horizontal" flexItem className="hidden lg:block"/>
        <div className="flex flex-col gap-3 px-3 lg:px-10">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-6 lg:gap-11 py-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2 flex-1">
                  <Skeleton variant="text" width={150} height={24} />
                  <Skeleton variant="text" width={250} height={20} />
                </div>
                <Skeleton variant="rounded" width={48} height={24} />
              </div>
              <Divider orientation="horizontal" className="text-aciu-white-dark" />
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-4">
                <div className="flex flex-col gap-2">
                  <Skeleton variant="text" width={120} height={24} />
                  <Skeleton variant="text" width={200} height={20} />
                </div>
                <div className="flex flex-col gap-5">
                  {[...Array(2)].map((_, optIndex) => (
                    <div key={optIndex} className="flex justify-between">
                      <div className="flex flex-col gap-2 flex-1">
                        <Skeleton variant="text" width={100} height={20} />
                        <Skeleton variant="text" width={150} height={16} />
                      </div>
                      <Skeleton variant="rounded" width={48} height={24} />
                    </div>
                  ))}
                </div>
              </div>
              <Divider orientation="horizontal" className="text-aciu-white-dark" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load notification settings. Please try again.
      </div>
    );
  }

  const notifications = userSettings?.notifications;

  return (
    <div className="flex flex-col gap-8 lg:gap-6">
      <div className="lg:pl-10 hidden lg:flex flex-col gap-2">
        <p className="lg:text-xl font-semibold leading-5 text-aciu-border-grey">
          Notification Settings
        </p>
        <p className="text-sm lg:text-base">
          Choose how and where you receive updates from ACIU.
        </p>
      </div>
      <Divider orientation="horizontal" flexItem className="hidden lg:block"/>
      <div className="flex flex-col gap-3 px-3 lg:px-10">
        <NotificationCategory 
          heading="Email Notifications"
          subtext="Get emails to find out what's going on when you are offline. You can turn them off anytime."
          enabled={notifications?.emailNotifications || false}
          onToggle={(checked) => handleToggleUpdate('emailNotifications', checked)}
          section={{
            title: "Notifications From Us",
            description: "Receive the latest updates and news from us.",
            options: [
              {
                label: "News and Updates",
                description: "Get the latest news about products and features.",
                fieldName: "newsUpdates",
                checked: notifications?.newsUpdates || false,
                onChange: (field, value) => handleToggleUpdate(field, value)
              },
              {
                label: "Important Notifications",
                description: "Receive alerts about critical account activities.",
                fieldName: "importantNotifications",
                checked: notifications?.importantNotifications || false,
                onChange: (field, value) => handleToggleUpdate(field, value)
              },
            ]
          }}
        />

        <NotificationCategory 
          heading="SMS Notifications"
          subtext="Get important notifications via text messages, such as login alerts and transaction updates."
          enabled={notifications?.smsNotifications || false}
          onToggle={(checked) => handleToggleUpdate('smsNotifications', checked)}
          section={{
            title: "Customize Your SMS Alerts",
            description: "Choose which SMS notifications you'd like to receive, including critical account alerts and transaction updates.",
            options: [
              {
                label: "Critical Alerts Only",
                description: "Receive SMS for important actions like login attempts or password changes.",
                fieldName: "criticalAlerts",
                checked: notifications?.criticalAlerts || false,
                onChange: (field, value) => handleToggleUpdate(field, value)
              },
              {
                label: "Transaction Updates",
                description: "Receive SMS for every successful or failed transaction.",
                fieldName: "transactionUpdates",
                checked: notifications?.transactionUpdates || false,
                onChange: (field, value) => handleToggleUpdate(field, value)
              },
            ]
          }}
        />

        <NotificationCategory 
          heading="Push Notifications"
          subtext="Control which notifications you receive directly on your device."
          enabled={notifications?.pushNotifications || false}
          onToggle={(checked) => handleToggleUpdate('pushNotifications', checked)}
          section={{
            title: "Tailor Your Push Notifications",
            description: "Select the types of notifications you want to receive, from general updates to comments.",
            options: [
              {
                label: "Comments Replies",
                description: "Receive a notification when someone replies a comment on our blog.",
                fieldName: "commentReplies",
                checked: notifications?.commentReplies || false,
                onChange: (field, value) => handleToggleUpdate(field, value)
              },
              {
                label: "New Post",
                description: "Get notified when a member makes a post on ACIU Blog.",
                fieldName: "newPosts",
                checked: notifications?.newPosts || false,
                onChange: (field, value) => handleToggleUpdate(field, value)
              }
            ]
          }}
        />
      </div>
    </div>
  );
}