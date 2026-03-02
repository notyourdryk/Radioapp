import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, SkipBack, SkipForward, 
  Volume2, VolumeX, Maximize2, Heart, 
  Share2, ListMusic, Loader2, AlertCircle, RefreshCw, Radio
} from 'lucide-react';
import { Station } from '../constants';

export type PlayerStatus = 'idle' | 'buffering' | 'playing' | 'paused' | 'error' | 'reconnecting';

interface PlayerProps {
  activeStation: Station | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  status?: PlayerStatus;
  onStatusChange?: (status: PlayerStatus) => void;
  onShareClick?: () => void;
  onPlaylistClick?: () => void;
  onFullscreenClick?: () => void;
  onViewStation?: (station: Station) => void;
}

export default function Player({ 
  activeStation, 
  isFavorite, 
  onToggleFavorite, 
  status = 'idle',
  onStatusChange,
  onShareClick,
  onPlaylistClick,
  onFullscreenClick,
  onViewStation
}: PlayerProps) {
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = status === 'playing' || status === 'buffering';

  useEffect(() => {
    if (activeStation) {
      if (onStatusChange) onStatusChange('buffering');
      
      // Simulate buffering
      const timer = setTimeout(() => {
        if (onStatusChange) onStatusChange('playing');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [activeStation]);

  const togglePlay = () => {
    if (!activeStation) return;
    if (isPlaying) {
      if (onStatusChange) onStatusChange('paused');
    } else {
      if (onStatusChange) onStatusChange('playing');
    }
  };

  const statusIcons = {
    buffering: <Loader2 className="animate-spin text-primary" size={20} />,
    reconnecting: <RefreshCw className="animate-spin text-amber-500" size={20} />,
    error: <AlertCircle className="text-red-500" size={20} />,
    playing: null,
    paused: null,
    idle: null
  };

  const statusText = {
    buffering: 'Буферизация...',
    reconnecting: 'Переподключение...',
    error: 'Поток недоступен',
    playing: 'В эфире',
    paused: 'Пауза',
    idle: ''
  };

  if (!activeStation) {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-border shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 h-20 sm:h-24 flex items-center justify-between gap-4 opacity-50 pointer-events-none">
          {/* Station Info Placeholder */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-none sm:w-[300px]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary shrink-0 border border-border flex items-center justify-center">
              <Radio size={24} className="text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-sm sm:text-base truncate text-muted-foreground">Станция не выбрана</h4>
              <p className="text-xs text-muted-foreground truncate">Выберите станцию для прослушивания</p>
            </div>
          </div>
          
          {/* Controls Placeholder */}
          <div className="flex flex-col items-center gap-1 flex-1">
            <div className="flex items-center gap-4 sm:gap-8">
              <button className="text-muted-foreground hidden sm:block">
                <SkipBack size={20} />
              </button>
              <button className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-secondary text-muted-foreground">
                <Play fill="currentColor" className="ml-1" />
              </button>
              <button className="text-muted-foreground hidden sm:block">
                <SkipForward size={20} />
              </button>
            </div>
          </div>

          {/* Volume Placeholder */}
          <div className="hidden md:flex items-center justify-end gap-6 w-[300px]">
            <div className="flex items-center gap-3">
              <Volume2 size={20} className="text-muted-foreground" />
              <div className="w-24 h-1.5 bg-secondary rounded-full" />
            </div>
            <div className="flex items-center gap-3">
              <ListMusic size={20} className="text-muted-foreground" />
              <Share2 size={20} className="text-muted-foreground" />
              <Maximize2 size={20} className="text-muted-foreground" />
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-2xl border-t border-border shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 h-20 sm:h-24 flex items-center justify-between gap-4">
        {/* Station Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1 sm:flex-none sm:w-[300px]">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shrink-0 border border-border relative">
            <img 
              src={activeStation.logo} 
              alt={activeStation.name} 
              className={`w-full h-full object-cover transition-opacity ${status === 'buffering' ? 'opacity-50' : 'opacity-100'}`}
              referrerPolicy="no-referrer"
            />
            {status === 'buffering' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="animate-spin text-white" size={20} />
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onViewStation?.(activeStation)}
                className="font-bold text-sm sm:text-base truncate hover:text-primary transition-colors text-left"
              >
                {activeStation.name}
              </button>
              <button 
                onClick={() => onToggleFavorite(activeStation.id)}
                className={`${isFavorite ? 'text-primary' : 'text-muted-foreground hover:text-foreground'} transition-colors`}
              >
                <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${status === 'playing' ? 'bg-emerald-500 animate-pulse' : 'bg-muted'}`} />
                <p className="text-xs text-muted-foreground truncate whitespace-nowrap">
                  {status === 'playing' ? `${activeStation.nowPlaying?.artist} - ${activeStation.nowPlaying?.title}` : statusText[status]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="flex items-center gap-4 sm:gap-8">
            <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={togglePlay}
              disabled={status === 'buffering' || status === 'reconnecting'}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
                status === 'error' ? 'bg-red-500 text-white' : 'bg-primary text-white shadow-primary/20 hover:scale-105 active:scale-95'
              }`}
            >
              {status === 'buffering' || status === 'reconnecting' ? (
                <Loader2 className="animate-spin" />
              ) : isPlaying ? (
                <Pause fill="currentColor" />
              ) : (
                <Play fill="currentColor" className="ml-1" />
              )}
            </button>

            <button className="text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
              <SkipForward size={20} />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full max-w-md hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">{statusText[status]}</span>
            <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${status === 'error' ? 'bg-red-500' : 'bg-primary'}`}
                animate={status === 'playing' ? { width: ["0%", "100%"] } : { width: "100%" }}
                transition={status === 'playing' ? { duration: 10, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
              />
            </div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">{activeStation.bitrate}</span>
          </div>
        </div>

        {/* Volume & Extra */}
        <div className="hidden md:flex items-center justify-end gap-6 w-[300px]">
          <div className="flex items-center gap-3 group">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <div className="w-24 h-1.5 bg-secondary rounded-full relative cursor-pointer">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full" 
                style={{ width: `${isMuted ? 0 : volume}%` }} 
              />
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseInt(e.target.value));
                  setIsMuted(false);
                }}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={onPlaylistClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ListMusic size={20} />
            </button>
            <button 
              onClick={onShareClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 size={20} />
            </button>
            <button 
              onClick={onFullscreenClick}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
