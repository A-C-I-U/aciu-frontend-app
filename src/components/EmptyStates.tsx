import { Document } from "iconsax-react"

type EmptyTableProps = {
  isFiltered?: boolean;
  title?: string;
  description?: string;
};

export const EmptyMemberActivity = () => {
    return (
        <div className="flex flex-col gap-2 h-full w-full min-h-80 justify-center items-center">
            <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No Member Activity Yet
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba max-w-70 text-center">
                Member has not had activity on the platform.
            </p>
        </div>
    )
}


export const EmptyPaymentsState = () => {
    return (
        <div className="flex flex-col gap-2 h-full min-h-80 w-full justify-center items-center">
             <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No Payments Found Yet
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba max-w-70 text-center">
                Member has not made any payments on the platform.
            </p>
        </div>
    )
}

export const EmptyRecords = () => {
    return (
        <div className="flex flex-col gap-2 h-full min-h-80 w-full items-center justify-center">
            <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
                <Document size={32} color="#737373" variant="Linear"/>
            </div>
            <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
                No Records Found
            </p>
            <p className="text-xs md:text-sm text-aciu-abriba  max-w-70 text-center">
                There are no records available at the moment. Once activities are logged, they will appear here.
            </p>
        </div>
    )
}


export const EmptyTable = ({
  isFiltered = false,
  title,
  description
}: EmptyTableProps) => {
  const defaultTitle = isFiltered ? "No results found" : "No data available";
  const defaultDescription = isFiltered
    ? "We couldn't find any items matching your search."
    : "The table is currently empty.";

  return (
    <div className="flex flex-col gap-2 h-full min-h-80 w-full items-center justify-center">
      <div className="w-15 h-15 shadow-[0px_4px_50px_0px_#0000001A] flex items-center justify-center">
        <Document size={32} color="#737373" variant="Linear" />
      </div>
      <p className="text-sm md:text-base font-semibold text-aciu-border-grey">
        {title ?? defaultTitle}
      </p>
      <p className="text-xs md:text-sm text-aciu-abriba max-w-70 text-center">
        {description ?? defaultDescription}
      </p>
    </div>
  );
};
