import { Checkbox } from "@mui/material";
import { TickSquare } from "iconsax-react";

export function PermissionCheckbox({ name, label }: { name: string, label: string}) {
  return (
    <div className="flex gap-2 items-center">
        <Checkbox
            name={name}
            icon={<TickSquare size={24} color="#737373" />}
            checkedIcon={<TickSquare size={24} color="#00B686" variant="Bold" />}
            sx={{
                padding: 0
            }}
        />
        <p className="leading-[100%] text-sm text-aciu-border-grey">
            {label}
        </p>
    </div>
  );
}

export function PermissionGroup({ title, permissions }: {
    title: string,
    permissions: { name: string, label: string }[]
}) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <TickSquare size={24} color="#737373" />
                <p className="leading-[100%] text-sm font-semibold text-aciu-border-grey">
                    {title}
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 lg:gap-8.5">
                {permissions.map((perm) => (
                    <PermissionCheckbox
                        key={perm.name}
                        name={perm.name}
                        label={perm.label}
                    />
                ))}
            </div>
        </div>
    );
}