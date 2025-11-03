import type { CommentType } from "@/utils/types";
import { Divider } from "@mui/material";

export default function CommentBlock({ comments }: { comments: CommentType[]}) {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-aciu-border-grey text-2xl ml-6.5">
                Comments&nbsp;({comments.length})
            </h1>
            <div className="bg-white py-6.5 px-6.5 flex flex-col gap-6">
                {comments.map((comment) => {
                    const { id, name, date, content } = comment;
                    const nameParts = name.split(' ');
                    let initials = '';

                    for (let i = 0; i < 2; i++) {
                        if (nameParts[i].length > 0 ) {
                            initials += nameParts[i][0].toUpperCase();
                        }
                    }

                    return (
                        <div key={id} className="flex flex-col gap-6">

                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center justify-center w-11.5 h-11.5 bg-aciu-green-light-hover rounded-[2.125rem]">
                                        <p className="font-semibold text-sm text-aciu-green-normal">
                                            {initials}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-aciu-dark-grey-active leading-5">
                                            {name}
                                        </p>
                                        <p className="text-aciu-abriba leading-5 text-sm font-medium">
                                            {date}
                                        </p>
                                    </div>
                                </div>
                                
                                <p className="text-aciu-abriba leading-6">
                                    {content}
                                </p>
                            </div>
                            <Divider orientation="horizontal" flexItem/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}