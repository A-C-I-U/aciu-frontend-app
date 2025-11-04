import type { FeaturedPostCardType } from '@/utils/types';
import { CommentOutlined } from '@ant-design/icons';
import { Eye } from "@solar-icons/react"

export const FeaturedPostCard = ({ post }:
    { post: FeaturedPostCardType }) => {
    const { 
        img, 
        title, 
        author, 
        date, 
        views, 
        comments 
    } = post;
    
    return (
        <div className="relative w-full min-h-108 overflow-hidden rounded-[.625rem]">
            <img 
                src={img}
                alt="Blog post thumbnail"
                loading="lazy"
                className="w-full h-full object-cover rounded-[.625rem]"
            />
                <div 
                    className="absolute inset-0   
                        bg-gradient-to-b from-transparent 
                        via-transparent to-aciu-darker-grey"
                >
                    <div className="relative p-4 h-full flex flex-col justify-between">
                        <div className="
                            bg-aciu-dark-green text-white font-coolvetica
                            py-2.5 px-3 max-w-fit rounded-[.625rem]"
                        >
                            Featured Post
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="font-coolvetica text-white text-lg lg:text-2xl">
                                {title}
                            </h3>
                            <div className="flex flex-col gap-2 lg:flex-row lg:justify-between font-semibold text-sm font-montserrat">
                                <p className="text-aciu-dashboard-background">
                                    {author} • {date}
                                </p>
                                <div className="flex gap-4 items-center">
                                    <p className="flex gap-2 items-center text-white">
                                        <Eye fontVariant="linear" size={16} color="white" />
                                        {views}
                                    </p>
                                    <p className="flex gap-2 items-center text-white">
                                        <CommentOutlined size={16} color="white" />
                                        {comments}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}