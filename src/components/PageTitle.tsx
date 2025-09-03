import type { PageTitleProps, TabItem } from "@/utils/types";


export const PageTitle = ({ title, tabs = [], activeTab, onTabChange }: PageTitleProps) => {
  const handleTabClick = (tab: TabItem) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="bg-white md:mx-5 rounded-lg md:px-6 px-2.5 pt-4 flex flex-col gap-4">
        <h1 className="font-coolvetica text-xl text-aciu-border-grey">
            {title}
        </h1>
        <div className="flex gap-4 md:gap-8 items-center w-full overflow-x-scroll">
            {tabs.map((tab) => (
                <button 
                    key={tab?.key}
                    onClick={() => handleTabClick(tab)}
                    className={`
                        ${activeTab?.key === tab?.key ? 
                            'text-aciu-red font-semibold' : 
                            'text-aciu-abriba font-medium pb-4'} 
                    text-xs md:text-sm font-montserrat flex flex-col gap-4`}
                >
                    {tab?.label}
                    {activeTab?.key === tab?.key && <span className="border border-aciu-red"></span>}
                </button>
            ))}
        </div>
    </div>
  )
}