import { useState } from "react";

export default function EventsPage() {
    return (
        <></>
    )
}


interface PageTitleProps {
    title: string,
    tabs: {
        key: string,
        label: string
    }[],
    defaultTab: string,
    onTabChange: (key: string) => void
}

const PageTitle = ({ title, tabs = [], defaultTab, onTabChange }: PageTitleProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.key);

  const handleTabClick = (key: string) => {
    setActiveTab(key);
    if (onTabChange) onTabChange(key);
  };

  return (
    <div className="bg-white rounded-lg px-6 py-4 flex flex-col gap-4">
        <h1 className="font-coolvetica text-lg text-aciu-blue-dark">
            {title}
        </h1>
        <div className="flex gap-8 items-center">
            {tabs.map(({ key, label }) => (
                <button key={key}
                >
                    {label}
                </button>
            ))}
        </div>
    </div>
  )

}