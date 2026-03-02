import { motion } from 'motion/react';
import { Play, Heart } from 'lucide-react';
import { Station } from '../constants';

interface StationCardProps {
  key?: string | number;
  station: Station;
  isActive: boolean;
  isFavorite: boolean;
  onPlay: (station: Station) => void;
  onToggleFavorite: (id: string) => void;
  onViewStation?: (station: Station) => void;
  onGenreClick?: (genre: string) => void;
}

export default function StationCard({ 
  station, 
  isActive, 
  isFavorite, 
  onPlay, 
  onToggleFavorite,
  onViewStation,
  onGenreClick
}: StationCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="group relative bg-secondary/50 rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={station.logo}
          alt={station.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onPlay(station)}
            className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform active:scale-95"
          >
            <Play fill="currentColor" className="ml-1" />
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(station.id);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
            isFavorite ? 'bg-primary text-white' : 'bg-black/20 text-white/70 hover:bg-black/40'
          }`}
        >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
        </button>

        {/* Live Badge */}
        {isActive && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-primary text-[10px] font-bold uppercase tracking-wider rounded-md animate-pulse">
            В эфире
          </div>
        )}
      </div>

      <div className="p-4">
        <button 
          onClick={() => onViewStation?.(station)}
          className="font-bold text-lg truncate hover:text-primary transition-colors text-left w-full block"
        >
          {station.name}
        </button>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onGenreClick?.(station.genre);
          }}
          className="text-sm text-muted-foreground truncate hover:text-primary transition-colors text-left"
        >
          {station.genre}
        </button>
      </div>
    </motion.div>
  );
}
