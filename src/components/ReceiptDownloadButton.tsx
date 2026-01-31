import { PDFDownloadLink } from '@react-pdf/renderer';
import { CircularProgress } from '@mui/material';
import type { ReceiptDownloadButtonProps } from '@/services/types/receipt';
import ReceiptTemplate from './ReceiptTemplate';
import { duesReceiptConfig, eventDonationReceiptConfig, projectDonationReceiptConfig } from '@/utils/helpers';


export default function ReceiptDownloadButton({ 
    data, 
    type, 
}: ReceiptDownloadButtonProps) {
    const configs = {
        // withdrawal: withdrawalRequestSchema;
        dues: duesReceiptConfig,
        projectDonation: projectDonationReceiptConfig,
        eventDonation: eventDonationReceiptConfig,
    };
    
    const config = configs[type];
    console.log(data)

    return (
        <PDFDownloadLink
            document={
                <ReceiptTemplate
                    config={config}
                    data={data}
                />
            }
            fileName={`${type}-receipt.pdf`}
        >
            {({ loading }) => (
                <button 
                    className={`btn btn-primary w-full`}
                    disabled={loading || !data}
                >
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
                </button>
            )}
        </PDFDownloadLink>
    );
}