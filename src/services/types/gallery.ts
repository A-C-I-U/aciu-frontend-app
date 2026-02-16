export const GalleryCategory = {
    BRANCH_MEETINGS: "Branch Meetings",
    NATIONAL_EVENTS: "National Events",
} as const;

export type GalleryCategory = typeof GalleryCategory[keyof typeof GalleryCategory];


export interface GalleryItem {
    id: string;
    branchId: string;
    fileUrl: string;
    fileName: string;
    category: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface GalleryResponse {
    gallery: GalleryItem[];
}

export interface SingleGalleryResponse {
    galleryItem: GalleryItem;
}

export interface UploadGalleryResponse {
    message: string;
    newGallery: GalleryItem[];
}

export interface DeleteGalleryResponse {
    message: string;
}
