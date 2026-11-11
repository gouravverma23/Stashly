import Skeleton from './Skeleton';

const BookmarkCardSkeleton = ({ hasImage = true }) => {
  return (
    <div className="glass-card overflow-hidden transition-all duration-300">
      {/* Top Banner / Image Placeholder */}
      {hasImage ? (
        <Skeleton className="h-36 w-full rounded-none" />
      ) : (
        <Skeleton className="h-2 w-full rounded-none" />
      )}

      <div className="p-5 space-y-4">
        {/* Header: Favicon + Title & URL */}
        <div className="flex items-start gap-3">
          <Skeleton className="w-6 h-6 rounded flex-shrink-0 mt-0.5" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3.5 w-1/2" />
          </div>
        </div>

        {/* Description Lines */}
        <div className="space-y-2 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Tag Chips */}
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-5 w-14 !rounded-full" />
          <Skeleton className="h-5 w-16 !rounded-full" />
          <Skeleton className="h-5 w-12 !rounded-full" />
        </div>

        {/* Category & Clicks */}
        <div className="flex items-center justify-between pt-1">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Actions Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <Skeleton className="w-8 h-8 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCardSkeleton;
