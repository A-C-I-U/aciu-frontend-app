import { Buildings2, Calendar2, DollarSquare, FolderOpen, Hashtag, Personalcard, Setting, I24Support, Stickynote } from "iconsax-react";
import Dashboard from "../pages/dashboard";
import MyPaymentsPage from "@/pages/my-payment";
import EventsPage from "@/pages/events";
import ProjectsPage from "@/pages/projects";
import MyBranchPage from "@/pages/my-branch";
import BlogPage from "@/pages/blog";
import ResourcesPage from "@/pages/resources";
import HelpAndSupportPage from "@/pages/help-and-support";
import SettingsPage from "@/pages/settings";
import EventDetails from "@/pages/events/components/EventDetails";
import EventsList from "@/pages/events/components/EventsList";


export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: Personalcard,
    roles: ["member", "branch-admin", "national-admin"],
  },
  {
    path: "/my-payments",
    element: <MyPaymentsPage />,
    label: "My Payments",
    icon: DollarSquare,
    roles: ["member", "branch-admin", "national-admin"],
  },
  {
    path: "/events",
    element: <EventsPage />,
    label: "ACIU Events",
    icon: Calendar2,
    roles: ["branch-admin", "national-admin"],
    children: [
      {
        index: true,
        element: <EventsList />
      },
      {
        path: ":id",
        element: <EventDetails />,
      }
    ]
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
    label: "ACIU Projects",
    icon: Buildings2,
    roles: ["branch-admin", "national-admin"],
  },
    {
    path: "/my-branch",
    element: <MyBranchPage />,
    label: "My Branch",
    icon: Hashtag,
    roles: ["member", "branch-admin", "national-admin"],
  },
    {
    path: "/blog",
    element: <BlogPage />,
    label: "ACIU Blog",
    icon: Stickynote,
    roles: ["branch-admin", "national-admin"],
  },
    {
    path: "/resources",
    element: <ResourcesPage />,
    label: "ACIU Resources",
    icon: FolderOpen,
    roles: ["branch-admin", "national-admin"],
  },
  {
    path: "/support",
    element: <HelpAndSupportPage />,
    label: "Help and Support",
    icon: I24Support,
    roles: ["member", "branch-admin", "national-admin"],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    label: "Settings",
    icon: Setting,
    roles: ["member", "branch-admin", "national-admin"],
  },
];
