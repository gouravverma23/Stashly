import { useState, useEffect } from 'react';
import { Server, Zap } from 'lucide-react';

const ServerWakeupNotice = ({ timeoutMs = 4000 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, timeoutMs);

    return () => clearTimeout(timer);
  }, [timeoutMs]);

  if (!show) return null;

  return (
    <div className="flex items-center justify-between gap-3 p-3.5 bg-chart-4/15 border border-chart-4/30 text-card-foreground rounded-xl text-sm animate-fade-in mb-4">
      <div className="flex items-center gap-2.5">
        <Server className="w-4 h-4 text-chart-4 animate-pulse flex-shrink-0" />
        <span>
          <strong className="text-foreground">Waking up backend server...</strong> Render free tier spins down after inactivity. Please allow ~30s for initial startup.
        </span>
      </div>
      <Zap className="w-4 h-4 text-chart-4 flex-shrink-0" />
    </div>
  );
};

export default ServerWakeupNotice;
