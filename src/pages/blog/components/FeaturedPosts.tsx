import { Eye } from "@solar-icons/react"
import { CommentOutlined } from '@ant-design/icons';
import type { FeaturedPostCard } from "@/utils/types";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

export default function FeaturedPosts() {
    return (
        <div className="w-full h-full">
            <div className="md:hidden block">
                <Swiper 
                    modules={[Pagination]} 
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                >
                    {featuredPosts.map(({ img, title, author, date, views, comments }, index) => (
                        <SwiperSlide key={index}>
                            <FeaturedPostCard
                                img={img}
                                title={title}
                                author={author}
                                date={date}
                                views={views}
                                comments={comments}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[7fr_3fr] gap-2">
                {featuredPosts.map(({ img, title, author, date, views, comments }, index) => (
                    <FeaturedPostCard
                        key={index}
                        img={img}
                        title={title}
                        author={author}
                        date={date}
                        views={views}
                        comments={comments}
                    />
                ))}
            </div>
        </div>
    )
}

const FeaturedPostCard = ({
    img,
    title,
    author,
    date,
    views,
    comments
}: FeaturedPostCard) => {
    return (
        <div className="relative w-full h-[27rem] overflow-hidden rounded-[.625rem]">
            <img 
                src={img}
                alt="Blog post thumbnail"
                loading="lazy"
                className="w-full h-full object-cover rounded-[.625rem]"
            />
            {/* <div className="relative p-4 z-10"> */}
                <div 
                    className="absolute inset-0   
                        bg-gradient-to-b from-transparent 
                        via-transparent to-aciu-darker-grey"
                >
                    <div className="relative p-4 h-full flex flex-col justify-between">
                    {/* 16px to the left and from the top */} 
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
            {/* </div> */}
        </div>
    )
}

export const featuredPosts: FeaturedPostCard[] = [
    {
        img: "/images/blog-placeholder.jpg",
        title: "Tech, Tradition and the Future of ACIU",
        author: "Eke Urum",
        date: "20 Jan 2025",
        views: 239,
        comments: 21
    },
    {
        img: "/images/blog-placeholder.jpg",
        title: "Tech, Tradition and the Future of ACIU",
        author: "Eke Urum",
        date: "20 Jan 2025",
        views: 239,
        comments: 21
    }
]