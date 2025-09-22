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