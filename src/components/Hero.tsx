"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ClipboardEdit } from "lucide-react";
import FloatingTechElements from "./FloatingTechElements";
import DrawingBoard from "./DrawingBoard";
import { useGameMode } from "@/context/GameModeContext";

const PixelGridOverlay = ({ activeColor }: { activeColor: string }) => {
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    // Support drawing by hovering or dragging (mouse or touch)
    if (e.buttons > 0 || e.pointerType === 'touch' || e.pointerType === 'mouse') {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (target && target.classList.contains('pixel-cell')) {
        target.style.backgroundColor = activeColor;
      }
    }
  };

  return (
    <div 
      className="absolute inset-0 z-50 touch-none" 
      style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, 8px)', 
        gridAutoRows: '8px' 
      }}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerMove}
    >
      {Array.from({ length: 1500 }).map((_, i) => (
        <div
          key={i}
          className="pixel-cell w-full h-full"
        />
      ))}
    </div>
  );
};

export type CustomDrawing = { src: string; size: number };

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomedLetter, setZoomedLetter] = useState<string | null>(null);
  const [isDrawingBoardOpen, setIsDrawingBoardOpen] = useState(false);
  const [customDrawings, setCustomDrawings] = useState<CustomDrawing[]>([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const { isGameMode } = useGameMode();
  
  const { scrollY } = useScroll();
  const dY = useTransform(scrollY, [0, 1000], [0, -300]);
  const xY = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  const handleSaveDrawing = (dataUrl: string, size: number) => {
    setCustomDrawings(prev => [...prev, { src: dataUrl, size }]);
    setIsDrawingBoardOpen(false);
  };

  const handleGameOver = () => {
    setScore(0);
    setIsGameOver(true);
    setTimeout(() => {
      setIsGameOver(false);
    }, 2000); // Hide after 2 seconds
  };

  return (
    <section ref={containerRef} className={`relative min-h-screen flex items-center justify-center pt-20 ${isGameMode ? 'bg-black' : "bg-brand-bg-1 bg-[url('/grid.svg')]"} border-b-8 border-black overflow-hidden`}>
      
      <FloatingTechElements 
        customDrawings={customDrawings} 
        onScore={() => setScore(s => s + 10)} 
        onGameOver={handleGameOver}
      />

      {/* Score Display */}
      <AnimatePresence>
        {score > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-24 right-8 z-[60] bg-brand-yellow border-4 border-black p-3 shadow-[6px_6px_0_rgba(0,0,0,1)] flex items-center justify-center pointer-events-none"
          >
            <span className="font-mono font-bold text-xl uppercase tracking-widest">
              SCORE: {score}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Over Display */}
      <AnimatePresence>
        {isGameOver && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
          >
            <div className="bg-brand-pink border-8 border-black p-8 shadow-[16px_16px_0_rgba(0,0,0,1)] text-center">
              <h2 className="text-6xl font-logo uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
                GAME OVER
              </h2>
              <p className="mt-4 font-mono font-bold text-2xl">Score Reset!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Clipboard Button */}
      {!isGameMode && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          onClick={() => setIsDrawingBoardOpen(true)}
          className="fixed bottom-8 right-8 z-[60] bg-brand-yellow border-4 border-black p-4 shadow-[6px_6px_0_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0_rgba(0,0,0,1)] transition-all flex flex-col items-center justify-center gap-2 group"
        >
          <ClipboardEdit size={32} className="group-hover:rotate-12 transition-transform" />
          <span className="font-mono font-bold text-xs">DRAW</span>
        </motion.button>
      )}

      {/* Drawing Board Modal */}
      <AnimatePresence>
        {isDrawingBoardOpen && (
          <DrawingBoard 
            onClose={() => setIsDrawingBoardOpen(false)} 
            onSave={handleSaveDrawing} 
          />
        )}
      </AnimatePresence>

      {/* Zoom Backdrop Overlay */}
      <AnimatePresence>
        {zoomedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] cursor-zoom-out"
            onClick={() => setZoomedLetter(null)}
          />
        )}
      </AnimatePresence>
      
      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="container relative z-10 mx-auto px-6 md:px-12 flex flex-col items-center text-center pointer-events-none"
      >
        <div className="flex items-center justify-center text-[120px] md:text-[180px] lg:text-[240px] font-logo tracking-tighter leading-none select-none mb-12">
          
          {/* Letter D */}
          <motion.div
            initial={{ y: "-100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 3, ease: [0.25, 1, 0.5, 1], delay: 1.5 }}
            className="relative pointer-events-auto"
            style={{ zIndex: zoomedLetter === "D" ? 100 : 1, y: dY }}
          >
            <motion.div 
              animate={{ scale: zoomedLetter === "D" ? 2.5 : 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="inline-block relative [image-rendering:pixelated]"
            >
              <div 
                className={`${zoomedLetter === "D" ? "cursor-crosshair" : "cursor-zoom-in"} relative inline-block pacman-wall`} 
                onClick={() => { if (zoomedLetter !== "D") setZoomedLetter("D") }}
              >
                <span 
                  style={zoomedLetter === "D" ? { 
                    WebkitFontSmoothing: "none",
                    backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(#000, #000)",
                    backgroundSize: "8px 8px, 8px 8px, 100% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent"
                  } : {
                    WebkitFontSmoothing: "none",
                    color: isGameMode ? "#FACC15" : "#000",
                    textShadow: isGameMode 
                      ? "1px 1px 0 #06B6D4, 2px 2px 0 #06B6D4, 3px 3px 0 #06B6D4, 4px 4px 0 #06B6D4, 5px 5px 0 #06B6D4, 6px 6px 0 #06B6D4, 7px 7px 0 #06B6D4, 8px 8px 0 #06B6D4"
                      : "1px 1px 0 #EC4899, 2px 2px 0 #EC4899, 3px 3px 0 #EC4899, 4px 4px 0 #EC4899, 5px 5px 0 #EC4899, 6px 6px 0 #EC4899, 7px 7px 0 #EC4899, 8px 8px 0 #EC4899"
                  }}
                >
                  D
                </span>
                {zoomedLetter === "D" && <PixelGridOverlay activeColor="#EC4899" />}
              </div>
            </motion.div>
          </motion.div>

          {/* Letter X */}
          <motion.div
            initial={{ y: "100vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 3, ease: [0.25, 1, 0.5, 1], delay: 1.5 }}
            className="ml-2 relative pointer-events-auto"
            style={{ zIndex: zoomedLetter === "X" ? 100 : 1, y: xY }}
          >
            <motion.div 
              animate={{ scale: zoomedLetter === "X" ? 2.5 : 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="inline-block relative [image-rendering:pixelated]"
            >
              <div 
                className={`${zoomedLetter === "X" ? "cursor-crosshair" : "cursor-zoom-in"} relative inline-block pacman-wall`} 
                onClick={() => { if (zoomedLetter !== "X") setZoomedLetter("X") }}
              >
                <span 
                  style={zoomedLetter === "X" ? { 
                    WebkitFontSmoothing: "none",
                    backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.15) 1px, transparent 1px), linear-gradient(#06B6D4, #06B6D4)",
                    backgroundSize: "8px 8px, 8px 8px, 100% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent"
                  } : {
                    WebkitFontSmoothing: "none",
                    color: isGameMode ? "#06B6D4" : "#06B6D4",
                    textShadow: isGameMode
                      ? "1px 1px 0 #EC4899, 2px 2px 0 #EC4899, 3px 3px 0 #EC4899, 4px 4px 0 #EC4899, 5px 5px 0 #EC4899, 6px 6px 0 #EC4899, 7px 7px 0 #EC4899, 8px 8px 0 #EC4899"
                      : "1px 1px 0 #FACC15, 2px 2px 0 #FACC15, 3px 3px 0 #FACC15, 4px 4px 0 #FACC15, 5px 5px 0 #FACC15, 6px 6px 0 #FACC15, 7px 7px 0 #FACC15, 8px 8px 0 #FACC15"
                  }}
                >
                  X
                </span>
                {zoomedLetter === "X" && <PixelGridOverlay activeColor="#FACC15" />}
              </div>
            </motion.div>
          </motion.div>
          
        </div>

        {!isGameMode && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="max-w-2xl mt-12 pointer-events-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#contact" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-brand-yellow text-black border-4 border-black font-mono font-bold text-lg hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0_rgba(0,0,0,1)] transition-all pacman-wall"
              >
                START A PROJECT
              </Link>
              <Link 
                href="/#portfolio" 
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black border-4 border-black font-mono font-bold text-lg hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0_rgba(0,0,0,1)] transition-all pacman-wall"
              >
                VIEW PORTFOLIO
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>

    </section>
  );
}
