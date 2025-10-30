import { publicationStatuses } from "./data";
import type { PublicationDataType } from "./types";
import { format } from "date-fns";

export const capitalizeFirstLetters = (str: string) => {
    return str
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export const formatDate = (iso: string) => format(new Date(iso), "dd MMM yyyy");

export function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

export function generateMockPublications(count: number): PublicationDataType[] {
  return Array.from({ length: count }, (_, i) => {
    const creation = randomDate(new Date(2022, 0, 1), new Date(2023, 0, 1));
    const modified = randomDate(new Date(2023, 0, 2), new Date());

    return {
      id: `${i + 1}`,
      title: `Publication ${i + 1}`,
      creationDate: creation.toISOString(),
      postImpressions: {
        comments: Math.floor(Math.random() * 200),
        views: Math.floor(Math.random() * 300)
      },
      lastModified: modified.toISOString(),
      status: publicationStatuses[Math.floor(Math.random() * publicationStatuses.length)],
    };
  });
}

export const publicationStatusMap: Record<PublicationDataType["status"], { 
    label: string, 
    labelColor: string, 
    dotColor: string, 
    bgColor: string }> = {
    published: { 
        label: "Published", 
        labelColor: "#027A48", 
        dotColor: "#12B76A", 
        bgColor: "#ECFDF3" 
    },
    "pending approval": {
        label: "Pending Approval",
        labelColor: "#FE961F",
        dotColor: "#FE961F",
        bgColor: "#FAF5EF"
    },
    rejected: {
        label: "Rejected",
        labelColor: "#FF2E2E",
        dotColor: "#FF2E2E",
        bgColor: "#FFEAEA"
    },
    draft: {
        label: "Draft",
        labelColor: "#3E3E3E",
        dotColor: "#3E3E3E",
        bgColor: "#E5E5E5"
    }

}

export const getExtension = (file: File) => {
  const name = file.name;
  const parts = name.split(".");
  return parts.length > 1 ? parts.pop()!.toLowerCase() : "";
};

export const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};


export function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}
