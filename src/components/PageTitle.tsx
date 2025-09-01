import type { PageTitleProps, TabItem } from "@/utils/types";


export const PageTitle = ({ title, tabs = [], activeTab, onTabChange }: PageTitleProps) => {
  const handleTabClick = (tab: TabItem) => {
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="bg-white mx-5 rounded-lg px-6 pt-4 flex flex-col gap-4">
        <h1 className="font-coolvetica text-xl text-aciu-border-grey">
            {title}
        </h1>
        <div className="flex gap-8 items-center">
            {tabs.map((tab) => (
                <button 
                    key={tab?.key}
                    onClick={() => handleTabClick(tab)}
                    className={`
                        ${activeTab?.key === tab?.key ? 
                            'text-aciu-red font-semibold' : 
                            'text-aciu-abriba font-medium pb-4'} 
                    text-sm font-montserrat flex flex-col gap-4`}
                >
                    {tab?.label}
                    {activeTab?.key === tab?.key && <span className="border border-aciu-red"></span>}
                </button>
            ))}
        </div>
    </div>
  )
}