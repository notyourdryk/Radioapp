import { motion } from 'motion/react';
import { Play, Heart, Search, Volume2, AlertCircle, Loader2 } from 'lucide-react';
import StationCard from '../components/StationCard';
import { MOCK_STATIONS } from '../constants';
import Skeleton, { StationCardSkeleton } from '../components/Skeleton';

export default function UIComponents() {
  const mockStation = MOCK_STATIONS[0];

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black tracking-tighter">UI Components</h1>
        <p className="text-muted-foreground">Shadcn-inspired design system for Radioplayer 2.0</p>
      </div>

      {/* Station Card States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Station Card</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Default</span>
            <StationCard 
              station={mockStation} 
              isActive={false} 
              isFavorite={false} 
              onPlay={() => {}} 
              onToggleFavorite={() => {}} 
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Active / Playing</span>
            <StationCard 
              station={mockStation} 
              isActive={true} 
              isFavorite={false} 
              onPlay={() => {}} 
              onToggleFavorite={() => {}} 
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Liked</span>
            <StationCard 
              station={mockStation} 
              isActive={false} 
              isFavorite={true} 
              onPlay={() => {}} 
              onToggleFavorite={() => {}} 
            />
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Skeleton</span>
            <StationCardSkeleton />
          </div>
        </div>
      </section>

      {/* Button States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Primary</span>
            <button className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:scale-105 transition-transform">
              Play Station
            </button>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Secondary</span>
            <button className="px-6 py-3 bg-secondary text-foreground rounded-xl font-bold hover:bg-muted transition-colors border border-border">
              Settings
            </button>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Ghost</span>
            <button className="p-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl transition-all">
              <Heart size={20} />
            </button>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Loading</span>
            <button disabled className="px-6 py-3 bg-primary/50 text-white rounded-xl font-bold flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Loading
            </button>
          </div>
        </div>
      </section>

      {/* Input States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Inputs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Default</span>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-secondary/50 border border-border rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Error</span>
            <div className="relative">
              <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" size={18} />
              <input 
                type="text" 
                defaultValue="Invalid query" 
                className="w-full bg-red-500/5 border border-red-500/50 rounded-xl py-2 pl-10 pr-4 focus:outline-none text-red-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Slider States */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold border-b border-border pb-2">Sliders</h2>
        <div className="max-w-xs space-y-8">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block">Volume (80%)</span>
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-muted-foreground" />
              <div className="flex-1 h-1.5 bg-secondary rounded-full relative">
                <div className="absolute top-0 left-0 h-full w-[80%] bg-primary rounded-full" />
                <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
