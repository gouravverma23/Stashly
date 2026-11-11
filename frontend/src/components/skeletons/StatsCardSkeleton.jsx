import Skeleton from './Skeleton';

const StatsCardSkeleton = () => {
  return (
    <div className="glass-card p-5 space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-3.5 w-24" />
        <Skeleton className="w-8 h-8 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-8 w-full mt-2" />
    </div>
  );
};

export default StatsCardSkeleton;
