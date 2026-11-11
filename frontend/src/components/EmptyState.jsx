import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';

const EmptyState = ({ title = 'No bookmarks yet', message = 'Start saving your favorite links!', icon: Icon = Bookmark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-sm">{message}</p>
    </motion.div>
  );
};

export default EmptyState;
