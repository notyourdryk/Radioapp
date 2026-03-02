import { Search, MapPin, Settings, User, Bell, Car, LayoutGrid, Home, Menu, Heart } from 'lucide-react';
import SearchableDropdown from './SearchableDropdown';
import { CITIES } from '../constants';

interface HeaderProps {
  city: string;
  onCityChange: (city: string) => void;
  onSearchClick: () => void;
  onViewChange: (view: any) => void;
  currentView: string;
  onCarModeClick: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
}

export default function Header({ 
  city, 
  onCityChange, 
  onSearchClick, 
  onViewChange, 
  currentView, 
  onCarModeClick,
  onSettingsClick,
  onProfileClick
}: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'catalog', label: 'Catalog', icon: <LayoutGrid size={18} /> },
    { id: 'favorites', label: 'Favorites', icon: <Heart size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <button 
          onClick={() => onViewChange('home')}
          className="flex items-center gap-2 shrink-0 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-bold text-white italic">
            R
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            Radioplayer<span className="text-primary">.ru</span>
          </span>
        </button>

        {/* Search Trigger */}
        <button 
          onClick={onSearchClick}
          className="flex-1 max-w-sm relative group hidden md:block mx-auto"
        >
          <div className="flex items-center gap-3 px-4 py-2 bg-secondary/50 border border-border rounded-xl text-muted-foreground hover:border-primary transition-all text-sm">
            <Search size={18} />
            <span>Поиск станций...</span>
            <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-background text-[10px] font-mono">
              <span>⌘</span>K
            </div>
          </div>
        </button>

        {/* Mobile Search Icon */}
        <button 
          onClick={onSearchClick}
          className="md:hidden p-2 rounded-xl bg-secondary/50 border border-border text-muted-foreground"
        >
          <Search size={20} />
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-32 sm:w-48">
            <SearchableDropdown 
              options={CITIES}
              value={city}
              onChange={(val) => onCityChange(val || 'Москва')}
              placeholder="Город"
              icon={<MapPin size={18} className="text-primary shrink-0" />}
            />
          </div>
          
          <div className="h-6 w-px bg-border hidden sm:block" />
          
          <div className="flex items-center gap-1">
            <button
              onClick={onCarModeClick}
              className="p-2 rounded-xl bg-secondary/50 border border-border text-muted-foreground hover:text-primary transition-colors"
              title="В машину"
            >
              <Car size={20} />
            </button>
            <button 
              onClick={onSettingsClick}
              className="p-2 rounded-xl hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
              title="Настройки"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={onProfileClick}
              className="ml-1 w-9 h-9 rounded-full bg-secondary border border-border flex items-center justify-center overflow-hidden hover:border-primary transition-colors"
              title="Профиль"
            >
              <User size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
