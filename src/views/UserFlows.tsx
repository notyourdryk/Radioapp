import { motion } from 'motion/react';
import { 
  WifiOff, Search, Car, Heart, 
  MapPin, AlertCircle, CloudOff, 
  Play, ArrowRight, RefreshCw
} from 'lucide-react';

interface FlowStep {
  title: string;
  description: string;
  icon: any;
  action: () => void;
}

interface UserFlowsProps {
  onTriggerFlow: (id: number) => void;
}

export default function UserFlows({ onTriggerFlow }: UserFlowsProps) {
  const flows = [
    { id: 1, title: 'Mobile, unstable network', description: 'Simulate network loss during playback and auto-recovery.', icon: <WifiOff size={24} /> },
    { id: 2, title: 'Desktop, background listener', description: 'Demonstrate Ctrl+K search and navigation without stopping audio.', icon: <Search size={24} /> },
    { id: 3, title: 'Car Mode', description: 'Switch to high-contrast 2x2 grid interface.', icon: <Car size={24} /> },
    { id: 4, title: 'Favorites Flow', description: 'Add/remove stations and see "My Stations" section update.', icon: <Heart size={24} /> },
    { id: 5, title: 'Geolocation Flow', description: 'Simulate IP/GPS detection and manual city override.', icon: <MapPin size={24} /> },
    { id: 6, title: 'Stream Error Flow', description: 'Simulate 3 reconnection attempts (1s/3s/5s) and fallback.', icon: <AlertCircle size={24} /> },
    { id: 7, title: 'Offline Mode', description: 'Simulate total network loss and access to cached content.', icon: <CloudOff size={24} /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter">User Flows</h1>
        <p className="text-muted-foreground">Functional prototype scenarios for Radioplayer 2.0</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flows.map((flow) => (
          <motion.button
            key={flow.id}
            whileHover={{ y: -4 }}
            onClick={() => onTriggerFlow(flow.id)}
            className="p-6 bg-secondary/50 border border-border rounded-3xl text-left group hover:border-primary transition-all"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
              {flow.icon}
            </div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{flow.title}</h3>
            <p className="text-sm text-muted-foreground mb-6">{flow.description}</p>
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
              Trigger Flow <ArrowRight size={14} />
            </div>
          </motion.button>
        ))}
      </div>

      <div className="p-8 bg-primary/5 border border-primary/20 rounded-3xl">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <RefreshCw size={20} className="text-primary" /> Prototype Logic
        </h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>All flows are simulated using React state and timeouts to mimic real-world behavior.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>The player is persistent across all views, demonstrating SPA architecture.</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
            <span>Offline states use cached mock data to show "stale-while-revalidate" pattern.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
