import { motion } from 'motion/react';
import { Play, Pause, Heart, MoreHorizontal, Radio } from 'lucide-react';
import { Station } from '../constants';
import { PlayerStatus } from './Player';

interface NowPlayingHeroProps {
  station: Station;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlay: (station: Station) => void;
  onViewStation: (station: Station) => void;
  playerStatus: PlayerStatus;
  onGenreClick?: (genre: string) => void;
}

export default function NowPlayingHero({
  station,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onViewStation,
  playerStatus,
  onGenreClick
}: NowPlayingHeroProps) {
  const isPlaying = playerStatus === 'playing' || playerStatus === 'buffering';
  const color = '#7c3aed'; // Default primary color

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden mb-8 shadow-2xl"
    >
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color} 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${color} 0%, transparent 50%)`,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative bg-secondary/40 backdrop-blur-xl border border-border p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8">
        {/* Left Side: Station Info */}
        <div className="flex-1 flex flex-col items-start text-left w-full">
          <div className="flex items-center gap-4 mb-4 sm:mb-6 w-full">
            <div className="w-16 h-16 sm:w-20 sm:h-24 rounded-2xl overflow-hidden shadow-xl shrink-0 border border-border">
              <img 
                src={station.logo} 
                alt={station.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col items-start flex-1 min-w-0">
              <button
                onClick={() => onGenreClick?.(station.genre)}
                className="px-2 py-1 sm:px-3 sm:py-1 bg-background/50 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 sm:mb-2 hover:text-primary hover:bg-background transition-colors"
              >
                {station.genre}
              </button>
              <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tighter truncate w-full">
                {station.name}
              </h1>
              <p className="text-sm text-muted-foreground md:hidden mt-1 truncate w-full">
                {station.nowPlaying?.artist} — {station.nowPlaying?.title}
              </p>
            </div>
          </div>

          <p className="hidden md:block text-muted-foreground text-base mb-6 max-w-md line-clamp-2">
            {station.description || 'Слушайте лучшую музыку и интересные программы в прямом эфире.'}
          </p>

          <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={() => onPlay(station)}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
              style={{ backgroundColor: color, color: '#fff' }}
            >
              {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} className="ml-1" />}
            </button>
            
            <button
              onClick={() => onToggleFavorite(station.id)}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-background/50 border border-border hover:bg-background transition-colors shrink-0 ${isFavorite ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>

            <button
              onClick={() => onViewStation(station)}
              className="flex-1 sm:flex-none px-4 sm:px-6 h-12 sm:h-14 rounded-full flex items-center justify-center bg-background/50 border border-border hover:bg-background transition-colors font-bold text-sm"
            >
              Подробнее
            </button>
          </div>
        </div>

        {/* Right Side: Now Playing */}
        <div className="hidden md:block w-[280px] lg:w-[320px] shrink-0">
          <div className="bg-background/60 border border-border rounded-3xl p-4 sm:p-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">В эфире</span>
            </div>

            <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
              <img 
                src={station.nowPlaying?.image || station.logo} 
                alt={station.nowPlaying?.title || 'В эфире'} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Radio className="text-white/50 mb-2" size={24} />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold truncate mb-1">
                {station.nowPlaying?.title || 'Прямой эфир'}
              </h3>
              <p className="text-muted-foreground truncate">
                {station.nowPlaying?.artist || station.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
