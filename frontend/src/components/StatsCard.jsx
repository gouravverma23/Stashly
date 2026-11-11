import { motion } from 'framer-motion';

const StatsCard = ({
  icon: Icon,
  label,
  value,
  subtitle = '+12% from last month',
  sparkline = 'line',
  color = 'primary',
  delay = 0,
}) => {
  const bgMap = {
    primary: 'bg-primary-500/10 dark:bg-primary-500/20 text-primary',
    accent: 'bg-secondary-500/10 dark:bg-secondary-500/20 text-secondary dark:text-accent-foreground',
    rose: 'bg-destructive/10 dark:bg-destructive/20 text-destructive',
    amber: 'bg-chart-4/15 dark:bg-chart-4/20 text-chart-4',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
      className="glass-card p-5 hover:border-primary/40 transition-all duration-200 flex flex-col justify-between overflow-hidden relative group"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-muted-foreground">{label}</p>
          {Icon && (
            <div className={`w-8 h-8 rounded-lg ${bgMap[color]} flex items-center justify-center`}>
              <Icon className="w-4 h-4" />
            </div>
          )}
        </div>

        <p className="text-3xl font-extrabold tracking-tight text-card-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>

        {subtitle && (
          <p className="text-xs font-medium text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Orange sparkline chart directly styled like reference screenshot */}
      <div className="mt-4 pt-2 -mx-5 -mb-5 h-12 overflow-hidden opacity-85 group-hover:opacity-100 transition-opacity">
        {sparkline === 'line' && (
          <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M0,32 Q25,28 50,20 T100,24 T150,14 T200,8"
              fill="none"
              stroke="#df6035"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="20" cy="28" r="2.5" fill="#df6035" />
            <circle cx="75" cy="22" r="2.5" fill="#df6035" />
            <circle cx="130" cy="20" r="2.5" fill="#df6035" />
            <circle cx="185" cy="10" r="2.5" fill="#df6035" />
          </svg>
        )}
        {sparkline === 'curve' && (
          <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="grad-area" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#df6035" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#df6035" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,35 Q60,30 110,18 T200,10 L200,40 L0,40 Z"
              fill="url(#grad-area)"
            />
            <path
              d="M0,35 Q60,30 110,18 T200,10"
              fill="none"
              stroke="#df6035"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        )}
        {sparkline === 'bars' && (
          <div className="flex items-end justify-between gap-1.5 h-full px-5 pb-2">
            {[45, 60, 30, 75, 50, 85, 70, 40, 65, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-primary rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        )}
        {sparkline === 'area' && (
          <svg className="w-full h-full" viewBox="0 0 200 40" preserveAspectRatio="none">
            <path
              d="M0,28 Q30,18 60,25 T120,12 T170,18 T200,24"
              fill="none"
              stroke="#df6035"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M0,32 Q30,26 60,30 T120,24 T170,26 T200,30"
              fill="none"
              stroke="#df6035"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.6"
            />
            <circle cx="60" cy="25" r="2.5" fill="#df6035" />
            <circle cx="120" cy="12" r="2.5" fill="#df6035" />
            <circle cx="170" cy="18" r="2.5" fill="#df6035" />
          </svg>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
