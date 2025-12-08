import React from "react";
import SearchBar from "@/components/SearchBar";

interface SectionHeaderProps {
  title: string;
  onSearch: (query: string) => void;
  showSearch?: boolean;
  noTitle?: boolean;
  actions?: React.ReactNode[];
}

const SectionHeader = ({
  title,
  onSearch,
  showSearch = false,
  actions = [],
  noTitle = false
}: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className={!noTitle ? "flex flex-col gap-6 lg:gap-4 lg:flex-row lg:justify-between lg:items-center w-full" : ""}>
        <h1 className="whitespace-nowrap text-lg lg:text-xl font-bold text-aciu-border-grey">
          {title}
        </h1>

        {(actions.length > 0) && (
          <div className="flex gap-4 items-center">
            {showSearch && (
              <div className="hidden lg:block">
                <SearchBar onSearch={onSearch} placeholder={`Search ${title.toLowerCase()}`} />
              </div>
            )}
            <div className="flex items-center gap-2 lg:gap-4">
              {actions.map((action, index) => (
                <React.Fragment key={index}>{action}</React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
