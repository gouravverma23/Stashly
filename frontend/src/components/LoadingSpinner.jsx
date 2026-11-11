import { motion } from 'framer-motion';

const LoadingSpinner = ({ fullScreen = false, size = 'md' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };

  const spinner = (
    <motion.div
      className={`${sizes[size]} border-2 border-primary-500/20 border-t-primary rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
          {spinner}
          <p className="text-muted-foreground text-sm animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      {spinner}
    </div>
  );
};

export default LoadingSpinner;
