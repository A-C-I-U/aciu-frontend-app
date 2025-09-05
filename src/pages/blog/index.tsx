import type { TabItem } from "@/utils/types"
import BlogPosts from "./components/BlogPosts"
import { PageTitle } from "@/components/PageTitle";
import { useState } from "react";

const blogsTabs: TabItem[] = [
    { key: "blog-posts", label: "Blog Posts", content: <BlogPosts /> },
    { key: "my-publications", label: "My Publications", content: <BlogPosts /> },
    { key: "submissions", label: "Submissions",  content: <BlogPosts /> }
]

export default function BlogPage() {
     const [activeTab, setActiveTab] = useState(blogsTabs[0]);
        const handleTabChange = (tab: TabItem) => {
            setActiveTab(tab);
        }
    
        return (
            <div className="flex flex-col gap-6">
                <PageTitle
                    title="ACIU Blog" 
                    tabs={blogsTabs} 
                    activeTab={activeTab}
                    onTabChange={handleTabChange} 
                />
                <div className="mx-5 px-4 py-5 bg-white">
                    {activeTab?.content}
                </div>
            </div>
        )
}