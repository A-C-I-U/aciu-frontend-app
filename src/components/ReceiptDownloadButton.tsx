import { PDFDownloadLink } from '@react-pdf/renderer';
import { CircularProgress } from '@mui/material';
import type { ReceiptDownloadButtonProps } from '@/services/types/receipt';
import ReceiptTemplate from './ReceiptTemplate';
import { duesReceiptConfig, eventDonationReceiptConfig, projectDonationReceiptConfig, RECEIPT_STATUS_MAP, withdrawalReceiptConfig } from '@/utils/helpers';

const SUCCESS_STATUSES = ['completed', 'published', 'approved', 'verified', 'active'];

export default function ReceiptDownloadButton({ 
    data, 
    type, 
}: ReceiptDownloadButtonProps) {
    const configs = {
        withdrawalRequest: withdrawalReceiptConfig,
        dues: duesReceiptConfig,
        projectDonation: projectDonationReceiptConfig,
        eventDonation: eventDonationReceiptConfig,
    };
    
    const config = configs[type];

    if (!data) {
        return (
            <button className='btn btn-primary' disabled>
                <CircularProgress size={16} />
                Generating...
            </button>
        );
    }

    if (!canGenerateReceipt(data.status)) {
        return (
            <button className='btn btn-primary w-full opacity-50 cursor-not-allowed' disabled>
                Receipt not available
            </button>
        );
    }

    return (
        <PDFDownloadLink
            document={
                <ReceiptTemplate config={config} data={data} />
            }
            fileName={`${data?.transactionId}-receipt.pdf`}
            className={`
                    btn btn-primary w-full inline-flex items-center justify-center gap-2
                    ${!data ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''}
                `}
            aria-disabled={!data}
        >
            {({ loading }) => (
                <>
                    {loading ? (
                        <>
                            <CircularProgress size={16} />
                            Generating...
                        </>
                    ) : (
                        <>
                            Download Receipt
                        </>
                    )}
                </>
            )}
        </PDFDownloadLink>
    );
}

const canGenerateReceipt = (status: keyof typeof RECEIPT_STATUS_MAP) => {
  return SUCCESS_STATUSES.includes(status);
};