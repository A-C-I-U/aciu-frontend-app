import { TagInput } from "@/components/TagInput";
import type { BlogSubmissionDetails } from "@/utils/types";
import { useState } from "react";

export default function PostMetaDataForm({ post }: { post: BlogSubmissionDetails }) {
    const [tags, setTags] = useState(post.tags);
    
    return (
        <div className="bg-white py-4 px-3 rounded-[.625rem]">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="title" 
                        className="font-semibold text-sm text-aciu-border-grey">
                            Post title
                    </label>
                    <input 
                        name="title"
                        className="border-aciu-card-grey text-sm border
                        font-montserrat leading-5 pointer-events-none
                        rounded-[.625rem] px-3 py-3"
                        value={post.title}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="description" 
                        className="font-semibold text-sm text-aciu-border-grey">
                            Post description
                    </label>
                    <textarea
                        name="title"
                        className="border-aciu-card-grey border text-sm 
                        font-montserrat leading-5 pointer-events-none
                        rounded-[.625rem] py-3 px-3"
                        value={post.description}
                        rows={5}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="tags"
                        className="font-semibold text-sm text-aciu-border-grey"
                    >
                        Post tags
                    </label>
                    <TagInput value={tags} onChange={setTags} disabled/>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor="displayImage"
                        className="font-semibold text-sm text-aciu-border-grey"
                    >
                        Display Image
                    </label>
                    <div className="flex flex-col gap-2.5 items-center">
                        <img
                            src={post.displayImage}
                            alt={post.imageAlt || "Cover Preview"}
                            className="object-cover min-h-32 rounded-[5px] min-w-78 w-full"
                        />
                    </div>
                </div>
                 <div className="flex flex-col gap-2">
                    <label 
                        htmlFor="title" 
                        className="font-semibold text-sm text-aciu-border-grey">
                            Set Post Visibility
                    </label>
                    <input 
                        name="title"
                        className="border-aciu-card-grey text-sm border
                        font-montserrat leading-5 pointer-events-none
                        rounded-[.625rem] px-3 py-3 capitalize"
                        value={post.postVisibility}  
                    />
                </div>
            </div>
        </div>
    )
}