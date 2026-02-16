import { Badge } from "@/components/Badge";
import type { BlogPost } from "@/services/types/blogs"


export default function PostMetadataForm({
    post
}: { post: BlogPost }) {
    const {
        title,
        description,
        tags,
        displayImage,
        displayImageAlt,
        visibility
    } = post;

    const fallbackImage = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="bg-white py-4 px-3 rounded-[.625rem] h-fit">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-aciu-border-grey">
                        Post title
                    </label>
                    <div className="border-aciu-card-grey text-sm border font-montserrat leading-5 rounded-[.625rem] px-3 py-3 bg-gray-50">
                        {title}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-aciu-border-grey">
                        Post description
                    </label>
                    <div className="border-aciu-card-grey border text-sm font-montserrat leading-5 rounded-[.625rem] py-3 px-3 bg-gray-50 min-h-24">
                        {description}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-aciu-border-grey">
                        Post tags
                    </label>
                    <div className="flex flex-wrap gap-2 p-2 border border-aciu-card-grey rounded-[.625rem] bg-gray-50">
                        {tags?.map((tag, index) => (
                            <Badge key={index} label={tag} />
                        ))}
                        {(!tags || tags.length === 0) && <span className="text-xs text-gray-400 italic">No tags</span>}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-aciu-border-grey">
                        Display Image
                    </label>
                    <div className="flex flex-col gap-2.5 items-center p-2 border border-aciu-card-grey rounded-[.625rem] bg-gray-50">
                        <img
                            src={displayImage || fallbackImage}
                            alt={displayImageAlt || "Cover Preview"}
                            className="object-cover min-h-32 rounded-[5px] w-full"
                        />
                        <p className="text-xs text-aciu-abriba italic">{displayImageAlt || "No alt text"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm text-aciu-border-grey">
                        Post Visibility
                    </label>
                    <div className="border-aciu-card-grey text-sm border font-montserrat leading-5 rounded-[.625rem] px-3 py-3 bg-gray-50 capitalize">
                        {visibility || "Public"}
                    </div>
                </div>
            </div>
        </div>
    )
}