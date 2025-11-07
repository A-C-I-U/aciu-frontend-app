import type { NotificationOption } from "@/utils/types";
import { NotificationToggle } from "./NotificationToggle";

export const NotificationSection = ({ title, description, options }:
  { 
    title: string, 
    description: string, 
    options: NotificationOption[] 
  }
) => (
  <div className="grid gap-8 lg:grid-cols-2 lg:gap-4">
    <div className="flex flex-col gap-2">
      <p className="font-semibold text-sm lg:text-base">
        {title}
      </p>
      <p className="text-sm leading-5 text-aciu-abriba">
        {description}
      </p>
    </div>
    <div className="flex flex-col gap-5">
      {options.map((opt: NotificationOption) => (
        <NotificationToggle 
          key={opt.label} 
          label={opt.label}
          checked={opt.checked}
          description={opt.description}
          fieldName={opt.fieldName}
          onChange={opt.onChange}
        />
      ))}
    </div>
  </div>
);
