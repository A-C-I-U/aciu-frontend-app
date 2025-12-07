import { 
  Buildings2, 
  Calendar2, 
  DollarSquare, 
  FolderOpen, 
  Hashtag, 
  Personalcard, 
  Setting, 
  I24Support, 
  Stickynote 
} from "iconsax-react";
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
import BlogPostForm from "@/pages/blog/components/blog-posts/BlogPostForm";
import ProjectDetailsPage from "@/pages/projects/components/ProjectDetailsPage";
import SubmissionViewPage from "@/pages/blog/components/submissions/SubmissionViewPage";
import PostViewPage from "@/pages/blog/components/blog-posts/PostViewPage";
import AddEventPage from "@/pages/my-branch/components/tabs/branch-events/add-event";


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
    label: "ACIU Projects",
    icon: Buildings2,
    roles: ["branch-admin", "national-admin"],
    children: [
      {
        index: true,
        element: <ProjectsPage />
      },
      {
        path: ":id",
        element: <ProjectDetailsPage />
      }
    ]
  },
    {
    path: "/my-branch",
    label: "My Branch",
    icon: Hashtag,
    roles: ["member", "branch-admin", "national-admin"],
    children: [
      {
        index: true,
        element: <MyBranchPage />
      },
      {
        path: "add-event",
        element: <AddEventPage />
      }
    ]
  },
    {
    path: "/blog",
    label: "ACIU Blog",
    icon: Stickynote,
    roles: ["branch-admin", "national-admin"],
    children: [
      {
        index: true,
        element: <BlogPage />
      },
      {
        path: "create",
        element: <BlogPostForm type="create"/>
      },
      {
        path: "posts/:slug",
        element: <PostViewPage />
      },
      {
        path: "posts/:slug/edit",
        element: <BlogPostForm type="edit"/>
      },
      {
        path: "submissions/:id",
        element: <SubmissionViewPage />
      }
    ]
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
