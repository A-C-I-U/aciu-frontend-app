import type { BlogPost } from '@/services/types/blogs';
import { CommentOutlined } from '@ant-design/icons';
import { Eye } from "@solar-icons/react";
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

export const FeaturedPostCard = ({ post }: { post: BlogPost }) => {
    const navigate = useNavigate();
    const {
        id,
        displayImage,
        displayImageAlt,
        title,
        author,
        createdAt,
        views,
        commentsCount
    } = post;

    const formattedDate = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

    return (
        <div
            onClick={() => navigate(`/blog/posts/${id}`)}
            className="relative w-full min-h-108 overflow-hidden rounded-[.625rem] cursor-pointer hover:shadow-lg transition-all"
        >
            <img
                src={displayImage || ""}
                alt={displayImageAlt || title}
                loading="lazy"
                className="w-full h-full min-h-108 object-cover"
            />

            <div
                className="absolute inset-0 pointer-events-none
                bg-gradient-to-b from-white/20 
                from-30% via-white/20 via-50% to-black/20"
            >
                <div className="relative p-4 h-full flex flex-col justify-between">
                    <div className="
                        bg-aciu-dark-green text-white font-coolvetica
                        py-2.5 px-3 max-w-fit rounded-[.625rem]">
                        Featured Post
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-coolvetica text-white text-lg lg:text-2xl">
                            {title}
                        </h3>
                        <div className="flex flex-col gap-2 lg:flex-row lg:justify-between font-semibold text-sm font-montserrat">
                            <p className="text-aciu-dashboard-background">
                                {author.fullName} • {formattedDate}
                            </p>
                            <div className="flex gap-4 items-center">
                                <p className="flex gap-2 items-center text-white">
                                    <Eye fontVariant="linear" size={16} color="white" />
                                    {views}
                                </p>
                                <p className="flex gap-2 items-center text-white">
                                    <CommentOutlined size={16} color="white" />
                                    {commentsCount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}