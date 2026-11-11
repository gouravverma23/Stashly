import Skeleton from './Skeleton';

const CollectionCardSkeleton = () => {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="h-2 w-full rounded-none" />
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-xl flex-shrink-0" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>
        </div>
        <div className="space-y-1.5 pt-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default CollectionCardSkeleton;
