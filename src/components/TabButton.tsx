import type { TabItem } from "@/utils/types";

export default function TabButton({ tab, active, onClick }: { tab: TabItem; active: boolean; onClick: () => void }) {
    return (
        <button
            key={tab.key}
            onClick={onClick}
            className={`${active ? 'text-aciu-red font-semibold' : 'text-aciu-abriba font-medium pb-4'} 
            text-xs md:text-sm font-montserrat flex flex-col gap-4`}
        >
            {tab.label}
            {active && <span className="block w-full h-[2px] bg-aciu-red rounded-full"></span>}
        </button>
    );
}
