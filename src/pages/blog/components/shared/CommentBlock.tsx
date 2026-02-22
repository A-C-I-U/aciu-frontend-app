import type { Comment } from "@/services/types/blogs";
import { Divider, Skeleton } from "@mui/material";
import { Field, Form, Formik, type FormikHelpers } from "formik";
import { useCreateComment } from "@/services/mutations/blogs";
import { formatDate } from "@/utils/helpers";


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
            <div className="bg-white py-6.5 px-6.5 flex flex-col gap-6 rounded-[.625rem]">
                {comments.length === 0 && (
                    <p className="text-aciu-abriba text-center py-4">No comments yet. Be the first to share your thoughts!</p>
                )}
                {comments.map((comment) => {
                    const { id, author, createdAt, content } = comment;
                    const name = author?.fullName || "Aciu Member";
                    const nameParts = name.split(' ');
                    let initials = '';

                    for (let i = 0; i < Math.min(2, nameParts.length); i++) {
                        if (nameParts[i].length > 0) {
                            initials += nameParts[i][0].toUpperCase();
                        }
                    }

                    return (
                        <div key={id} className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-2 items-center">
                                    <div className="flex items-center justify-center min-w-11.5 h-11.5 bg-aciu-green-light-hover rounded-[2.125rem]">
                                        <p className="font-semibold text-sm text-aciu-green-normal">
                                            {initials}
                                        </p>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-aciu-dark-grey-active leading-5 font-semibold">
                                            {name}
                                        </p>
                                        <p className="text-aciu-abriba leading-5 text-sm font-medium">
                                            {formatDate(createdAt)}
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
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex gap-3 items-stretch">
                                <Field
                                    type="text"
                                    name="comment"
                                    placeholder="Type your thoughts here"
                                    className="border-aciu-card-grey text-sm
                                        font-montserrat leading-5 border
                                        rounded-[.625rem] p-6 flex-1 focus:outline-0"
                                    disabled={isSubmitting || isPending}
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isPending}
                                    className="rounded-[.625rem] p-6 bg-aciu-green-light-hover
                                    border border-aciu-green-normal text-aciu-green-normal font-coolvetica
                                    hover:bg-aciu-green-normal hover:text-white transition-all disabled:opacity-50"
                                >
                                    {isPending ? "Adding..." : "Add Comment"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}