import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { ArrowDown2, Sort } from "iconsax-react";
import PublicationsTable from "./PublicationsTable";
import { Link } from "react-router-dom";

export default function MyPublications() {
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
                        My Publications
                    </h1>
                    
                    <div className="flex gap-4 items-center ">
                        <div className="hidden lg:block">
                            <SearchBar
                                onSearch={handleSearch} 
                                placeholder="Search for blog posts" 
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
                        <button 
                            className="flex gap-2.5 items-center p-2.5
                            text-sm text-grayscale-100 rounded-md 
                            font-montserrat font-medium min-h-[50px]
                            border border-aciu-card-grey"
                        >
                            2022
                            <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
                        </button>
                        <Link
                            to="/blog/create"
                            style={{
                                padding: "1rem",
                                gap: ".5rem",
                                borderRadius: ".75rem",
                                backgroundColor: "#00B686",
                                color: "#fff",
                                fontFamily: "'Coolvetica', sans-serif",
                                width: "100%"
                            }}
                            >
                                Publish new post
                        </Link>
                    </div>
                </div>    
            </div>
            <PublicationsTable />
        </div>
    )
}