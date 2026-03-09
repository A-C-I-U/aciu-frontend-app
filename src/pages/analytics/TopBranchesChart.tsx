import type { TopBranch } from "@/services/types/analytics";
import { ChartEmptyState } from "@/components/ChartEmptyState";

interface TopBranchesChartProps {
  data: TopBranch[];
}

export const TopBranchesChart = ({ data }: TopBranchesChartProps) => {
  const isDataEmpty = !data || data.length === 0 || data.every(item => item.memberCount === 0);
  const maxCount = Math.max(...(data || []).map(d => d.memberCount), 10);

  return (
    <div className="bg-white rounded-lg shadow-sm h-full pt-6">
      <div className="px-6 pb-4">
        <h3 className="text-xl font-semibold text-aciu-border-grey mb-2 leading-[1.2]">Top Branches</h3>
        <p className="text-sm text-aciu-border-200 leading-6">Branches with most registered members</p>
      </div>

      {isDataEmpty ? (
        <div className="px-6 pb-6">
          <ChartEmptyState height={320} description="No branch data available to rank." />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {data.map((item, index) => {
            const pct = (item.memberCount / maxCount) * 100;
            return (
              <div key={index} className="flex flex-col gap-2 px-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#141414] leading-[1.6]">
                    {item.branchName}
                  </span>
                  <span className="text-sm text-[#141414] leading-[1.6]">
                    {item.memberCount}
                  </span>
                </div>
                <div className="w-full h-1.25 rounded-full bg-[#D9F4ED] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: '#00B686',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};