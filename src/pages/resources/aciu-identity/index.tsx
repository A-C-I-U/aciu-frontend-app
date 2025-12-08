import SearchBar from "@/components/SearchBar";
import { Sort } from "iconsax-react";
import { useState, useEffect } from "react";
import EmptyState from "../components/EmptyState";
import FileView from "../components/FileView";
import { useResources } from "@/services/hooks/resources";
import { enqueueSnackbar } from "notistack";

export default function IdentityPage() {
  const [query, setQuery] = useState("");

  const { data: resources, isLoading, error } = useResources();

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
    resources?.filter(
      (resource) =>
        resource.file_name.toLowerCase().includes(query.toLowerCase()) ||
        resource.file_description.toLowerCase().includes(query.toLowerCase()) ||
        resource.file_format.toLowerCase().includes(query.toLowerCase())
    ) || [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 lg:gap-8">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:items-center w-full">
            <h1 className="text-lg lg:text-xl font-bold text-aciu-border-grey">
              Our Voice, Our Symbols, Our Pride
            </h1>

            <div className="flex gap-4 items-center ">
              <div className="hidden lg:block">
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search for constitutions, logo, anthems, or reports"
                />
              </div>
              <button className="section-action-button">
                Filter
                <Sort variant="Outline" color="#A4ACB9" size={20} />
              </button>
            </div>
          </div>
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
    <div className="flex flex-col gap-4 lg:gap-8">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 lg:justify-between lg:items-center w-full">
          <h1 className="text-lg lg:text-xl font-bold text-aciu-border-grey">
            Our Voice, Our Symbols, Our Pride
          </h1>

          <div className="flex gap-4 items-center ">
            <div className="hidden lg:block">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for constitutions, logo, anthems, or reports"
              />
            </div>
            <button className="section-action-button">
              Filter
              <Sort variant="Outline" color="#A4ACB9" size={20} />
            </button>
          </div>
        </div>
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
        <EmptyState prompt={query} />
      )}
    </div>
  );
}
