import Divider from "@mui/material/Divider";
import { StatusBadge } from "./StatusBadge";
import type { FieldConfig, StatusConfig } from "@/utils/types";

interface MobileItemCardProps<T> {
    item: T;
    fields: FieldConfig<T>[];
    status?: StatusConfig;
    actionLabel?: string;
    onActionClick?: () => void;
}

export default function MobileItemCard<T>({
    item,
    fields,
    status,
    actionLabel,
    onActionClick,
}: MobileItemCardProps<T>) {
  return (
    <div className="w-full py-4.5 flex flex-col gap-4 items-center rounded-[.625rem] border border-grayscale-200">

        <div className="flex justify-between items-center w-full px-3">
            <div className="flex flex-col gap-2 w-full">
                <p className="text-xs text-aciu-abriba font-medium">
                    {fields[0].label}
                </p>
                <p className="text-sm text-aciu-border-grey overflow-hidden ellipsis">
                    {fields[0].value(item)}
                </p>
            </div>

            {status && (
                <StatusBadge
                    label={status.label}
                    labelColor={status.labelColor}
                    bgColor={status.bgColor}
                    dotColor={status.dotColor}
                />
            )}
        </div>

        {fields.slice(1).map((field, index) => (
            <div key={index} className="w-full flex flex-col gap-4">
                <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey" />

                <div className="flex justify-between w-full items-center px-3">
                    <p className="text-xs font-medium text-aciu-abriba">{field.label}</p>

                    <p 
                        className="text-sm text-aciu-border-grey truncate max-w-25"
                        onClick={() => alert(field.value(item))}
                    >
                        {field.value(item)}
                    </p>
                </div>
            </div>
        ))}

        <Divider orientation="horizontal" flexItem className="text-aciu-dark-grey" />

        {actionLabel && (
            <button
                onClick={onActionClick}
                className="p-2 text-sm font-coolvetica 
                text-aciu-green-normal rounded-[5px]
                border border-aciu-green-normal w-11/12 mx-auto 
                text-center whitespace-nowrap px-3"
            >
                {actionLabel}
            </button>
        )}
    </div>
  );
}
