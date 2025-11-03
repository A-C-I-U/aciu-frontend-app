import type { RegularPostCardType } from "@/utils/types"
import { Badge } from "@mui/material";
import { ArrowUpRight } from "lucide-react";

export const BlogPostCard = ({ post }: {post: RegularPostCardType }) => {
    const {
        img,
        title,
        author,
        date,
        subtitle,
        tags
    } = post;
    
    return (
        <div className="
            border border-aciu-light-grey 
            rounded-[.625rem] py-2 px-2
            flex flex-col gap-4 w-full"
        >
            <img 
                src={img}
                alt="Blog post thumbnail"
                loading="lazy"
                className="w-full h-60 object-cover rounded-[.625rem]"
            />
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <p className="text-aciu-green-normal font-semibold text-sm font-montserrat">
                        {author} • {date}
                    </p>
                    <div className="flex justify-between">
                        <p className="text-aciu-border-grey font-coolvetica text-lg">
                            {title}
                        </p>
                        <ArrowUpRight 
                            size={24} 
                            color="black" 
                        />
                    </div>
                    <p className="text-sm font-montserrat text-grayscale-500">
                        {subtitle}
                    </p>
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
