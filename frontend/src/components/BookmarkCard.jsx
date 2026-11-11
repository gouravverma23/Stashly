import { motion } from 'framer-motion';
import { Heart, ExternalLink, Edit3, Trash2, BarChart3 } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import { useNavigate } from 'react-router-dom';

const BookmarkCard = ({ bookmark, onDelete, index = 0 }) => {
  const { toggleFavorite, trackClick } = useBookmarks();
  const navigate = useNavigate();

  const handleClick = () => {
    trackClick(bookmark._id);
    window.open(bookmark.url, '_blank', 'noopener,noreferrer');
  };

  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="glass-card group hover:shadow-xl hover:shadow-primary-500/5 dark:hover:shadow-primary-500/10 transition-all duration-300 overflow-hidden"
    >
      {/* OG Image / Gradient Header */}
      {bookmark.ogImage ? (
        <div className="h-36 overflow-hidden">
          <img
            src={bookmark.ogImage}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      ) : (
        <div className="h-2 bg-gradient-to-r from-primary to-chart-2" />
      )}

      <div className="p-5">
        {/* Header: Favicon + Title */}
        <div className="flex items-start gap-3 mb-3">
          <img
            src={bookmark.favicon || getFaviconUrl(bookmark.url)}
            alt=""
            className="w-6 h-6 rounded mt-0.5 flex-shrink-0"
            onError={(e) => { e.target.src = `https://www.google.com/s2/favicons?domain=${new URL(bookmark.url).hostname}&sz=32`; }}
          />
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-card-foreground truncate cursor-pointer hover:text-primary transition-colors"
              onClick={handleClick}
              title={bookmark.title}
            >
              {bookmark.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {bookmark.url}
            </p>
          </div>
        </div>

        {/* Description */}
        {bookmark.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {bookmark.description}
          </p>
        )}

        {/* Tags */}
        {bookmark.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {bookmark.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-chip text-[11px]">{tag}</span>
            ))}
            {bookmark.tags.length > 3 && (
              <span className="text-[11px] text-muted-foreground">+{bookmark.tags.length - 3}</span>
            )}
          </div>
        )}

        {/* Category & Stats */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-muted border border-border text-muted-foreground">
            {bookmark.category}
          </span>
          {bookmark.clickCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <BarChart3 className="w-3 h-3 text-primary" />
              {bookmark.clickCount} clicks
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleFavorite(bookmark._id)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150 ${
                bookmark.isFavorite
                  ? 'text-destructive bg-destructive/10'
                  : 'text-muted-foreground hover:text-destructive hover:bg-muted'
              }`}
              title={bookmark.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-4 h-4 ${bookmark.isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleClick}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-150"
              title="Open link"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate(`/bookmarks/edit/${bookmark._id}`)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-150"
              title="Edit"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(bookmark._id)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-muted transition-all duration-150"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookmarkCard;
