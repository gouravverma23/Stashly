import Skeleton from './Skeleton';

const StatsCardSkeleton = () => {
  return (
    <div className="glass-card p-6 flex items-center gap-4">
      <Skeleton className="w-12 h-12 rounded-2xl flex-shrink-0" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-7 w-16" />
      </div>
    </div>
  );
};

export default StatsCardSkeleton;
