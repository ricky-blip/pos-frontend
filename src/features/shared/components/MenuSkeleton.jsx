/**
 * MenuSkeleton - A skeleton loader component that mimics the MenuCard structure
 * Uses Tailwind CSS animate-pulse for the shimmer effect.
 */
export default function MenuSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-[#eef2f8] bg-white p-2 shadow-[0_10px_25px_rgba(16,24,40,0.05)]">
      {/* Image Skeleton */}
      <div className="h-[104px] w-full rounded-xl bg-slate-200" />
      
      <div className="px-1 pb-1 pt-3">
        {/* Title Skeleton */}
        <div className="h-4 w-3/4 rounded bg-slate-200" />
        
        {/* Description Skeleton */}
        <div className="mt-2 space-y-1">
          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="h-2 w-5/6 rounded bg-slate-100" />
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div className="space-y-1">
            {/* Price Skeleton */}
            <div className="h-4 w-16 rounded bg-slate-200" />
            <div className="h-2 w-8 rounded bg-slate-100" />
          </div>

          {/* Icon Button Skeleton */}
          <div className="h-8 w-8 rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

/**
 * MenuGridSkeleton - Renders a grid of skeletons based on count
 */
export function MenuGridSkeleton({ count = 8, gridClass = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <MenuSkeleton key={i} />
      ))}
    </div>
  );
}
