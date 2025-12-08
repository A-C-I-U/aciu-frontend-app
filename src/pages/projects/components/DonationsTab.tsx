import { DonateIcon } from "@/components/Icons";
import type { ProjectDonation } from "@/services/types/projects";
import { timeAgo } from "@/utils/helpers";
import { useState } from "react";

export const DonationsTab = ({
  donations,
}: {
  donations: ProjectDonation[];
}) => {
  const [showAll, setShowAll] = useState(false);

  const displayedDonations = showAll ? donations : donations.slice(0, 5);

  const getDonationDate = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="flex flex-col gap-6.5">
      {displayedDonations.length > 0 ? (
        <>
          {displayedDonations.map((donation, index) => (
            <div key={index}>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div className="rounded-full bg-aciu-light-grey w-10 h-10 flex items-center justify-center">
                    <DonateIcon />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium text-xs md:text-sm text-aciu-abriba">
                      {donation.DonorName} Donated
                    </p>
                    <p className="font-semibold text-xs text-aciu-border-grey">
                      {formatCurrency(donation.Amount)}
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm italic">
                  {timeAgo(getDonationDate(donation.DaysAgo))}
                </p>
              </div>
              {index < displayedDonations.length - 1 && (
                <hr className="w-full border-t-[.5px] text-aciu-dark-grey mt-6.5" />
              )}
            </div>
          ))}

          {donations.length > 5 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-aciu-green-normal font-coolvetica font-semibold text-sm hover:underline"
              >
                {showAll
                  ? "See Less"
                  : `See More (${donations.length - 5} more)`}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-8">
          <p className="text-aciu-abriba">
            No donations yet. Be the first to donate!
          </p>
        </div>
      )}
    </div>
  );
};
