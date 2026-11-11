import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Heart,
  FolderOpen,
  TrendingUp,
  ExternalLink,
  Clock,
  BarChart3,
} from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/StatsCard';
import StatsCardSkeleton from '../components/skeletons/StatsCardSkeleton';
import Skeleton from '../components/skeletons/Skeleton';
import ServerWakeupNotice from '../components/ServerWakeupNotice';

const DashboardPage = () => {
  const { stats, fetchStats, trackClick, loading } = useBookmarks();
  const { user } = useAuth();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Here's what's happening with your bookmarks.
          </p>
        </div>
      </motion.div>

      {loading && !stats && <ServerWakeupNotice />}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading && !stats ? (
          Array.from({ length: 4 }).map((_, i) => <StatsCardSkeleton key={i} />)
        ) : (
          <>
            <StatsCard
              icon={Bookmark}
              label="Total Bookmarks"
              value={stats?.totalBookmarks || 0}
              subtitle="All saved bookmarks"
              sparkline="line"
              color="primary"
              delay={0}
            />
            <StatsCard
              icon={Heart}
              label="Favorites"
              value={stats?.favoriteCount || 0}
              subtitle="Starred resources"
              sparkline="curve"
              color="rose"
              delay={0.08}
            />
            <StatsCard
              icon={FolderOpen}
              label="Categories"
              value={stats?.categoryCount || 0}
              subtitle="Organized collections"
              sparkline="bars"
              color="accent"
              delay={0.16}
            />
            <StatsCard
              icon={TrendingUp}
              label="Total Clicks"
              value={stats?.mostVisited?.reduce((sum, b) => sum + b.clickCount, 0) || 0}
              subtitle="Link engagements"
              sparkline="area"
              color="amber"
              delay={0.24}
            />
          </>
        )}
      </div>

      {/* Two columns: Most Visited & Recent Bookmarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Most Visited */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-6"
        >
          <h2 className="flex items-center gap-2 text-sm font-bold text-card-foreground mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            Most Visited
          </h2>
          {loading && !stats ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg">
                  <Skeleton className="w-6 h-6 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
              ))}
            </div>
          ) : stats?.mostVisited?.length > 0 ? (
            <div className="space-y-2">
              {stats.mostVisited.map((bookmark, i) => (
                <div
                  key={bookmark._id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group cursor-pointer border border-transparent hover:border-border"
                  onClick={() => {
                    trackClick(bookmark._id);
                    window.open(bookmark.url, '_blank');
                  }}
                >
                  <span className="text-xs font-bold text-muted-foreground w-5 text-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
                      {bookmark.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">{bookmark.url}</p>
                  </div>
                  <span className="text-[11px] font-medium text-muted-foreground bg-muted border border-border px-2 py-0.5 rounded-md">
                    {bookmark.clickCount} clicks
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              Start clicking your bookmarks to see stats here.
            </p>
          )}
        </motion.div>

        {/* Recent Bookmarks */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-card-foreground">
              <Clock className="w-4 h-4 text-secondary dark:text-accent-foreground" />
              Recent Bookmarks
            </h2>
            <Link to="/bookmarks" className="text-xs text-primary hover:underline font-semibold">
              View all
            </Link>
          </div>
          {loading && !stats ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg">
                  <Skeleton className="w-6 h-6 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : stats?.recentBookmarks?.length > 0 ? (
            <div className="space-y-2">
              {stats.recentBookmarks.map((bookmark) => (
                <div
                  key={bookmark._id}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group cursor-pointer border border-transparent hover:border-border"
                  onClick={() => {
                    trackClick(bookmark._id);
                    window.open(bookmark.url, '_blank');
                  }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`}
                    alt=""
                    className="w-5 h-5 rounded flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-card-foreground truncate group-hover:text-primary transition-colors">
                      {bookmark.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {new Date(bookmark.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {bookmark.isFavorite && (
                    <Heart className="w-3.5 h-3.5 text-destructive fill-current flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground text-center py-8">
              No bookmarks yet. <Link to="/bookmarks/new" className="text-primary hover:underline font-medium">Add your first!</Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
