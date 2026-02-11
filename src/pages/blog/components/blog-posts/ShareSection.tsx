import { Divider } from "@mui/material";
import { Copy } from "iconsax-react";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { CheckCircleIcon } from "lucide-react";
import { useRelatedBlogPosts } from "@/services/hooks/blogs";
import { BlogPostCard } from "./BlogPostCard";

export default function ShareSection({ title, url, postId }: {
    title: string,
    url: string,
    postId: string
}) {
    const { data: relatedData, isLoading } = useRelatedBlogPosts(postId);
    const relatedPosts = relatedData?.relatedPosts || [];
    const [copied, setCopied] = useState(false);

    const encodedURL = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            enqueueSnackbar('Link copied to clipboard!', {
                variant: 'success',
                autoHideDuration: 2000,
            });
        } catch (err) {
            enqueueSnackbar('Failed to copy', { variant: 'error' });
        }
    };

    return (
        <div className="w-full h-fit bg-white rounded-[.625rem] py-5 px-4 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl">Share post</h1>

                <div className="flex items-center gap-2">
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[1.125rem] text-aciu-green-normal font-coolvetica"
                    >
                        Facebook
                    </a>

                    <Divider orientation="vertical" variant="middle" flexItem />

                    <a
                        href={`https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedURL}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[1.125rem] text-aciu-green-normal font-coolvetica"
                    >
                        Twitter
                    </a>

                    <Divider orientation="vertical" variant="middle" flexItem />

                    <a
                        href={`https://wa.me/?text=${encodedTitle}%20${encodedURL}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[1.125rem] text-aciu-green-normal font-coolvetica"
                    >
                        WhatsApp
                    </a>
                </div>

                <div className="truncate relative h-16 flex gap-1 items-center w-full rounded-[6.25rem] border border-aciu-dark-grey px-5.5 py-4.5">
                    <input
                        id="blog-post-link"
                        name="blog-post-link"
                        type="text"
                        value={url}
                        className="w-full flex-1 text-ellipsis truncate text-aciu-abriba"
                        disabled
                    />
                    <button onClick={handleCopy} className="relative flex items-center">
                        {copied ? (
                            <CheckCircleIcon color="#00B686" size={24} />
                        ) : (
                            <Copy variant="Linear" color="#00B686" size={24} />
                        )}
                    </button>
                </div>
            </div>

            {!isLoading && relatedPosts.length > 0 &&
                <>
                    <Divider orientation="horizontal" flexItem />

                    <h1 className="text-gray-900 text-2xl leading-8">
                        Related blog posts
                    </h1>

                    <div className="flex flex-col gap-8">
                        {relatedPosts?.slice(0, 3).map((post) => {
                            return <BlogPostCard key={post.id} post={post} />;
                        })}
                    </div>
                </>
            }
        </div>
    );
}