import { NotificationToggle } from "./NotificationToggle";

export const NotificationSection = ({ title, description, options }:
    { title: string, description: string, options: any}
) => (
  <div className="grid gap-8 lg:grid-cols-2 lg:gap-4">
    <div className="flex flex-col gap-2">
      <p className="font-semibold">
        {title}
      </p>
      <p className="text-sm leading-5 text-aciu-abriba">
        {description}
      </p>
    </div>
    <div className="flex flex-col gap-5">
      {options.map((opt: any) => (
        <NotificationToggle key={opt.name} {...opt} />
      ))}
    </div>
  </div>
);
