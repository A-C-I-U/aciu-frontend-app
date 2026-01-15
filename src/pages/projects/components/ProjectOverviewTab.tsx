interface ApiProjectOverviewProps {
  description: string;
  value: string;
  impact: string;
  scope: string;
}

export const ProjectOverviewTab = ({
  description,
  value,
  impact,
  scope,
}: ApiProjectOverviewProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <h2 className="line-height-120 text-aciu-border-grey">
          Project Description
        </h2>
        <p className="text-xs text-aciu-abriba leading-6.5">{description}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="line-height-120 text-aciu-border-grey">
          Why It Matters
        </h2>
        <p className="text-xs text-aciu-abriba leading-6.5">{value}</p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="line-height-120 text-aciu-border-grey">Scope</h2>
        <p className="text-xs text-aciu-abriba leading-6.5">{scope}</p>
      </div>

      {impact && (
        <div className="flex flex-col gap-4">
          <h2 className="line-height-120 text-aciu-border-grey">Impact</h2>
          <p className="text-xs text-aciu-abriba leading-6.5">{impact}</p>
        </div>
      )}
    </div>
  );
};
