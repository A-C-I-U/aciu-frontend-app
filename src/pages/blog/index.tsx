import type { TabItem } from "@/utils/types"
import BlogPosts from "./components/blog-posts"
import { PageTitle } from "@/components/PageTitle";
import { useState } from "react";
import { publicationStats } from "@/utils/data";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { PublicationCard } from "./components/my-publications/PublicationCard";
import MyPublications from "./components/my-publications";
import Submissions from "./components/submissions";


const blogsTabs: TabItem[] = [
    { 
        key: "blog-posts", 
        label: "Blog Posts", 
        content: <BlogPosts /> 
    },
    { 
        key: "my-publications", 
        label: "My Publications", 
        content: <MyPublications /> 
    },
    { 
        key: "submissions", 
        label: "Submissions",  
        content: <Submissions /> 
    }
]

export default function BlogPage() {
    const [activeTab, setActiveTab] = useState(blogsTabs[0]);
    const { user } = useUser();

    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    const visibleTabs = user?.role === "member" ? 
        blogsTabs.filter(tab => tab.key !== "submissions") :
        blogsTabs;
    
    return (
        <div className="flex flex-col gap-6">
            <PageTitle
                title="ACIU Blog" 
                tabs={visibleTabs} 
                activeTab={activeTab}
                onTabChange={handleTabChange} 
            />

            <AnimatePresence>
                {(activeTab.key === "my-publications" || 
                    activeTab.key === "submissions") && (
                    <motion.div
                        key={activeTab.key}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="mx-5 grid grid-cols-1 lg:grid-cols-3 gap-3"
                    >
                        {publicationStats.map(({ title, postNumber, rateOfChange }) => (
                            <PublicationCard
                                key={title}
                                title={title} 
                                postNumber={postNumber} 
                                rateOfChange={rateOfChange} 
                            />
                        ))}
                    </motion.div>
                )}

                <motion.div
                    key={activeTab.key + "-content"}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mx-5 px-4 py-5 bg-white"
                    >
                    {activeTab.content}
                </motion.div>
            </AnimatePresence>
        </div>

    )
}