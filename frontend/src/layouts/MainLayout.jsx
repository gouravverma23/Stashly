import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useBookmarks } from '../context/BookmarkContext';
import {
  AnimatedSidebarProvider,
  AnimatedSidebarInset,
} from '@/components/ui/animated-sidebar';

const MainLayout = () => {
  const { searchBookmarks, fetchBookmarks } = useBookmarks();

  const handleSearch = (query) => {
    if (query) {
      searchBookmarks(query);
    } else {
      fetchBookmarks();
    }
  };

  return (
    <AnimatedSidebarProvider defaultOpen={true}>
      <Sidebar />
      <AnimatedSidebarInset className="min-h-screen bg-background text-foreground flex flex-col flex-1 min-w-0">
        <Navbar onSearch={handleSearch} />
        <main className="p-4 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          <Outlet />
        </main>
      </AnimatedSidebarInset>
    </AnimatedSidebarProvider>
  );
};

export default MainLayout;
