import CustomSwitch from "@/components/CustomSwitch";

export const NotificationToggle = ({ label, description, fieldName, checked, onChange }: {
    label: string,
    description: string,
    fieldName: string,
    checked: boolean,
    onChange: (fieldName: string, checked: boolean) => void
}) => (
    <div className="flex justify-between">
        <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">{label}</p>
            <p className="text-xs leading-5 text-aciu-abriba">{description}</p>
        </div>
        <CustomSwitch
            checked={checked}
            onChange={onChange}
            fieldName={fieldName}
        />
    </div>
);
