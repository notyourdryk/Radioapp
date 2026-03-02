import { useState, useRef, useEffect, ReactNode } from 'react';
import { ChevronDown, Search } from 'lucide-react';

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  icon?: ReactNode;
  className?: string;
}

export default function SearchableDropdown({ options, value, onChange, placeholder, icon, className = '' }: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt => opt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-secondary/50 border border-border rounded-xl hover:border-primary transition-colors text-sm font-medium"
      >
        <div className="flex items-center gap-2 truncate">
          {icon}
          <span className="truncate">{value || placeholder}</span>
        </div>
        <ChevronDown size={16} className={`text-muted-foreground shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-xl shadow-xl z-50 overflow-hidden min-w-[200px]">
          <div className="p-2 border-b border-border flex items-center gap-2">
            <Search size={16} className="text-muted-foreground ml-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Поиск..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent border-none focus:outline-none text-sm py-1"
            />
          </div>
          <div className="max-h-60 overflow-y-auto no-scrollbar p-1">
            <button
              onClick={() => {
                onChange('');
                setIsOpen(false);
                setSearch('');
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!value ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-secondary'}`}
            >
              Все
            </button>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${value === opt ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-secondary'}`}
                >
                  {opt}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center text-sm text-muted-foreground">Ничего не найдено</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
