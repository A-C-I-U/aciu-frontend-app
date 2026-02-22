import { Sort } from "iconsax-react";
import { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState";
import FileView from "../components/FileView";
import { useResources } from "@/services/hooks/resources";
import { enqueueSnackbar } from "notistack";
import SectionHeader from "@/components/SectionHeader";
import { Skeleton, useMediaQuery } from "@mui/material";
import UploadResource from "../components/UploadResource";
import { useUser } from "@/context/UserContext";

export default function IdentityPage() {
  const [query, setQuery] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const isMedium = useMediaQuery("(max-width:1250px)");
  const { user } = useUser();

  const { data, isLoading, error } = useResources();

  useEffect(() => {
    if (error) {
      enqueueSnackbar(`Error loading resources: ${error.message}`, {
        variant: "error",
      });
    }
  }, [error]);

  const handleSearch = (q: string) => {
    setQuery(q);
  };

  // Filter resources based on search query
  const filteredResources =
    data?.resources?.filter(
      (resource) =>
        resource.file_name.toLowerCase().includes(query.toLowerCase()) ||
        resource.file_description.toLowerCase().includes(query.toLowerCase()) ||
        resource.file_format.toLowerCase().includes(query.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className={`flex ${isMedium ? "flex-col items-start" : "items-center"} gap-4`}>
          <SectionHeader
            title="Our Voice. Our Symbols. Our Pride."
            onSearch={handleSearch}
            showSearch={isMedium ? false : true}
            actions={!isMedium ? [
                <button className="section-action-button">
                    Filter
                    <Sort variant="Outline" color="#A4ACB9" size={20} />
                </button>
            ]: []}
          />
          {(user?.role === "national_admin") &&
              <Skeleton
                variant="rectangular" 
                width={160} 
                height={44}
                sx={{ borderRadius: '8px' }}
              />
            }
        </div>
        <div className="resource-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="rounded-[1.25rem] bg-gray-200 px-5 py-7 md:px-9 md:py-12 h-32"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className={`flex ${isMedium ? "flex-col items-start" : "items-center"} gap-4`}>
          <SectionHeader
            title="Our Voice. Our Symbols. Our Pride."
            onSearch={handleSearch}
            showSearch={isMedium ? false : true}
            actions={!isMedium ? [
                <button className="section-action-button">
                    Filter
                    <Sort variant="Outline" color="#A4ACB9" size={20} />
                </button>
            ] : []}
          />
          {(user?.role === "national_admin") &&
            <div className="flex w-full justify-between mlg:w-fit mlg:justify-end items-center">
              <button
                  className="btn btn-primary max-w-fit text-base!"
                  onClick={() => setOpenUpload(true)}
              >
                  Upload Material
              </button> 
              <button className="section-action-button mlg:hidden">
                  Filter
                  <Sort variant="Outline" color="#A4ACB9" size={20} />
              </button>
          </div>
          }   
        </div>

        {filteredResources.length > 0 ? (
          <div className="resource-grid">
            {filteredResources.map((resource) => (
              <FileView
                key={resource.id}
                file={{
                  url: resource.file_url,
                  size: resource.file_size,
                  format: resource.file_format,
                  name: resource.file_name,
                }}
                name={resource.file_name}
                description={resource.file_description}
                resourceId={resource.id}
              />
            ))}
          </div>
        ) : (
          <EmptyState prompt={query || "ACIU Identity resources at the moment"} />
        )}
      </div>
      <UploadResource 
        open={openUpload} 
        onClose={() => setOpenUpload(false)} 
        type="aciu-resources" 
      />
    </>
  );
}
