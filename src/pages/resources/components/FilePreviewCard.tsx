import { formatSize, getExtension, getExtensionFromUrl } from "@/utils/helpers";

export interface FilePreviewCardProps {
  file:
    | {
        url: string;
        size: number;
        format: string;
        name: string;
      }
    | File
    | string;
  width?: string;
  height?: string;
  className?: string;
}

export const FilePreviewCard = ({
  file,
  width = "w-65",
  height = "h-52",
  className = "",
}: FilePreviewCardProps) => {
  if (!file) return null;

  let extension = "";
  let size = "";
  let name = "";

  if (file instanceof File) {
    extension = getExtension(file);
    size = formatSize(file.size);
    name = file.name;
  } else if (typeof file === "string") {
    extension = getExtensionFromUrl(file);
    name = file.split("/").pop() || "File";
  } else {
    extension = getExtensionFromUrl(file.url);
    size = formatSize(file.size);
    name = file.name;
  }

  return (
    <div
      className={`mt-16 py-12.5 px-9 ${width} ${height} rounded-xl bg-card-200 flex flex-col items-center justify-center gap-4 ${className}`}
    >
      <div className="flex items-center justify-center w-22 h-22 rounded-lg border border-aciu-dashboard-background bg-white">
        <p className="text-sm uppercase">{extension}</p>
      </div>
      {name && <p className="text-sm text-center line-clamp-2">{name}</p>}
      {size && (
        <p className="font-medium text-xs text-aciu-border-grey">{size}</p>
      )}
    </div>
  );
};
