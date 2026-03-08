import { lazy, Suspense } from "react";
import { Buildings2, Calendar2, DollarSquare, FolderOpen, Hashtag, Personalcard, Setting, I24Support, Stickynote, Activity } from "iconsax-react";
import { RequireRole } from "./RequireRole";
import { Outlet } from "react-router-dom";
import { DelayedLoader } from "@/components/PageLoader";

const Dashboard = lazy(() => import("../pages/dashboard"));
const MyPaymentsPage = lazy(() => import("@/pages/my-payment"));
const EventsPage = lazy(() => import("@/pages/events"));
const EventsList = lazy(() => import("@/pages/events/components/EventsList"));
const EventDetails = lazy(() => import("@/pages/events/components/EventDetails"));
const AddEventPage = lazy(() => import("@/pages/my-branch/components/tabs/branch-events/add-event"));
const ProjectsPage = lazy(() => import("@/pages/projects"));
const ProjectDetailsPage = lazy(() => import("@/pages/projects/components/details/ProjectDetailsPage"));
const BlogPage = lazy(() => import("@/pages/blog"));
const BlogPostForm = lazy(() => import("@/pages/blog/components/blog-posts/BlogPostForm"));
const PostViewPage = lazy(() => import("@/pages/blog/components/blog-posts/PostViewPage"));
const SubmissionViewPage = lazy(() => import("@/pages/blog/components/submissions/SubmissionViewPage"));
const ResourcesPage = lazy(() => import("@/pages/resources"));
const HelpAndSupportPage = lazy(() => import("@/pages/help-and-support"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const Analytics = lazy(() => import("@/pages/analytics"));
const Transactions = lazy(() => import("@/pages/transactions"));
const Database = lazy(() => import("@/pages/database"));
const BranchDetails = lazy(() => import("@/pages/database/branches/branch-details"));
const BranchPage = lazy(() => import("@/pages/branch"));

export const protectedRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    label: "Dashboard",
    icon: Personalcard,
    roles: ["member", "branch_admin", "national_admin"],
  },
  {
    path: "/analytics",
    element: <Analytics />,
    label: "Analytics",
    icon: Activity,
    roles: ["national_admin"],
  },
  {
    path: "/transactions",
    element: <Transactions />,
    label: "Transactions",
    icon: DollarSquare,
    roles: ["national_admin"],
  },
  {
    path: "/database",
    label: "ACIU Database",
    icon: Hashtag,
    roles: ["national_admin"],
    children: [
      { index: true, element: <Database /> },
      { path: "branch/:id", element: <BranchDetails /> },
    ],
  },
  {
    path: "/my-payments",
    element: <MyPaymentsPage />,
    label: "My Payments",
    icon: DollarSquare,
    roles: ["member", "branch_admin"],
  },
  {
    path: "/events",
    element: <EventsPage />,
    label: "ACIU Events",
    icon: Calendar2,
    roles: ["member", "branch_admin", "national_admin"],
    children: [
      { index: true, element: <EventsList /> },
    ],
  },
  {
    path: "/events/create",
    element: <AddEventPage />,
    roles: ["national_admin"],
  },
  {
    path: "/events/:eventId/edit",
    element: <AddEventPage />,
    roles: ["national_admin"],
  },
  {
    path: "/events/:id",
    element: <EventDetails />,
    roles: ["member", "branch_admin", "national_admin"],
  },
  {
    path: "/projects",
    label: "ACIU Projects",
    icon: Buildings2,
    roles: ["member", "branch_admin", "national_admin"],
    children: [
      { index: true, element: <ProjectsPage /> },
      { path: ":id", element: <ProjectDetailsPage /> },
    ],
  },
  {
    path: "/my-branch",
    label: "My Branch",
    icon: Hashtag,
    roles: ["member", "branch_admin"],
    children: [
      { index: true, element: <BranchPage /> },
    ],
  },
  {
    path: "/my-branch/add-event",
    element: <AddEventPage />,
    roles: ["branch_admin"],
  },
  {
    path: "/blog",
    label: "ACIU Blog",
    icon: Stickynote,
    roles: ["member", "branch_admin", "national_admin"],
    children: [
      { index: true, element: <BlogPage /> },
      { path: "create", element: <BlogPostForm type="create" /> },
      { path: "posts/:id", element: <PostViewPage /> },
      { path: "posts/:id/edit", element: <BlogPostForm type="edit" /> },
      { path: "submissions/:id", element: <SubmissionViewPage /> },
    ],
  },
  {
    path: "/resources",
    element: <ResourcesPage />,
    label: "ACIU Resources",
    icon: FolderOpen,
    roles: ["member", "branch_admin", "national_admin"],
  },
  {
    path: "/support",
    element: <HelpAndSupportPage />,
    label: "Help and Support",
    icon: I24Support,
    roles: ["member", "branch_admin", "national_admin"],
  },
  {
    path: "/settings",
    element: <SettingsPage />,
    label: "Settings",
    icon: Setting,
    roles: ["member", "branch_admin", "national_admin"],
  },
];


// Permissions enforcement
const wrapWithRoleGuard = (route: any): any => {
  if (route.children) {
    return {
      ...route,
      element: route.roles
        ? <RequireRole roles={route.roles}>{route.element ?? <Suspense fallback={<DelayedLoader />}><Outlet /></Suspense>}</RequireRole>
        : route.element,
      children: route.children.map(wrapWithRoleGuard),
    };
  }

  return {
    ...route,
    element: route.roles
      ? <RequireRole roles={route.roles}>{route.element}</RequireRole>
      : route.element,
  };
};

export const guardedRoutes = protectedRoutes.map(wrapWithRoleGuard);
