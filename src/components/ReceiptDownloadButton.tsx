import { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CircularProgress } from '@mui/material';
import type { ReceiptDownloadButtonProps } from '@/services/types/receipt';
import ReceiptTemplate from './ReceiptTemplate';
import { duesReceiptConfig, eventDonationReceiptConfig, getPaymentOutcome, projectDonationReceiptConfig, withdrawalReceiptConfig } from '@/utils/helpers';

const shouldShowReceiptButton = (status?: string) =>
  !!getPaymentOutcome(status);

export default function ReceiptDownloadButton({ data, type }: ReceiptDownloadButtonProps) {
  const configs = {
    withdrawalRequest: withdrawalReceiptConfig,
    dues: duesReceiptConfig,
    projectDonation: projectDonationReceiptConfig,
    eventDonation: eventDonationReceiptConfig,
  };

  const config = configs[type];

  if (!data || !shouldShowReceiptButton(data.status)) return null;

  const [loadingHint, setLoadingHint] = useState(false);

  return (
    <div className="px-5.5 py-4 flex items-center gap-2 border-t border-gray-200 shrink-0">
      <PDFDownloadLink
        document={<ReceiptTemplate config={config} data={data} />}
        fileName={`${data.transactionId}-receipt.pdf`}
        className="btn btn-primary w-full inline-flex items-center justify-center gap-2 active:scale-[.997]"
        onClick={() => {
          setLoadingHint(true);
          setTimeout(() => setLoadingHint(false), 1500);
        }}
      >
        {({ loading }) => (
          <>
            {(loading || loadingHint) ? (
              <>
                Generating...
                <CircularProgress size={16} color='inherit' />
              </>
            ) : (
              <>Download Receipt</>
            )}
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
}