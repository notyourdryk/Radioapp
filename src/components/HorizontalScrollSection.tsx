import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HorizontalScrollSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  rows?: 1 | 2;
  action?: React.ReactNode;
}

export default function HorizontalScrollSection({ title, icon, children, rows = 1, action }: HorizontalScrollSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            {icon}
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {action}
          <div className="hidden sm:flex items-center gap-2">
            <button 
              onClick={() => scroll('left')}
              className="p-2 rounded-xl bg-secondary/50 border border-border hover:border-primary hover:text-primary transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-2 rounded-xl bg-secondary/50 border border-border hover:border-primary hover:text-primary transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className={`
          no-scrollbar overflow-x-auto scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0
          ${rows === 2 ? 'grid grid-rows-2 grid-flow-col gap-4' : 'flex gap-4'}
        `}
        style={rows === 2 ? { gridAutoColumns: 'max-content' } : {}}
      >
        {children}
      </div>
    </section>
  );
}
