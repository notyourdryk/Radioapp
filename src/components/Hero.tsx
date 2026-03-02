import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Info, Radio, ChevronLeft, ChevronRight } from 'lucide-react';
import { Station } from '../constants';

interface HeroProps {
  stations: Station[];
  onPlay: (station: Station) => void;
  onGenreClick?: (genre: string) => void;
}

export default function Hero({ stations, onPlay, onGenreClick }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stations.length);
  }, [stations.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stations.length) % stations.length);
  }, [stations.length]);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentStation = stations[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto aspect-[21/9] min-h-[300px] rounded-3xl overflow-hidden border border-border group bg-background">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img
            src={currentStation.logo}
            alt={currentStation.name}
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest rounded-full border border-primary/30 flex items-center gap-2">
                <Radio size={14} />
                В эфире
              </div>
            </motion.div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl sm:text-6xl font-black tracking-tighter mb-4"
                >
                  {currentStation.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-muted-foreground mb-8 line-clamp-2"
                >
                  Лучшая музыка в жанре <button onClick={() => onGenreClick?.(currentStation.genre)} className="text-primary hover:underline">{currentStation.genre}</button>. 
                  Сейчас играет: <span className="text-foreground font-medium">{currentStation.nowPlaying?.artist} — {currentStation.nowPlaying?.title}</span>
                </motion.p>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-3 sm:gap-4"
                >
                  <button
                    onClick={() => onPlay(currentStation)}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-primary-foreground rounded-2xl font-bold flex items-center gap-2 sm:gap-3 hover:scale-105 active:scale-95 transition-transform shadow-xl shadow-primary/20 text-sm sm:text-base"
                  >
                    <Play fill="currentColor" size={18} className="sm:w-5 sm:h-5" />
                    Слушать
                  </button>
                  <button className="px-6 py-3 sm:px-8 sm:py-4 bg-secondary text-foreground rounded-2xl font-bold flex items-center gap-2 sm:gap-3 hover:bg-muted transition-colors border border-border text-sm sm:text-base">
                    <Info size={18} className="sm:w-5 sm:h-5" />
                    О станции
                  </button>
                </motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 3 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="hidden lg:block w-48 h-48 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl transition-transform duration-500 hover:rotate-0"
              >
                <img 
                  src={currentStation.logo} 
                  alt={currentStation.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between items-center pointer-events-none z-10">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all pointer-events-auto hover:scale-110 active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-md transition-all pointer-events-auto hover:scale-110 active:scale-90"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {stations.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
