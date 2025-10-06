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
        console.log(query);
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex justify-between items-center w-full">
                <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:items-center w-full">
                    <h1 className="font-coolvetica text-lg lg:text-xl font-bold text-aciu-border-grey">
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
                            className="flex gap-2.5 items-center p-2.5 
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium min-h-[50px] 
                            border border-aciu-card-grey"
                        >
                            Filter
                            <Sort variant="Outline" color="#A4ACB9" size={20} />
                        </button>
                    </div>
                </div>    
            </div>
            {dummyResources ?
                <div 
                    className="grid grid-cols-2 gap-x-2 gap-y-[1.125rem]
                    md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 md:gap-y-8"
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
