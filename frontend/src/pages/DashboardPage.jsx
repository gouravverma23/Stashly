import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bookmark,
  Heart,
  FolderOpen,
  TrendingUp,
  Plus,
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
            {getGreeting()}, {user?.name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your bookmarks.
          </p>
        </div>
        <Link to="/bookmarks/new" className="btn-primary text-sm">
          <Plus className="w-4 h-4 mr-1.5" /> Add Bookmark
        </Link>
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
              color="primary"
              delay={0}
            />
            <StatsCard
              icon={Heart}
              label="Favorites"
              value={stats?.favoriteCount || 0}
              color="rose"
              delay={0.1}
            />
            <StatsCard
              icon={FolderOpen}
              label="Categories"
              value={stats?.categoryCount || 0}
              color="accent"
              delay={0.2}
            />
            <StatsCard
              icon={TrendingUp}
              label="Total Clicks"
              value={stats?.mostVisited?.reduce((sum, b) => sum + b.clickCount, 0) || 0}
              color="amber"
              delay={0.3}
            />
          </>
        )}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Visited */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <h2 className="flex items-center gap-2 text-lg font-semibold text-card-foreground mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            Most Visited
          </h2>
          {loading && !stats ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
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
            <div className="space-y-3">
              {stats.mostVisited.map((bookmark, i) => (
                <div
                  key={bookmark._id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group cursor-pointer border border-transparent hover:border-border"
                  onClick={() => {
                    trackClick(bookmark._id);
                    window.open(bookmark.url, '_blank');
                  }}
                >
                  <span className="text-sm font-bold text-muted-foreground w-6 text-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate group-hover:text-primary transition-colors">
                      {bookmark.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{bookmark.url}</p>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted border border-border px-2 py-1 rounded-lg">
                    {bookmark.clickCount} clicks
                  </span>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              Start clicking your bookmarks to see stats here.
            </p>
          )}
        </motion.div>

        {/* Recent Bookmarks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Clock className="w-5 h-5 text-secondary dark:text-accent-foreground" />
              Recent Bookmarks
            </h2>
            <Link to="/bookmarks" className="text-sm text-primary hover:underline font-medium">
              View all
            </Link>
          </div>
          {loading && !stats ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                  <Skeleton className="w-6 h-6 rounded flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : stats?.recentBookmarks?.length > 0 ? (
            <div className="space-y-3">
              {stats.recentBookmarks.map((bookmark) => (
                <div
                  key={bookmark._id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group cursor-pointer border border-transparent hover:border-border"
                  onClick={() => {
                    trackClick(bookmark._id);
                    window.open(bookmark.url, '_blank');
                  }}
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`}
                    alt=""
                    className="w-6 h-6 rounded flex-shrink-0"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-card-foreground truncate group-hover:text-primary transition-colors">
                      {bookmark.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {new Date(bookmark.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  {bookmark.isFavorite && (
                    <Heart className="w-4 h-4 text-destructive fill-current flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">
              No bookmarks yet. <Link to="/bookmarks/new" className="text-primary hover:underline">Add your first!</Link>
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;
