import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Radio, MapPin, X, Command as CommandIcon } from 'lucide-react';
import { MOCK_STATIONS, CITIES, Station } from '../constants';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStation: (station: Station) => void;
  onSelectCity: (city: string) => void;
}

export default function CommandMenu({ isOpen, onClose, onSelectStation, onSelectCity }: CommandMenuProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // This is handled by parent, but good to have logic
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, [isOpen, onClose]);

  const filteredStations = MOCK_STATIONS.filter(s => 
    s.name.toLowerCase().includes(query.toLowerCase()) || 
    s.genre.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const filteredCities = CITIES.filter(c => 
    c.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh] px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-secondary border border-border rounded-2xl shadow-2xl overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-border gap-3">
            <Search className="text-muted-foreground" size={20} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск станций, жанров, городов..."
              className="flex-1 bg-transparent border-none outline-none text-lg py-1"
            />
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] text-muted-foreground font-mono">
              ESC
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query && filteredStations.length === 0 && filteredCities.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                Ничего не найдено по запросу "{query}"
              </div>
            )}

            {!query && (
              <div className="p-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Рекомендации
              </div>
            )}

            {filteredStations.length > 0 && (
              <div className="mb-4">
                <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Станции
                </div>
                {filteredStations.map(station => (
                  <button
                    key={station.id}
                    onClick={() => {
                      onSelectStation(station);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-left group"
                  >
                    <img 
                      src={station.logo} 
                      className="w-8 h-8 rounded-lg object-cover" 
                      alt="" 
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(station.name)}&background=random&color=fff&size=400`;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{station.name}</div>
                      <div className="text-xs text-muted-foreground group-hover:text-primary/70">{station.genre}</div>
                    </div>
                    <Radio size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}

            {filteredCities.length > 0 && (
              <div>
                <div className="px-3 py-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  Города
                </div>
                {filteredCities.map(city => (
                  <button
                    key={city}
                    onClick={() => {
                      onSelectCity(city);
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-all text-left group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                      <MapPin size={18} className="text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-1 font-bold">{city}</div>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-t border-border flex items-center justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><CommandIcon size={12} /> + K для поиска</span>
              <span className="flex items-center gap-1">↑↓ для навигации</span>
            </div>
            <span>Radioplayer 2.0 Mock</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function ChevronRight({ size, className }: { size: number, className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}
