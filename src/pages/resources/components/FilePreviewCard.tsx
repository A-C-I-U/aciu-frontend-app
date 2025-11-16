import { formatSize, getExtension } from "@/utils/helpers";

interface FilePreviewCardProps {
    file: File | string | null | undefined;
    width?: string;
    height?: string;
    className?: string;
}

export const FilePreviewCard = ({ 
    file,
    width = "w-65", 
    height = "h-52",
    className = ""
}: FilePreviewCardProps) => {
    if (!file) return null;
    let extension, size, name = '';
  
    if (file instanceof File) {
        extension = getExtension(file);
        size = formatSize(file.size);
        name = file.name
    } else {
        extension = getExtensionFromUrl(file);
    }

    return (
        <div className={`mt-16 py-12.5 px-9 ${width} ${height} rounded-xl bg-card-200 flex flex-col items-center justify-center gap-4 ${className}`}>
            <div className="flex items-center justify-center w-22 h-22 rounded-lg bg-aciu-dashboard-background">
                <p className="font-montserrat text-sm">
                    {extension}
                </p>
            </div>
            {name !== '' &&
                <p className="font-montserrat text-sm text-center">
                    {name}
                </p>
            }
            {size !== '' &&
                <p className="font-montserrat font-medium text-xs text-aciu-border-grey">
                    {size}
                </p>
            }
        </div>
    );
};

const getExtensionFromUrl = (url: string): string => {
  const match = url.match(/\.([^./?]+)(?:[?#]|$)/);
  return match ? match[1] : '';
};