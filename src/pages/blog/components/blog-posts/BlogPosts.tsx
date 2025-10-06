import SearchBar from "@/components/SearchBar";
import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import FeaturedPosts from "./FeaturedPosts";
import { regularPosts } from "@/utils/data";
import { BlogPostCard } from "./BlogPostCard";

export default function BlogPosts() {
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
                        Voices of Abriba
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
                    </div>
                </div>    
            </div>
            <FeaturedPosts />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-2">
                {regularPosts.map(({img, title, author, date, subtitle, tags }, index) => (
                    <BlogPostCard
                        key={index}
                        img={img}
                        title={title}
                        author={author}
                        date={date}
                        subtitle={subtitle}
                        tags={tags}
                    />
                ))}
            </div>
        </div>
    )
}