import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { FeaturedPostCard } from './FeaturedPostCard';
import { useFeaturedBlogPosts } from '@/services/hooks/blogs';
import { Alert, Skeleton } from '@mui/material';

export default function FeaturedPosts() {
    const { data: featuredData, isLoading, error } = useFeaturedBlogPosts();
    const featuredPosts = featuredData?.posts || [];

    if (error) {
        return (
            <Alert severity="error">
                Failed to load featured posts. Please try again later.
            </Alert>
        );
    }

    if (isLoading) {
        return (
            <div className="w-full h-full">
                <div className="md:hidden block">
                    <Skeleton 
                        variant="rectangular" 
                        className="w-full rounded-[.625rem]"
                        height={432}
                    />
                </div>
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[7fr_3fr] gap-2">
                    <Skeleton 
                        variant="rectangular" 
                        className="w-full rounded-[.625rem]"
                        height={432}
                    />
                    <Skeleton 
                        variant="rectangular" 
                        className="w-full rounded-[.625rem]"
                        height={432}
                    />
                </div>
            </div>
        );
    }

    if (featuredPosts.length === 0) {
        return null; // Don't show anything if no featured posts
    }

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
                    {featuredPosts.map((post) => (
                        <SwiperSlide key={post.id}>
                            <FeaturedPostCard post={post} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="custom-swiper-pagination flex gap-2 items-center mt-4 justify-center"></div>
            </div>
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-[7fr_3fr] gap-2">
                {featuredPosts.map((post) => (
                    <FeaturedPostCard
                        key={post.id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    )
}