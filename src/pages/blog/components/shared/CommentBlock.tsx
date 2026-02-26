import type { Comment } from "@/services/types/blogs";
import { CircularProgress, Divider, Skeleton } from "@mui/material";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useCreateComment } from "@/services/mutations/blogs";
import { useState } from "react";


interface CommentFormValues {
    comment: string;
}

const initialValues: CommentFormValues = {
    comment: ""
}

export default function CommentBlock({
    postId,
    comments,
    isLoading
}: {
    postId: string;
    comments: Comment[];
    isLoading?: boolean;
}) {
    const { mutate: addComment, isPending } = useCreateComment();
    const [showAll, setShowAll] = useState(false);
    const COMMENT_CAP = 5;

    const visibleComments = showAll ? comments : comments.slice(0, COMMENT_CAP);

    const handleSubmit = (
        values: CommentFormValues,
        actions: FormikHelpers<CommentFormValues>
    ) => {
        if (!values.comment.trim()) return;

        addComment({ postId, content: values.comment }, {
            onSuccess: () => {
                actions.resetForm();
            }
        });
    }

    if (isLoading) {
        return (
            <div className="flex flex-col gap-8">
                <Skeleton variant="text" width={150} height={40} className="ml-6.5" />
                <div className="bg-white py-6.5 px-6.5 flex flex-col gap-6">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} variant="rectangular" height={80} className="rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <h1 className="text-aciu-border-grey text-2xl ml-6.5 font-coolvetica">
                Comments&nbsp;({comments.length})
            </h1>
            <div className="bg-white py-6.5 px-6.5 flex flex-col gap-6 rounded-2xs">
                {visibleComments.length === 0 && (
                    <p className="text-aciu-abriba text-center py-4">No comments yet. Be the first to share your thoughts!</p>
                )}
                {visibleComments.map((comment) => {
                    const { id, user, createdAt, content } = comment;
                    const name = user?.fullName || "Aciu Member";
                    const profilePhoto = user?.profilePhoto;
                    const nameParts = name.trim().split(' ');
                    let initials = '';

                    for (let i = 0; i < Math.min(2, nameParts.length); i++) {
                        if (nameParts[i].length > 0) {
                            initials += nameParts[i][0].toUpperCase();
                        }
                    }

                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    }).format(new Date(createdAt));

                    return (
                        <div key={id} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2 items-center">
                                    {profilePhoto ? (
                                        <div className="w-11.5 h-11.5 rounded-full overflow-hidden flex shrink-0">
                                            <img src={profilePhoto} alt={name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center min-w-11.5 w-11.5 h-11.5 bg-aciu-green-light-hover rounded-[2.125rem]">
                                            <p className="font-semibold text-sm text-aciu-green-normal">
                                                {initials}
                                            </p>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-0.5">
                                        <p className="text-aciu-dark-grey-active leading-5">
                                            {name}
                                        </p>
                                        <p className="text-aciu-abriba leading-5 text-sm">
                                            {formattedDate}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-aciu-abriba leading-6">
                                    {content}
                                </p>
                            </div>
                            <Divider orientation="horizontal" flexItem />
                        </div>
                    )
                })}
                {comments.length > COMMENT_CAP && !showAll && (
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => setShowAll(true)}
                            className="rounded-2xs p-6 bg-aciu-green-light-hover w-48 leading-1
                            border border-aciu-green-normal hover:bg-aciu-green-light-hover/70 transition-all disabled:opacity-50 text-aciu-green-normal font-coolvetica text-sm text-center"
                        >
                            Load more comments
                        </button>
                    </div>
                    )}
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    {({ isSubmitting, values }) => (
                        <Form>
                            <div className="flex flex-col gap-4.5 md:flex-row md:gap-3 items-stretch md:h-16.75">
                                <Field
                                    type="text"
                                    name="comment"
                                    placeholder="Type your thoughts here"
                                    className="border-aciu-card-grey text-sm
                                        font-montserrat leading-5 border
                                        rounded-2xs p-6 flex-1 focus:outline-0"
                                    disabled={isSubmitting || isPending}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isPending || !values.comment.trim()}
                                    className="rounded-2xs p-6 bg-aciu-green-light-hover md:w-48 leading-1
                                    border border-aciu-green-normal text-aciu-green-normal font-coolvetica
                                    hover:bg-aciu-green-light-hover/70 transition-all disabled:opacity-50"
                                >
                                    {isPending ? <span><CircularProgress size={12} className="text-white" /></span> : "Add Comment"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}