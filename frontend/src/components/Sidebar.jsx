import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Bookmark,
  Heart,
  FolderOpen,
  Plus,
  User,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { collectionService } from '../services/collectionService';
import {
  AnimatedSidebar,
  AnimatedSidebarHeader,
  AnimatedSidebarContent,
  AnimatedSidebarGroup,
  AnimatedSidebarGroupLabel,
  AnimatedSidebarGroupContent,
  AnimatedSidebarMenu,
  AnimatedSidebarMenuItem,
  AnimatedSidebarMenuButton,
  AnimatedSidebarMenuSub,
  AnimatedSidebarMenuSubItem,
  AnimatedSidebarMenuSubButton,
  AnimatedSidebarFooter,
  AnimatedSidebarRail,
  AnimatedSidebarClose,
} from '@/components/ui/animated-sidebar';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [collectionsSubmenuOpen, setCollectionsSubmenuOpen] = useState(() => {
    return location.pathname === '/collections' || location.search.includes('collectionId');
  });
  const [collectionsList, setCollectionsList] = useState([]);

  const searchParams = new URLSearchParams(location.search);
  const activeCollectionId = searchParams.get('collectionId');
  const isCollectionsActive = location.pathname === '/collections' || Boolean(activeCollectionId);

  useEffect(() => {
    let isMounted = true;
    const fetchCollections = async () => {
      try {
        const data = await collectionService.getAll();
        if (isMounted && Array.isArray(data)) {
          setCollectionsList(data);
        }
      } catch {
        // silent
      }
    };
    if (user) {
      fetchCollections();
    }
    return () => {
      isMounted = false;
    };
  }, [user, location.pathname]);

  useEffect(() => {
    if (isCollectionsActive) {
      setCollectionsSubmenuOpen(true);
    }
  }, [isCollectionsActive]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatedSidebar
      ariaLabel="Stashly Navigation"
      collapsible="icon"
      className="border-sidebar-border bg-sidebar"
      panelClassName="bg-sidebar border-sidebar-border text-sidebar-foreground"
    >
      {/* Header */}
      <AnimatedSidebarHeader className="p-3 pb-2 border-b border-sidebar-border/60">
        <div className="flex min-h-10 items-center gap-2.5 overflow-hidden px-1">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Bookmark className="size-4" />
          </div>
          <div className="flex min-w-0 flex-1 items-center justify-between group-data-[state=collapsed]/sidebar:hidden">
            <span className="truncate text-base font-bold tracking-tight text-sidebar-foreground font-sans">
              Stashly
            </span>
          </div>
          <AnimatedSidebarClose className="ml-auto text-muted-foreground hover:bg-sidebar-accent md:hidden">
            <X aria-hidden="true" className="size-4" />
          </AnimatedSidebarClose>
        </div>
      </AnimatedSidebarHeader>

      {/* Content */}
      <AnimatedSidebarContent className="px-2 pt-2">
        <AnimatedSidebarGroup className="pb-2">
          <AnimatedSidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Overview
          </AnimatedSidebarGroupLabel>
          <AnimatedSidebarGroupContent>
            <AnimatedSidebarMenu>
              {/* Dashboard */}
              <AnimatedSidebarMenuItem>
                <AnimatedSidebarMenuButton
                  isActive={location.pathname === '/dashboard'}
                  icon={<LayoutDashboard className="size-4 text-sidebar-foreground" />}
                  onSelect={() => navigate('/dashboard')}
                >
                  Dashboard
                </AnimatedSidebarMenuButton>
              </AnimatedSidebarMenuItem>

              {/* Bookmarks */}
              <AnimatedSidebarMenuItem>
                <AnimatedSidebarMenuButton
                  isActive={location.pathname === '/bookmarks' && !activeCollectionId}
                  icon={<Bookmark className="size-4 text-sidebar-foreground" />}
                  onSelect={() => navigate('/bookmarks')}
                >
                  Bookmarks
                </AnimatedSidebarMenuButton>
              </AnimatedSidebarMenuItem>

              {/* Add Bookmark */}
              <AnimatedSidebarMenuItem>
                <AnimatedSidebarMenuButton
                  isActive={location.pathname === '/bookmarks/new'}
                  icon={<Plus className="size-4 text-sidebar-foreground" />}
                  onSelect={() => navigate('/bookmarks/new')}
                >
                  Add Bookmark
                </AnimatedSidebarMenuButton>
              </AnimatedSidebarMenuItem>
            </AnimatedSidebarMenu>
          </AnimatedSidebarGroupContent>
        </AnimatedSidebarGroup>

        <AnimatedSidebarGroup className="pt-1">
          <AnimatedSidebarGroupLabel className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Organize
          </AnimatedSidebarGroupLabel>
          <AnimatedSidebarGroupContent>
            <AnimatedSidebarMenu>
              {/* Collections with Dropdown */}
              <AnimatedSidebarMenuItem>
                <AnimatedSidebarMenuButton
                  isActive={isCollectionsActive}
                  ariaExpanded={collectionsSubmenuOpen}
                  icon={<FolderOpen className="size-4 text-sidebar-foreground" />}
                  onSelect={() => {
                    navigate('/collections');
                    setCollectionsSubmenuOpen((prev) => !prev);
                  }}
                >
                  Collections
                </AnimatedSidebarMenuButton>
                <AnimatedSidebarMenuSub open={collectionsSubmenuOpen}>
                  <AnimatedSidebarMenuSubItem>
                    <AnimatedSidebarMenuSubButton
                      isActive={location.pathname === '/collections'}
                      onSelect={() => navigate('/collections')}
                    >
                      All Collections
                    </AnimatedSidebarMenuSubButton>
                  </AnimatedSidebarMenuSubItem>
                  {collectionsList.map((col) => (
                    <AnimatedSidebarMenuSubItem key={col._id}>
                      <AnimatedSidebarMenuSubButton
                        isActive={activeCollectionId === col._id}
                        icon={
                          <span
                            className="size-2 rounded-full shrink-0"
                            style={{ backgroundColor: col.color || '#df6035' }}
                          />
                        }
                        onSelect={() => navigate(`/bookmarks?collectionId=${col._id}`)}
                      >
                        {col.name}
                      </AnimatedSidebarMenuSubButton>
                    </AnimatedSidebarMenuSubItem>
                  ))}
                </AnimatedSidebarMenuSub>
              </AnimatedSidebarMenuItem>

              {/* Favorites */}
              <AnimatedSidebarMenuItem>
                <AnimatedSidebarMenuButton
                  isActive={location.pathname === '/favorites'}
                  icon={<Heart className="size-4 text-sidebar-foreground" />}
                  onSelect={() => navigate('/favorites')}
                >
                  Favorites
                </AnimatedSidebarMenuButton>
              </AnimatedSidebarMenuItem>

              {/* Profile */}
              <AnimatedSidebarMenuItem>
                <AnimatedSidebarMenuButton
                  isActive={location.pathname === '/profile'}
                  icon={<User className="size-4 text-sidebar-foreground" />}
                  onSelect={() => navigate('/profile')}
                >
                  Profile
                </AnimatedSidebarMenuButton>
              </AnimatedSidebarMenuItem>
            </AnimatedSidebarMenu>
          </AnimatedSidebarGroupContent>
        </AnimatedSidebarGroup>
      </AnimatedSidebarContent>

      {/* Footer */}
      <AnimatedSidebarFooter className="border-t border-sidebar-border/60 p-2 gap-1.5">
        {/* User Card */}
        {user && (
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="flex min-h-10 w-full items-center gap-2.5 overflow-hidden rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground shadow-sm">
              {getInitials(user.name)}
            </span>
            <span className="min-w-0 flex-1 group-data-[state=collapsed]/sidebar:hidden">
              <span className="block truncate text-xs font-semibold text-sidebar-foreground font-sans">
                {user.name}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground font-mono">
                {user.email}
              </span>
            </span>
            <ChevronRight
              aria-hidden="true"
              className="size-3.5 shrink-0 text-muted-foreground group-hover:text-sidebar-foreground group-data-[state=collapsed]/sidebar:hidden"
            />
          </button>
        )}

        {/* Logout Button */}
        <AnimatedSidebarMenu>
          <AnimatedSidebarMenuItem>
            <AnimatedSidebarMenuButton
              icon={<LogOut className="size-4 text-destructive" />}
              onSelect={handleLogout}
              className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              Logout
            </AnimatedSidebarMenuButton>
          </AnimatedSidebarMenuItem>
        </AnimatedSidebarMenu>
      </AnimatedSidebarFooter>

      {/* Desktop collapse/expand rail */}
      <AnimatedSidebarRail />
    </AnimatedSidebar>
  );
};

export default Sidebar;
