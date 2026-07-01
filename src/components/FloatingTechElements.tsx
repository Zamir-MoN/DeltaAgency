"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Database, Network, Binary, Terminal, Braces, Server, Wifi, Globe, Smartphone, Monitor, Hexagon } from "lucide-react";
import { useEffect, useState } from "react";

import { CustomDrawing } from "./Hero";

const icons = [Code, Cpu, Database, Network, Binary, Terminal, Braces, Server, Wifi, Globe, Smartphone, Monitor, Hexagon];
const colors = ['#EC4899', '#06B6D4', '#FACC15', '#22C55E', '#A855F7'];

interface FloatingTechElementsProps {
  customDrawings?: CustomDrawing[];
  onScore?: () => void;
  onGameOver?: () => void;
}

export default function FloatingTechElements({ customDrawings = [], onScore, onGameOver }: FloatingTechElementsProps) {
  const [mounted, setMounted] = useState(false);
  const [elements, setElements] = useState<any[]>([]);
  const [processedDrawings, setProcessedDrawings] = useState(0);
  const [poppedElements, setPoppedElements] = useState<Set<string>>(new Set());

  // Initialize base elements once
  useEffect(() => {
    setMounted(true);
    const baseElements = Array.from({ length: 25 }).map((_, i) => {
      const Icon = icons[i % icons.length];
      return {
        id: `icon-${i}`,
        Icon,
        size: Math.random() * 30 + 30,
        left: Math.random() * 95,
        duration: Math.random() * 25 + 25,
        delay: Math.random() * -50,
        color: colors[Math.floor(Math.random() * colors.length)],
        xMovement: Math.random() * 150 - 75,
        type: 'icon',
        src: null,
        isGlowing: false
      };
    });
    setElements(baseElements);
  }, []);

  // Process new custom drawings without resetting existing elements
  useEffect(() => {
    if (customDrawings.length > processedDrawings) {
      const newElements: any[] = [];
      for (let i = processedDrawings; i < customDrawings.length; i++) {
        const drawing = customDrawings[i];
        for (let j = 0; j < 8; j++) {
          newElements.push({
            id: `custom-${i}-${j}`,
            Icon: icons[0],
            size: drawing.size,
            left: Math.random() * 95,
            duration: Math.random() * 20 + 20,
            delay: Math.random() * -50,
            color: 'transparent',
            xMovement: Math.random() * 200 - 100,
            type: 'image',
            src: drawing.src,
            isGlowing: Math.random() > 0.7
          });
        }
      }
      setElements(prev => [...prev, ...newElements]);
      setProcessedDrawings(customDrawings.length);
    }
  }, [customDrawings, processedDrawings]);

  const handleClick = (id: string, isGlowing: boolean) => {
    if (isGlowing) {
      if (onScore) onScore();
      setPoppedElements(prev => new Set(prev).add(id));
    } else {
      if (onGameOver) onGameOver();
    }
  };

  if (!mounted) return null;

  const visibleElements = elements.filter(el => !poppedElements.has(el.id));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ pointerEvents: 'auto' }}>
      {visibleElements.map((el) => {
        return (
          <motion.div
            key={el.id}
            initial={{ y: el.type === 'image' ? "100vh" : "110vh", rotate: 0, scale: 1 }}
            animate={{ 
              y: "-20vh", 
              rotate: 360,
              x: [0, el.xMovement, 0]
            }}
            transition={{ 
              y: { duration: el.duration, repeat: Infinity, ease: "linear", delay: el.delay },
              rotate: { duration: el.duration * 1.2, repeat: Infinity, ease: "linear", delay: el.delay },
              x: { duration: el.duration / 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "mirror", delay: el.delay }
            }}
            className={`absolute ${el.type === 'image' ? 'opacity-100 cursor-crosshair' : 'opacity-40 pointer-events-none'} flex items-center justify-center`}
            style={{ 
              left: `${el.left}%`, 
              color: el.color,
              filter: el.isGlowing 
                // A solid 3px yellow outline using 4 directional drop-shadows, followed by the black shadow
                ? `drop-shadow(3px 0px 0px rgba(250,204,21,1)) drop-shadow(-3px 0px 0px rgba(250,204,21,1)) drop-shadow(0px 3px 0px rgba(250,204,21,1)) drop-shadow(0px -3px 0px rgba(250,204,21,1)) drop-shadow(6px 6px 0 rgba(0,0,0,1))` 
                : `drop-shadow(4px 4px 0 rgba(0,0,0,1))`
            }}
            onClick={() => el.type === 'image' && handleClick(el.id, el.isGlowing!)}
            whileHover={el.type === 'image' ? { scale: 1.2, filter: el.isGlowing ? 'drop-shadow(4px 0px 0px rgba(250,204,21,1)) drop-shadow(-4px 0px 0px rgba(250,204,21,1)) drop-shadow(0px 4px 0px rgba(250,204,21,1)) drop-shadow(0px -4px 0px rgba(250,204,21,1)) drop-shadow(8px 8px 0 rgba(0,0,0,1))' : 'drop-shadow(8px 8px 0 rgba(250,204,21,1))' } : {}}
            whileTap={el.type === 'image' && el.isGlowing ? { scale: 0 } : {}}
          >
            {el.type === 'image' ? (
              <img src={el.src!} alt="Custom Pixel Drawing" draggable="false" style={{ width: el.size, height: 'auto', maxHeight: el.size, objectFit: 'contain', imageRendering: 'pixelated', pointerEvents: 'auto' }} />
            ) : (
              <el.Icon size={el.size} strokeWidth={3} />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
