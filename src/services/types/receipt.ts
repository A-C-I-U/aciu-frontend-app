import type { StatusMap } from "@/utils/helpers";

export interface ReceiptField {
    label: string;
    key: string;
    format?: (value: any) => string | React.ReactElement | StatusMap;
    hideIfEmpty?: boolean;
}

export interface ReceiptConfig {
    title: string;
    fields: ReceiptField[];
}

export interface ReceiptDownloadButtonProps {
    data: any;
    type: 'dues' | 'eventDonation' | 'projectDonation' | 'withdrawalRequest';
}