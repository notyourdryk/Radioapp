import { motion } from 'motion/react';
import { Play, Pause, Heart, Share2, ChevronLeft, Info, Music, LayoutGrid } from 'lucide-react';
import { Station } from '../constants';
import { PlayerStatus } from './Player';

interface StationPageProps {
  station: Station;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onPlay: (station: Station) => void;
  onBack: () => void;
  playerStatus: PlayerStatus;
  isActive: boolean;
  onGenreClick?: (genre: string) => void;
}

export default function StationPage({
  station,
  isFavorite,
  onToggleFavorite,
  onPlay,
  onBack,
  playerStatus,
  isActive,
  onGenreClick
}: StationPageProps) {
  const isPlaying = isActive && playerStatus === 'playing';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto"
    >
      <button 
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft size={20} />
        <span className="font-medium">Назад</span>
      </button>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        {/* Left Column: Artwork & Primary Actions */}
        <div className="w-full md:w-1/3 shrink-0 flex flex-col items-center md:items-start gap-6">
          <div className="w-64 h-64 md:w-full md:aspect-square rounded-[32px] overflow-hidden shadow-2xl border border-border relative group">
            <img 
              src={station.logo} 
              alt={station.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <button
                onClick={() => onPlay(station)}
                className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-all hover:bg-primary/90 active:scale-95"
              >
                {isPlaying ? <Pause fill="currentColor" size={32} /> : <Play fill="currentColor" size={32} className="ml-2" />}
              </button>
            </div>
            {isActive && (
              <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                В эфире
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 w-full justify-center md:justify-start">
            <button
              onClick={() => onPlay(station)}
              className="flex-1 py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 active:scale-95 transition-all shadow-lg shadow-primary/20"
            >
              {isPlaying ? <Pause fill="currentColor" size={20} /> : <Play fill="currentColor" size={20} />}
              {isPlaying ? 'Пауза' : 'Слушать'}
            </button>
            <button
              onClick={() => onToggleFavorite(station.id)}
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all ${
                isFavorite 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-secondary/50 border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="w-14 h-14 rounded-2xl bg-secondary/50 border border-border text-muted-foreground flex items-center justify-center hover:border-primary hover:text-primary transition-all">
              <Share2 size={24} />
            </button>
          </div>
        </div>

        {/* Right Column: Info & Details */}
        <div className="flex-1 w-full text-center md:text-left">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{station.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-muted-foreground font-medium">
              <button 
                onClick={() => onGenreClick?.(station.genre)}
                className="px-3 py-1 bg-secondary rounded-lg border border-border flex items-center gap-2 hover:border-primary hover:text-primary transition-colors"
              >
                <LayoutGrid size={16} />
                {station.genre}
              </button>
              <span className="px-3 py-1 bg-secondary rounded-lg border border-border flex items-center gap-2">
                <Music size={16} />
                {station.bitrate}
              </span>
            </div>
          </div>

          {station.nowPlaying && (
            <div className="p-6 bg-secondary/30 border border-border rounded-3xl mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center shrink-0 shadow-inner">
                  <Music size={24} className="text-primary" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Сейчас играет</p>
                  <h3 className="text-xl font-bold truncate">{station.nowPlaying.title}</h3>
                  <p className="text-muted-foreground truncate">{station.nowPlaying.artist}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <h3 className="text-2xl font-bold flex items-center gap-2 justify-center md:justify-start">
              <Info size={24} className="text-primary" />
              О станции
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Слушайте {station.name}, лучшую радиостанцию в жанре <button onClick={() => onGenreClick?.(station.genre)} className="text-primary hover:underline">{station.genre}</button>. 
              Наслаждайтесь качественным звуком ({station.bitrate}) и отличной подборкой музыки.
              Присоединяйтесь к тысячам слушателей и открывайте для себя новые хиты каждый день.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
