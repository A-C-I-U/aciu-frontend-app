import type { BlogPost } from "@/services/types/blogs";
import { Badge } from "@mui/material";
import { ArrowUpRight } from "lucide-react";
import { formatDistanceToNow, parseISO, isValid } from "date-fns";
import { useNavigate } from "react-router-dom";

export const BlogPostCard = ({ post }: { post: BlogPost }) => {
  const navigate = useNavigate();
  const {
    id,
    displayImage,
    displayImageAlt,
    title,
    author,
    createdAt,
    description,
    tags,
  } = post;

  const parsedDate = createdAt ? parseISO(createdAt) : null;
  const formattedDate =
    parsedDate && isValid(parsedDate)
      ? formatDistanceToNow(parsedDate, { addSuffix: true })
      : "some time ago";

  return (
    <div
      onClick={() => navigate(`/blog/posts/${id}`)}
      className="
        border border-aciu-light-grey 
        rounded-[.625rem] py-2 px-2
        flex flex-col gap-4 w-full
        hover:shadow-md transition-shadow cursor-pointer
      "
    >
      <img
        src={displayImage || ""}
        alt={displayImageAlt || title}
        loading="lazy"
        className="w-full h-60 object-cover rounded-[.625rem]"
      />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-aciu-green-normal font-semibold text-sm font-montserrat">
            {author.fullName} • {formattedDate}
          </p>

          <div className="flex justify-between">
            <p className="text-aciu-border-grey font-coolvetica text-lg">
              {title}
            </p>
            <ArrowUpRight size={24} color="black" />
          </div>

          <p className="text-sm font-montserrat text-grayscale-500 line-clamp-2">
            {description}
          </p>
        </div>

        {tags.length > 0 && (
          <div className="flex gap-2 items-center flex-wrap">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                sx={{
                  borderRadius: "16px",
                  py: "2px",
                  px: ".625rem",
                  bgcolor: "#EEEEEE",
                  fontSize: ".75rem",
                  fontWeight: "500",
                  fontFamily: "'Montserrat', sans-serif",
                  color: "#737373",
                }}
              >
                {tag}
              </Badge>
            ))}

            {tags.length > 3 && (
              <span className="text-xs text-grayscale-500">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};