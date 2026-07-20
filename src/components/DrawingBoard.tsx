"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

interface DrawingBoardProps {
  onClose: () => void;
  onSave: (dataUrl: string, size: number) => void;
}

const COLORS = [
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#FACC15", // Yellow
  "#22C55E", // Green
  "#A855F7", // Purple
  "#000000", // Black
  "#FFFFFF", // White
];

const GRID_SIZE = 16;
const PIXEL_SIZE = 20;

export default function DrawingBoard({ onClose, onSave }: DrawingBoardProps) {
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [pixels, setPixels] = useState<string[]>(Array(GRID_SIZE * GRID_SIZE).fill(""));
  const [spawnSize, setSpawnSize] = useState(60);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0 || e.pointerType === 'touch') {
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (target && target.dataset.index) {
        const index = parseInt(target.dataset.index, 10);
        updatePixel(index);
      }
    }
  };

  const updatePixel = (index: number) => {
    setPixels(prev => {
      const next = [...prev];
      next[index] = activeColor;
      return next;
    });
  };

  const clearBoard = () => {
    setPixels(Array(GRID_SIZE * GRID_SIZE).fill(""));
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw pixels
    let minX = GRID_SIZE * PIXEL_SIZE;
    let minY = GRID_SIZE * PIXEL_SIZE;
    let maxX = 0;
    let maxY = 0;
    let hasPixels = false;

    pixels.forEach((color, i) => {
      if (color) {
        hasPixels = true;
        const x = (i % GRID_SIZE) * PIXEL_SIZE;
        const y = Math.floor(i / GRID_SIZE) * PIXEL_SIZE;
        
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x + PIXEL_SIZE);
        maxY = Math.max(maxY, y + PIXEL_SIZE);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
        
        // Add a slight dark border to simulate brutalist pixel art style
        ctx.strokeStyle = "rgba(0,0,0,0.8)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
      }
    });

    if (!hasPixels) return;

    // Crop to bounding box
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = maxX - minX;
    croppedCanvas.height = maxY - minY;
    const croppedCtx = croppedCanvas.getContext("2d");
    if (croppedCtx) {
      croppedCtx.drawImage(canvas, minX, minY, croppedCanvas.width, croppedCanvas.height, 0, 0, croppedCanvas.width, croppedCanvas.height);
      const dataUrl = croppedCanvas.toDataURL("image/png");
      onSave(dataUrl, spawnSize);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </motion.div>

      {/* Modal */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative bg-white border-4 border-black p-6 flex flex-col items-center gap-6 shadow-[8px_8px_0_rgba(0,0,0,1)] max-w-lg w-full"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-200 border-2 border-transparent hover:border-black transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold font-logo uppercase tracking-tighter">Pixel Lab</h2>
          <p className="text-sm font-mono text-gray-600">Draw a custom tech element to float on the page!</p>
        </div>

        {/* Color Palette */}
        <div className="flex gap-2 flex-wrap justify-center">
          {COLORS.map(color => (
            <button
              key={color}
              className={`w-8 h-8 border-2 ${activeColor === color ? 'border-black scale-110 shadow-[2px_2px_0_rgba(0,0,0,1)]' : 'border-gray-300'} transition-all`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
            />
          ))}
          <button 
            onClick={() => setActiveColor("")}
            className={`w-8 h-8 border-2 bg-gray-100 flex items-center justify-center text-xs font-mono font-bold ${activeColor === "" ? 'border-black scale-110 shadow-[2px_2px_0_rgba(0,0,0,1)]' : 'border-gray-300'} transition-all`}
          >
            ER
          </button>
        </div>

        {/* Drawing Grid */}
        <div 
          className="bg-gray-100 border-2 border-black touch-none cursor-crosshair"
          style={{ 
            display: 'grid', 
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, ${PIXEL_SIZE}px)`,
            width: GRID_SIZE * PIXEL_SIZE,
            height: GRID_SIZE * PIXEL_SIZE
          }}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
        >
          {pixels.map((color, i) => (
            <div
              key={i}
              data-index={i}
              className="w-full h-full border-r border-b border-black/5"
              style={{ backgroundColor: color || 'transparent' }}
              onPointerDown={() => updatePixel(i)}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="w-full flex flex-col gap-3 p-4 bg-gray-50 border-2 border-black font-mono">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold">Size: {spawnSize}px</label>
            <input 
              type="range" 
              min="20" 
              max="150" 
              value={spawnSize} 
              onChange={(e) => setSpawnSize(parseInt(e.target.value))}
              className="w-full max-w-[200px] accent-black"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button 
            onClick={clearBoard}
            className="flex-1 py-3 bg-white border-2 border-black font-mono font-bold hover:bg-gray-100 transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-[0px_0px_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1"
          >
            CLEAR
          </button>
          <button 
            onClick={saveDrawing}
            className="flex-1 py-3 bg-brand-cyan text-black border-2 border-black font-mono font-bold hover:bg-[#05a3be] transition-colors shadow-[4px_4px_0_rgba(0,0,0,1)] active:shadow-[0px_0px_0_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-2"
          >
            <Check size={18} /> FLOAT IT!
          </button>
        </div>

        {/* Hidden canvas for exporting to image */}
        <canvas 
          ref={canvasRef} 
          width={GRID_SIZE * PIXEL_SIZE} 
          height={GRID_SIZE * PIXEL_SIZE} 
          className="hidden"
        />
      </motion.div>
    </div>
  );
}
