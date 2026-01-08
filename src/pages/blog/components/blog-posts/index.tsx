import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import FeaturedPosts from "./FeaturedPosts";
import { BlogPostCard } from "./BlogPostCard";
import SectionHeader from "@/components/SectionHeader";
import { useAllBlogPosts } from "@/services/hooks/blogs";
import { Alert, Skeleton } from "@mui/material";

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

const BlogPostSkeleton = () => (
    <div className="border border-aciu-light-grey rounded-[.625rem] py-2 px-2 flex flex-col gap-4 w-full">
        <Skeleton variant="rectangular" className="w-full rounded-[.625rem]" height={240} />
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="80%" height={28} />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="90%" />
            </div>
            <div className="flex gap-2">
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
                <Skeleton variant="rounded" width={80} height={24} />
            </div>
        </div>
    </div>
);

export default function BlogPosts() {
    const [query, setQuery] = useState("");
    const { data: blogData, isLoading, error } = useAllBlogPosts();
        
    const handleSearch = (q: string) => {
        setQuery(q);
    }

    // Filter posts based on search query
    const filteredPosts = blogData?.posts?.filter(post => {
        if (!query) return true;
        const searchLower = query.toLowerCase();
        return (
            post.title.toLowerCase().includes(searchLower) ||
            post.description.toLowerCase().includes(searchLower) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
            post.author.fullName.toLowerCase().includes(searchLower)
        );
    }) || [];

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
            
            {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-2">
                    {[...Array(6)].map((_, index) => (
                        <BlogPostSkeleton key={index} />
                    ))}
                </div>
            ) : error ? (
                <Alert severity="error">
                    Failed to load blog posts. Please try again later.
                </Alert>
            ) : filteredPosts.length === 0 ? (
                <div className="text-center py-12 text-grayscale-500">
                    {query ? "No blog posts found matching your search." : "No blog posts available."}
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-2">
                    {filteredPosts.map((post) => (
                        <BlogPostCard
                            key={post.id}
                            post={post}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}