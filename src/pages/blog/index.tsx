
import type { TabItem } from "@/utils/types"
import BlogPosts from "./components/blog-posts"
import { PageTitle } from "@/components/PageTitle";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { StatsCard } from "../../components/StatsCard";
import MyPublications from "./components/my-publications";
import Submissions from "./components/submissions";
import {  Alert } from "@mui/material";
import { useBlogPostStats } from "@/services/hooks/blogs";

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

const mapStatsToCards = (stats?: {
  totalSubmissions: number;
  publishedPosts: number;
  pendingApprovals: number;
}) => {
  if (!stats) return [];
  
  return [
    {
      title: "Total Submissions",
      number: String(stats.totalSubmissions),
      rateOfChange: "0", 
      itemLabel: "Submissions"
    },
    {
      title: "Published Posts",
      number: String(stats.publishedPosts),
      rateOfChange: "0", 
      itemLabel: "Posts"
    },
    {
      title: "Pending Approvals",
      number: String(stats.pendingApprovals),
      rateOfChange: "0", 
      itemLabel: "Posts"
    }
  ];
};

export default function BlogPage() {
    const [activeTab, setActiveTab] = useState(blogsTabs[0]);
    const { user } = useUser();
    
    const { data: statsData, isLoading, error } = useBlogPostStats();
    
    const handleTabChange = (tab: TabItem) => {
        setActiveTab(tab);
    }

    const visibleTabs = user?.role === "member" ? 
        blogsTabs.filter(tab => tab.key !== "submissions") :
        blogsTabs;
    
    // Convert stats to card data
    const statsCards = mapStatsToCards(statsData?.stats);

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
                        className="mx-5 grid lg:grid-cols-3 gap-3"
                    >
                        {isLoading ? (
                            // Loading state
                            Array.from({ length: 3 }).map((_, index) => (
                                <div 
                                    key={index} 
                                    className="w-full py-4 px-6 flex flex-col gap-4 rounded-lg bg-white h-39 animate-pulse"
                                >
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/3 ml-auto"></div>
                                </div>
                            ))
                        ) : error ? (
                            <div className="col-span-3">
                                <Alert severity="error" className="mb-4">
                                    Failed to load post statistics. Please try again.
                                </Alert>
                            </div>
                        ) : (
                            statsCards.map((stat, index) => (
                                <StatsCard
                                    key={index}
                                    title={stat.title} 
                                    number={stat.number} 
                                    rateOfChange={stat.rateOfChange} 
                                    itemLabel={stat.itemLabel}
                                />
                            ))
                        )}
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