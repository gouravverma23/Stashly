import { useState } from 'react';
import { Search, Menu, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onMenuClick, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-card/90 backdrop-blur-md border-b border-border text-card-foreground">
      <div className="flex items-center justify-between px-4 lg:px-8 h-14">
        {/* Left: Menu + Search */}
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-4 h-4" />
          </button>

          <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              id="search-bookmarks"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bookmarks..."
              className="w-full h-9 pl-9 pr-3 bg-input border border-border rounded-lg text-xs font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-all"
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 ml-4">
          <ThemeToggle />
          <button
            onClick={() => navigate('/bookmarks/new')}
            className="btn-primary !h-9 !px-3.5 text-xs font-semibold gap-1.5 rounded-lg"
            id="add-bookmark-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add Bookmark</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
