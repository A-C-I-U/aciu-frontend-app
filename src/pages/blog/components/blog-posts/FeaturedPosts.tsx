import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { featuredPosts } from "@/utils/data";
import { FeaturedPostCard } from './FeaturedPostCard';


export default function FeaturedPosts() {
    return (
        <div className="w-full h-full">
            <div className="md:hidden block">
                <Swiper 
                    modules={[Pagination]} 
                    pagination={{ 
                        el: ".custom-swiper-pagination", 
                        clickable: true 
                    }}
                    spaceBetween={20}
                >
                    {featuredPosts.map(({ 
                        img, 
                        title, 
                        author, 
                        date, 
                        views, 
                        comments 
                    }, index) => (
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
                <div className="custom-swiper-pagination flex gap-2 items-center mt-4 justify-center"></div>
            </div>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[7fr_3fr] gap-2">
                {featuredPosts.map(({ 
                    img, 
                    title, 
                    author, 
                    date, 
                    views, 
                    comments 
                }, index) => (
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
