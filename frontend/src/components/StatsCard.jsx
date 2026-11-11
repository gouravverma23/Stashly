import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, label, value, color = 'primary', delay = 0 }) => {
  const bgMap = {
    primary: 'bg-primary-500/10 dark:bg-primary-500/20',
    accent: 'bg-secondary-500/10 dark:bg-secondary-500/20',
    rose: 'bg-destructive/10 dark:bg-destructive/20',
    amber: 'bg-chart-4/15 dark:bg-chart-4/20',
  };

  const iconColorMap = {
    primary: 'text-primary',
    accent: 'text-secondary dark:text-accent-foreground',
    rose: 'text-destructive',
    amber: 'text-chart-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl ${bgMap[color]} flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColorMap[color]}`} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
