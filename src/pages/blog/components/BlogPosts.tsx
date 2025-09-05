import SearchBar from "@/components/SearchBar";
import { ArrowDown2, Sort } from "iconsax-react";
import { useState } from "react";
import FeaturedPosts from "./FeaturedPosts";
import type { RegularPostCard } from "@/utils/types";
import { Badge } from "@mui/material";
import { ArrowUpRight } from "lucide-react";

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6 gap-x-2">
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


const BlogPostCard = ({
    img,
    title,
    author,
    date,
    subtitle,
    tags
}: RegularPostCard) => {
    return (
        <div className="
            border border-aciu-light-grey 
            rounded-[.625rem] py-2 px-2
            flex flex-col gap-4 w-full min-w-[22rem]"
        >
            <img 
                src={img}
                alt="Blog post thumbnail"
                loading="lazy"
                className="w-full h-[15rem] object-cover rounded-[.625rem]"
            />
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <p className="text-aciu-green-normal font-semibold text-sm font-montserrat">
                        {author} • {date}
                    </p>
                    <div className="flex gap-2">
                        <p className="text-aciu-border-grey font-coolvetica text-lg">
                            {title}
                        </p>
                        <ArrowUpRight size={24} color="black" />
                    </div>
                    <p className="text-sm font-montserrat text-grayscale-500">{subtitle}</p>
                </div>
                <div className="flex gap-2 items-center">
                    {tags.map((tag, index) => (
                        <Badge 
                            key={index}
                            sx={{
                                borderRadius: "16px",
                                py: "2px",
                                px: ".625rem",
                                bgcolor: "#EEEEEE",
                                fontSize: ".75rem",
                                fontWeight: "500",
                                fontFamily: "'Montserrat', sans-serif",
                                color: "#737373"
                            }}
                        >
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const regularPosts: RegularPostCard[] = [
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },
    {
        img: "/images/nig-uk-flag.jpg",
        title: "My First Igwa Mang: Walking with My Age Grade",
        subtitle: "Experiencing Igwa Mang for the first time and the pride of marching with my age grade.",
        author: "Chinedu Okoro",
        date: "16 Jan 2025",
        tags: ["ACIU News", "Union Updates"]
    },

]