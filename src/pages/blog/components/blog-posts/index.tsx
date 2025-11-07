import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import FeaturedPosts from "./FeaturedPosts";
import { regularPosts } from "@/utils/data";
import { BlogPostCard } from "./BlogPostCard";
import SectionHeader from "@/components/SectionHeader";

const sectionActions = [
    <button
        key="filter"
        className="flex gap-2.5 items-center p-2.5 
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-12.5
        border border-aciu-card-grey"
    >
        Filter
        <Sort variant="Outline" color="#A4ACB9" size={20} />
    </button>,
    <button
        key="year"
        className="flex gap-2.5 items-center p-2.5
        text-sm text-grayscale-100 rounded-md 
        font-montserrat font-medium min-h-12.5
        border border-aciu-card-grey"
    >
        2022
        <ArrowDown2 variant="Outline" color="#A4ACB9" size={14} />
    </button>,
]


export default function BlogPosts() {
    const [ query, setQuery ] = useState("");
        
    const handleSearch = (q: string) => {
        setQuery(q);
        console.log(query);
    }

    return (
        <div className="flex flex-col gap-4 lg:gap-8">
            <div className="flex justify-between items-center w-full">
               <SectionHeader
                    title="Voices of Abriba"
                    onSearch={handleSearch}
                    showSearch
                    actions={sectionActions}
                />    
            </div>
            <FeaturedPosts />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-2">
                {regularPosts.map((post) => (
                    <BlogPostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}