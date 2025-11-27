import { Divider } from "@mui/material";
import { NotificationSection } from "./NotificationSection";
import type { NotificationSectionProps } from "@/utils/types";
import CustomSwitch from "@/components/CustomSwitch";

export default function NotificationCategory({
  heading, 
  subtext, 
  section,
  enabled,
  onToggle
}: {
  heading: string;
  subtext: string;
  section: NotificationSectionProps;
  enabled: boolean;
  onToggle: (checked: boolean) => void;
}) {
  const handleToggle = (_fieldName: string, value: boolean) => {
    onToggle(value);
  };

  return (
    <div className="flex flex-col gap-6 lg:gap-11 py-4">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-semibold text-sm lg:text-base">{heading}</p>
          <p className="text-aciu-abriba text-sm lg:text-base">{subtext}</p>
        </div>
        <CustomSwitch
          checked={enabled}
          onChange={handleToggle}
          fieldName={heading.toLowerCase().replace(/\s+/g, '-')}
        />
      </div>

      <Divider orientation="horizontal" className="text-aciu-white-dark" />

      <NotificationSection 
        title={section.title}
        description={section.description}
        options={section.options}
        disabled={!enabled}
      />
      <Divider orientation="horizontal" className="text-aciu-white-dark" />
    </div>
  );
}