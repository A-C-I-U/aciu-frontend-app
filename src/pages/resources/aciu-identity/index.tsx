import SearchBar from "@/components/SearchBar";
import { dummyResources } from "@/utils/data";
import { Sort } from "iconsax-react";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import FileView from "../components/FileView";

export default function IdentityPage() {
    const [ query, setQuery ] = useState("");
            
    const handleSearch = (q: string) => {
        setQuery(q);
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:items-center w-full">
                    <h1 className="text-lg lg:text-xl font-bold text-aciu-border-grey">
                        Our Voice, Our Symbols, Our Pride
                    </h1>
                    
                    <div className="flex gap-4 items-center ">
                        <div className="hidden lg:block">
                            <SearchBar
                                onSearch={handleSearch} 
                                placeholder="Search for constitutions, logo, anthems, or reports" 
                            />
                        </div>
                        <button 
                            className="section-action-button"
                        >
                            Filter
                            <Sort variant="Outline" color="#A4ACB9" size={20} />
                        </button>
                    </div>
                </div>    
            </div>
            {dummyResources ?
                <div 
                    className="resource-grid"
                >
                    {dummyResources.map((resource, index) => (
                        <FileView key={index} {...resource} />
                    ))}
                </div> : 
                <EmptyState prompt={query}/>
            }
        </div>
                    
    )
}
