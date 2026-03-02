import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, Radio, Flame, LayoutGrid, List, Car, 
  WifiOff, AlertCircle, CloudOff, RefreshCw, 
  Search, Settings, Bell, User, MapPin, Home,
  Play, Pause, SkipBack, SkipForward, X, ChevronLeft, ChevronRight, Activity, Globe, Music
} from 'lucide-react';
import { MOCK_STATIONS, Station, GENRES, CITIES } from './constants';
import Header from './components/Header';
import Player, { PlayerStatus } from './components/Player';
import StationCard from './components/StationCard';
import Hero from './components/Hero';
import NowPlayingHero from './components/NowPlayingHero';
import CommandMenu from './components/CommandMenu';
import { ToastContainer, ToastType } from './components/Toast';
import Skeleton, { StationCardSkeleton } from './components/Skeleton';
import HorizontalScrollSection from './components/HorizontalScrollSection';
import SearchableDropdown from './components/SearchableDropdown';

import StationPage from './components/StationPage';

type View = 'home' | 'catalog' | 'favorites' | 'settings' | 'station';

export default function App() {
  // Navigation & UI State
  const [currentView, setCurrentView] = useState<View>('home');
  const [viewingStation, setViewingStation] = useState<Station | null>(null);
  const [isCarMode, setIsCarMode] = useState(false);
  const [isCarStationSelectorOpen, setIsCarStationSelectorOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [city, setCity] = useState('Москва');
  const [isOffline, setIsOffline] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Data State
  const [activeStation, setActiveStation] = useState<Station | null>(null);
  const [favorites, setFavorites] = useState<string[]>(['1', '2', '6']);
  const [activeGenre, setActiveGenre] = useState<string>('Все');
  const [toasts, setToasts] = useState<any[]>([]);
  const [playerStatus, setPlayerStatus] = useState<PlayerStatus>('idle');

  const genresRef = useRef<HTMLDivElement>(null);

  const scrollGenres = (direction: 'left' | 'right') => {
    if (genresRef.current) {
      const scrollAmount = 300;
      genresRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Flow Simulation Logic
  const addToast = (message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleFavorite = (id: string) => {
    const isFav = favorites.includes(id);
    setFavorites(prev => 
      isFav ? prev.filter(fid => fid !== id) : [...prev, id]
    );
    addToast(isFav ? 'Удалено из избранного' : 'Добавлено в избранное', isFav ? 'info' : 'success');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCountry, setActiveCountry] = useState('');
  const [activeLanguage, setActiveLanguage] = useState('');

  const filteredStations = useMemo(() => {
    let result = MOCK_STATIONS;
    if (activeGenre && activeGenre !== 'Все') {
      result = result.filter(s => s.genre === activeGenre);
    }
    if (searchQuery) {
      result = result.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (activeCountry) {
      result = result.filter(s => s.city === activeCountry);
    }
    return result;
  }, [activeGenre, searchQuery, activeCountry, activeLanguage]);

  const favoriteStations = useMemo(() => {
    return MOCK_STATIONS.filter(s => favorites.includes(s.id));
  }, [favorites]);

  const randomStations = useMemo(() => {
    return [...MOCK_STATIONS].sort(() => 0.5 - Math.random()).slice(0, 12);
  }, []);

  const handleViewStation = (station: Station) => {
    setViewingStation(station);
    setCurrentView('station');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenreClick = (genre: string) => {
    setActiveGenre(genre);
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayStation = (station: Station) => {
    if (activeStation?.id === station.id) {
      setPlayerStatus(prev => prev === 'playing' || prev === 'buffering' ? 'paused' : 'playing');
    } else {
      setActiveStation(station);
    }
  };

  // Car Mode View
  if (isCarMode) {
    return (
      <div className="fixed inset-0 bg-[#050505] text-white flex flex-col z-[100] overflow-hidden">
        {/* Car Mode Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]">
              <Car size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tighter uppercase leading-none">Режим вождения</h2>
              <p className="text-[9px] font-bold text-primary tracking-[0.3em] uppercase mt-0.5">Безопасный интерфейс</p>
            </div>
          </div>
          <button 
            onClick={() => setIsCarMode(false)}
            className="w-12 h-12 bg-secondary/50 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 relative flex flex-col items-center justify-center min-h-0 pb-32 sm:pb-40 px-6">
          {activeStation ? (
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto w-full">
              <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-[40px] overflow-hidden shadow-2xl border-4 border-white/10 mb-8 relative">
                <img 
                  src={activeStation.logo} 
                  className="w-full h-full object-cover" 
                  alt="" 
                />
                {playerStatus === 'playing' && (
                  <div className="absolute inset-0 bg-primary/20 mix-blend-overlay animate-pulse" />
                )}
              </div>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 truncate w-full">{activeStation.name}</h1>
              <p className="text-xl sm:text-2xl text-white/50 font-medium truncate w-full">
                {activeStation.nowPlaying?.artist} — {activeStation.nowPlaying?.title}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <Radio size={64} className="mx-auto text-white/20 mb-6" />
              <h1 className="text-3xl font-black tracking-tighter text-white/50">Станция не выбрана</h1>
            </div>
          )}
        </div>

        {/* Car Mode Player Controls - Docked at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 p-6 sm:p-8 sm:pb-10 border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl z-20">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
            <button 
              onClick={() => setIsCarStationSelectorOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 hover:bg-white/20 rounded-2xl sm:rounded-[32px] flex items-center justify-center transition-colors shrink-0"
            >
              <List size={32} />
            </button>
            
            <div className="flex items-center gap-4 sm:gap-8">
              <button className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90 border border-white/5 shrink-0">
                <SkipBack size={32} />
              </button>
              <button 
                onClick={() => {
                  if (!activeStation) setIsCarStationSelectorOpen(true);
                  else setPlayerStatus(playerStatus === 'playing' ? 'paused' : 'playing');
                }}
                className="w-20 h-20 sm:w-28 sm:h-28 bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(var(--primary-rgb),0.5)] hover:scale-105 active:scale-90 transition-all shrink-0"
              >
                {playerStatus === 'playing' ? <Pause size={48} fill="white" /> : <Play size={48} fill="white" className="ml-2" />}
              </button>
              <button className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors active:scale-90 border border-white/5 shrink-0">
                <SkipForward size={32} />
              </button>
            </div>

            <div className="w-16 sm:w-20 hidden sm:block shrink-0" />
          </div>
        </div>

        {/* Station Selector Overlay */}
        <AnimatePresence>
          {isCarStationSelectorOpen && (
            <motion.div 
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 bg-[#050505] z-50 flex flex-col p-6 sm:p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tighter">Выберите станцию</h2>
                <button 
                  onClick={() => setIsCarStationSelectorOpen(false)}
                  className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto no-scrollbar pb-8 -mx-2 px-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {MOCK_STATIONS.map(station => (
                    <button
                      key={station.id}
                      onClick={() => {
                        handlePlayStation(station);
                        setIsCarStationSelectorOpen(false);
                      }}
                      className={`relative aspect-square rounded-[32px] border-4 flex flex-col items-center justify-center gap-3 sm:gap-4 transition-all active:scale-95 overflow-hidden group p-4 sm:p-6 ${
                        activeStation?.id === station.id 
                          ? 'border-primary bg-primary/20 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)]' 
                          : 'border-white/5 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="w-1/2 max-w-[120px] aspect-square rounded-2xl overflow-hidden shadow-2xl shrink-0">
                        <img 
                          src={station.logo} 
                          className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${activeStation?.id === station.id ? 'scale-105' : ''}`} 
                          alt="" 
                        />
                      </div>
                      <span className="text-sm sm:text-lg lg:text-xl font-black uppercase tracking-tight text-center truncate w-full px-2">{station.name}</span>
                      {activeStation?.id === station.id && (
                        <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_#7c3aed]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-24 sm:pb-32 transition-colors ${isOffline ? 'grayscale-[0.5]' : ''}`}>
      <Header 
        city={city} 
        onCityChange={setCity} 
        onSearchClick={() => setCurrentView('catalog')}
        onViewChange={setCurrentView}
        currentView={currentView}
        onCarModeClick={() => setIsCarMode(true)}
        onSettingsClick={() => setIsSettingsOpen(true)}
        onProfileClick={() => setIsProfileOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 sm:space-y-12"
            >
              {/* Now Playing Hero */}
              {activeStation && (
                <NowPlayingHero
                  station={activeStation}
                  isFavorite={favorites.includes(activeStation.id)}
                  onToggleFavorite={toggleFavorite}
                  onPlay={handlePlayStation}
                  onViewStation={handleViewStation}
                  playerStatus={playerStatus}
                  onGenreClick={handleGenreClick}
                />
              )}

              {/* Favorites Section */}
              {favorites.length > 0 && (
                <HorizontalScrollSection 
                  title="Мои станции" 
                  icon={<Heart size={20} fill="currentColor" />}
                >
                  {favoriteStations.map(station => (
                    <div key={station.id} className="w-[160px] sm:w-[200px] shrink-0">
                      <StationCard
                        station={station}
                        isActive={activeStation?.id === station.id}
                        isFavorite={true}
                        onPlay={handlePlayStation}
                        onToggleFavorite={toggleFavorite}
                        onViewStation={handleViewStation}
                        onGenreClick={handleGenreClick}
                      />
                    </div>
                  ))}
                </HorizontalScrollSection>
              )}

              {/* Popular Section - 2 Lines */}
              <HorizontalScrollSection 
                title="Все станции" 
                icon={<Flame size={20} />}
                rows={2}
                action={
                  <button 
                    onClick={() => setCurrentView('catalog')}
                    className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                  >
                    Все станции
                  </button>
                }
              >
                {randomStations.map(station => (
                  <div key={station.id} className="w-[160px] sm:w-[200px] shrink-0">
                    <StationCard
                      station={station}
                      isActive={activeStation?.id === station.id}
                      isFavorite={favorites.includes(station.id)}
                      onPlay={handlePlayStation}
                      onToggleFavorite={toggleFavorite}
                      onViewStation={handleViewStation}
                      onGenreClick={handleGenreClick}
                    />
                  </div>
                ))}
              </HorizontalScrollSection>

              {/* Genres Section - 2 Lines */}
              <HorizontalScrollSection 
                title="Жанры" 
                icon={<LayoutGrid size={20} />}
                rows={2}
              >
                {GENRES.map(genre => (
                  <button
                    key={genre}
                    onClick={() => {
                      setActiveGenre(genre);
                      setCurrentView('catalog');
                    }}
                    className="w-[140px] sm:w-[160px] h-24 p-4 bg-secondary/50 border border-border rounded-2xl text-center hover:border-primary hover:bg-primary/5 transition-all group shrink-0 flex flex-col items-center justify-center gap-2"
                  >
                    <div className="font-bold group-hover:text-primary transition-colors">{genre}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Смотреть</div>
                  </button>
                ))}
              </HorizontalScrollSection>

              <Hero stations={MOCK_STATIONS.slice(0, 5)} onPlay={handlePlayStation} onGenreClick={handleGenreClick} />
            </motion.div>
          )}

          {currentView === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-black tracking-tighter">Каталог</h1>
                
                {/* Search Box */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                  <input 
                    type="text" 
                    placeholder="Поиск станций..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-2xl pl-12 pr-4 py-4 text-lg focus:outline-none focus:border-primary transition-colors" 
                  />
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchableDropdown 
                    options={['Все', ...GENRES]}
                    value={activeGenre === 'Все' ? '' : activeGenre}
                    onChange={(val) => setActiveGenre(val || 'Все')}
                    placeholder="Все жанры"
                    icon={<LayoutGrid size={18} className="text-primary" />}
                    className="w-full"
                  />
                  <SearchableDropdown 
                    options={CITIES}
                    value={activeCountry}
                    onChange={setActiveCountry}
                    placeholder="Все города"
                    icon={<MapPin size={18} className="text-primary" />}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredStations.map(station => (
                  <StationCard
                    key={station.id}
                    station={station}
                    isActive={activeStation?.id === station.id}
                    isFavorite={favorites.includes(station.id)}
                    onPlay={handlePlayStation}
                    onToggleFavorite={toggleFavorite}
                    onViewStation={handleViewStation}
                    onGenreClick={handleGenreClick}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-4xl font-black tracking-tighter mb-8">Мои станции</h1>
              {favoriteStations.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                  {favoriteStations.map(station => (
                    <StationCard
                      key={station.id}
                      station={station}
                      isActive={activeStation?.id === station.id}
                      isFavorite={true}
                      onPlay={handlePlayStation}
                      onToggleFavorite={toggleFavorite}
                      onViewStation={handleViewStation}
                      onGenreClick={handleGenreClick}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <Heart size={48} className="mx-auto text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground">Вы еще не добавили ни одной станции в избранное.</p>
                </div>
              )}
            </motion.div>
          )}

          {currentView === 'station' && viewingStation && (
            <StationPage
              station={viewingStation}
              isFavorite={favorites.includes(viewingStation.id)}
              onToggleFavorite={toggleFavorite}
              onPlay={handlePlayStation}
              onBack={() => setCurrentView('home')}
              playerStatus={playerStatus}
              isActive={activeStation?.id === viewingStation.id}
              onGenreClick={handleGenreClick}
            />
          )}

          {currentView === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h1 className="text-4xl font-black tracking-tighter mb-8">Настройки</h1>
              <div className="space-y-4 max-w-2xl">
                <div className="p-6 bg-secondary/30 border border-border rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Качество звука</h3>
                    <p className="text-sm text-muted-foreground">Настройте битрейт для вашего соединения</p>
                  </div>
                  <select className="bg-background border border-border rounded-lg px-3 py-1 text-sm">
                    <option>Авто</option>
                    <option>Высокое (192kbps)</option>
                    <option>Среднее (128kbps)</option>
                    <option>Низкое (64kbps)</option>
                  </select>
                </div>
                <div className="p-6 bg-secondary/30 border border-border rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold">Темная тема</h3>
                    <p className="text-sm text-muted-foreground">Переключение темы приложения</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Overlays & Modals */}
      <CommandMenu 
        isOpen={isCommandOpen} 
        onClose={() => setIsCommandOpen(false)}
        onSelectStation={handlePlayStation}
        onSelectCity={setCity}
      />

      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Settings Modal */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-secondary/50 border border-border rounded-[32px] p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tighter">Настройки</h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 rounded-full hover:bg-background transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-background/50 rounded-2xl border border-border flex items-center justify-between">
                  <div>
                    <p className="font-bold">Качество звука</p>
                    <p className="text-xs text-muted-foreground">Высокое качество использует больше данных</p>
                  </div>
                  <select className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm font-medium">
                    <option>Авто</option>
                    <option>Высокое (192kbps)</option>
                    <option>Среднее (128kbps)</option>
                    <option>Низкое (64kbps)</option>
                  </select>
                </div>

                <div className="p-4 bg-background/50 rounded-2xl border border-border flex items-center justify-between">
                  <div>
                    <p className="font-bold">Нормализация звука</p>
                    <p className="text-xs text-muted-foreground">Одинаковая громкость для всех станций</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>

                <div className="p-4 bg-background/50 rounded-2xl border border-border flex items-center justify-between">
                  <div>
                    <p className="font-bold">Темная тема</p>
                    <p className="text-xs text-muted-foreground">Переключение между светлой и темной темой</p>
                  </div>
                  <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all"
              >
                Сохранить изменения
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {isProfileOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProfileOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-secondary/50 border border-border rounded-[32px] p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black tracking-tighter">Профиль</h2>
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 rounded-full hover:bg-background transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-primary/20 flex items-center justify-center mb-4 overflow-hidden">
                  <User size={48} className="text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Слушатель Радио</h3>
                <p className="text-muted-foreground">Премиум аккаунт</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => {
                    setCurrentView('favorites');
                    setIsProfileOpen(false);
                  }}
                  className="p-4 bg-background/50 rounded-2xl border border-border text-center hover:border-primary transition-colors group"
                >
                  <p className="text-2xl font-black text-primary group-hover:scale-110 transition-transform">{favorites.length}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Избранное</p>
                </button>
                <div className="p-4 bg-background/50 rounded-2xl border border-border text-center">
                  <p className="text-2xl font-black text-primary">124</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mt-1">Часов прослушано</p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-4 bg-background/50 border border-border rounded-2xl font-bold hover:bg-background transition-colors flex items-center justify-center gap-2">
                  <Activity size={18} />
                  История прослушиваний
                </button>
                <button className="w-full py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold hover:bg-red-500/20 transition-colors">
                  Выйти
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {isOffline && (
        <div className="fixed inset-0 z-[200] bg-background/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <WifiOff size={64} className="text-muted-foreground mb-6" />
          <h2 className="text-3xl font-black tracking-tighter mb-2">Вы оффлайн</h2>
          <p className="text-muted-foreground mb-8 max-w-md">Проверьте подключение к интернету. Вы все еще можете слушать избранные и кэшированные станции.</p>
          <button 
            onClick={() => {
              setIsOffline(false);
              addToast('Снова онлайн', 'success');
            }}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2"
          >
            <RefreshCw size={20} /> Попробовать снова
          </button>
        </div>
      )}

      {/* Persistent Player */}
      <Player 
        activeStation={activeStation} 
        isFavorite={activeStation ? favorites.includes(activeStation.id) : false}
        onToggleFavorite={toggleFavorite}
        status={playerStatus}
        onStatusChange={setPlayerStatus}
        onShareClick={() => addToast('Ссылка скопирована', 'success')}
        onPlaylistClick={() => addToast('Плейлист открыт', 'info')}
        onFullscreenClick={() => addToast('Полноэкранный режим', 'info')}
        onViewStation={handleViewStation}
      />
    </div>
  );
}
