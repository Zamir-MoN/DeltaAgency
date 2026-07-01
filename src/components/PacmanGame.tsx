"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Increased tile size for a chunkier, bigger game UI
const TILE_SIZE = 40;

interface Entity {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
}

export default function PacmanGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [toffiesCollected, setToffiesCollected] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // References for game state to avoid dependency issues in requestAnimationFrame
  const mapRef = useRef<number[][]>([]);
  const pacmanRef = useRef<Entity & { nextVx: number, nextVy: number }>({
    x: 0, y: 0, vx: 0, vy: 0, nextVx: 0, nextVy: 0, speed: 4
  });
  
  const ghostsRef = useRef<(Entity & { color: string })[]>([]);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const toffiesCollectedRef = useRef(0);
  const pelletsRef = useRef(0);
  const reqRef = useRef<number>(0);
  const showLevelCompleteRef = useRef(false);
  const toffyRef = useRef<{r: number, c: number} | null>(null);
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);

  const spawnToffy = (currentMap: number[][]) => {
    const emptySpaces: {r: number, c: number}[] = [];
    for (let r = 3; r < currentMap.length - 3; r++) {
      for (let c = 3; c < currentMap[0].length - 3; c++) {
         if (currentMap[r][c] === 0 || currentMap[r][c] === 2) {
            emptySpaces.push({r, c});
         }
      }
    }
    if (emptySpaces.length > 0) {
      const spot = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
      currentMap[spot.r][spot.c] = 4; // 4 = Toffy
      toffyRef.current = spot;
    }
  };

  const initGame = (keepProgress = false) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / TILE_SIZE);
    const rows = Math.floor(canvas.height / TILE_SIZE);

    const newMap: number[][] = [];
    for (let r = 0; r < rows; r++) {
      const row = new Array(cols).fill(0); // 0 = pellet
      newMap.push(row);
    }

    // Borders are walls (1)
    for (let c = 0; c < cols; c++) {
      newMap[0][c] = 1;
      newMap[rows - 1][c] = 1;
    }
    for (let r = 0; r < rows; r++) {
      newMap[r][0] = 1;
      newMap[r][cols - 1] = 1;
    }

    // Find all .pacman-wall elements
    const walls = document.querySelectorAll('.pacman-wall');
    walls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const startC = Math.max(0, Math.floor(rect.left / TILE_SIZE));
      const endC = Math.min(cols - 1, Math.floor(rect.right / TILE_SIZE));
      const startR = Math.max(0, Math.floor(rect.top / TILE_SIZE));
      const endR = Math.min(rows - 1, Math.floor(rect.bottom / TILE_SIZE));

      for (let r = startR; r <= endR; r++) {
        for (let c = startC; c <= endC; c++) {
          newMap[r][c] = 1; // Mark as wall
        }
      }
    });

    // Generate a wider, less complex maze-like grid
    for (let r = 2; r < rows - 2; r += 5) {
      for (let c = 2; c < cols - 2; c += 5) {
        if (Math.random() < 0.6) { // 60% chance to draw a wall segment here
          const isHorizontal = Math.random() < 0.5;
          for (let i = 0; i < 3; i++) {
            const nr = isHorizontal ? r : r + i;
            const nc = isHorizontal ? c + i : c;
            
            // Ensure we don't overwrite DOM walls (1)
            if (nr < rows - 1 && nc < cols - 1 && newMap[nr][nc] === 0) {
              newMap[nr][nc] = 3; 
            }
          }
        }
      }
    }

    // Clear some space for Pacman to spawn (bottom center)
    const pacmanC = Math.floor(cols / 2);
    let pacmanR = rows - 4;
    while (pacmanR > 1 && newMap[pacmanR][pacmanC] === 1) {
      pacmanR--;
    }
    
    // Clear area around spawn
    for (let r = pacmanR - 2; r <= pacmanR + 2; r++) {
      for (let c = pacmanC - 2; c <= pacmanC + 2; c++) {
        if (r > 0 && r < rows && c > 0 && c < cols && newMap[r][c] !== 1) {
           newMap[r][c] = 2; // Empty, no pellet
        }
      }
    }

    // Base speed proportional to TILE_SIZE
    const basePacmanSpeed = Math.max(2, Math.floor(TILE_SIZE / 10));

    pacmanRef.current = {
      x: pacmanC * TILE_SIZE,
      y: pacmanR * TILE_SIZE,
      vx: 0, vy: 0, nextVx: 0, nextVy: 0, speed: basePacmanSpeed
    };

    // Find all valid spawn positions for ghosts (empty space, > 10 tiles away from Pacman)
    const validGhostSpawns: {r: number, c: number}[] = [];
    for (let r = 1; r < rows - 1; r++) {
      for (let c = 1; c < cols - 1; c++) {
        if (newMap[r][c] === 0 || newMap[r][c] === 2) {
          const distToPacman = Math.hypot(c - pacmanC, r - pacmanR);
          if (distToPacman > 10) {
            validGhostSpawns.push({r, c});
          }
        }
      }
    }
    
    // Shuffle the valid spawns randomly
    for (let i = validGhostSpawns.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [validGhostSpawns[i], validGhostSpawns[j]] = [validGhostSpawns[j], validGhostSpawns[i]];
    }

    const ghostColors = ['red', '#EC4899', '#06B6D4', '#F97316'];
    const newGhosts = [];
    
    const currentLvl = keepProgress ? levelRef.current : 1;
    // Scale ghost speed based on level
    const baseGhostSpeed = Math.max(2, Math.floor(TILE_SIZE / 12));
    const ghostSpeed = baseGhostSpeed + (currentLvl - 1) * 0.5;
    
    // Scale enemy count based on screen size
    let numGhosts = 4;
    if (window.innerWidth < 640) {
      numGhosts = 2; // Mobile: 2 ghosts
    } else if (window.innerWidth < 1024) {
      numGhosts = 3; // Tablet: 3 ghosts
    }
    const activeGhostColors = ghostColors.slice(0, numGhosts);
    
    for (let i = 0; i < activeGhostColors.length; i++) {
      const spawn = validGhostSpawns[i] || { r: 5, c: 5 };
      newGhosts.push({
        x: spawn.c * TILE_SIZE,
        y: spawn.r * TILE_SIZE,
        vx: i % 2 === 0 ? ghostSpeed : -ghostSpeed,
        vy: 0,
        speed: ghostSpeed,
        color: activeGhostColors[i]
      });
    }
    
    ghostsRef.current = newGhosts;

    spawnToffy(newMap);

    mapRef.current = newMap;
    pelletsRef.current = newMap.flat().filter(t => t === 0).length;
    
    if (!keepProgress) {
      scoreRef.current = 0;
      setScore(0);
      levelRef.current = 1;
      setLevel(1);
    }
    toffiesCollectedRef.current = 0;
    setToffiesCollected(0);
    
    setGameOver(false);
    setGameWon(false);
    showLevelCompleteRef.current = false;
    setShowLevelComplete(false);
    setIsReady(true);
  };

  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      initGame(false);
    }, 100);

    const handleResize = () => {
       initGame(true);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isReady) return;
      const p = pacmanRef.current;
      if (['ArrowUp', 'w', 'W'].includes(e.key)) { e.preventDefault(); p.nextVx = 0; p.nextVy = -p.speed; }
      if (['ArrowDown', 's', 'S'].includes(e.key)) { e.preventDefault(); p.nextVx = 0; p.nextVy = p.speed; }
      if (['ArrowLeft', 'a', 'A'].includes(e.key)) { e.preventDefault(); p.nextVx = -p.speed; p.nextVy = 0; }
      if (['ArrowRight', 'd', 'D'].includes(e.key)) { e.preventDefault(); p.nextVx = p.speed; p.nextVy = 0; }
    };

    window.addEventListener('keydown', handleKeyDown, { passive: false });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReady]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartRef.current || !isReady) return;
    const dx = e.touches[0].clientX - touchStartRef.current.x;
    const dy = e.touches[0].clientY - touchStartRef.current.y;
    const p = pacmanRef.current;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 30) {
        p.nextVx = dx > 0 ? p.speed : -p.speed;
        p.nextVy = 0;
        touchStartRef.current = null;
      }
    } else {
      if (Math.abs(dy) > 30) {
        p.nextVy = dy > 0 ? p.speed : -p.speed;
        p.nextVx = 0;
        touchStartRef.current = null;
      }
    }
  };

  useEffect(() => {
    if (!isReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const isValidMove = (x: number, y: number, vx: number, vy: number) => {
      // Allow some leniency for higher speeds to hit tile centers
      const cx = x + TILE_SIZE / 2;
      const cy = y + TILE_SIZE / 2;
      
      // If we are exactly aligned with the grid
      if (Math.abs((x % TILE_SIZE) - 0) < 1 && Math.abs((y % TILE_SIZE) - 0) < 1) {
        const c = Math.round(x / TILE_SIZE);
        const r = Math.round(y / TILE_SIZE);
        let nextC = c + Math.sign(vx);
        let nextR = r + Math.sign(vy);
        
        const map = mapRef.current;
        if (nextR < 0 || nextR >= map.length) return false;
        
        // Wrap around
        if (nextC < 0) nextC = map[0].length - 1;
        if (nextC >= map[0].length) nextC = 0;
        
        return map[nextR][nextC] !== 1 && map[nextR][nextC] !== 3; // 1 is DOM wall, 3 is static obstacle
      }
      
      return true; // if not aligned, we're currently moving within a tile
    };

    const alignToGrid = (p: Entity) => {
      if (Math.abs(p.x % TILE_SIZE) < p.speed) p.x = Math.round(p.x / TILE_SIZE) * TILE_SIZE;
      if (Math.abs(p.y % TILE_SIZE) < p.speed) p.y = Math.round(p.y / TILE_SIZE) * TILE_SIZE;
    };

    const drawMap = () => {
      const map = mapRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Transparent background!

      for (let r = 0; r < map.length; r++) {
        for (let c = 0; c < map[r].length; c++) {
          if (map[r][c] === 0) {
            ctx.fillStyle = '#FACC15'; // Yellow pellets
            ctx.beginPath();
            ctx.arc(c * TILE_SIZE + TILE_SIZE / 2, r * TILE_SIZE + TILE_SIZE / 2, Math.max(3, TILE_SIZE / 8), 0, Math.PI * 2);
            ctx.fill();
          } else if (map[r][c] === 3) {
            ctx.fillStyle = '#06B6D4'; // Brand cyan for static obstacles
            ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
          } else if (map[r][c] === 4) {
            // Draw Toffy (Candy) scaled by TILE_SIZE
            const cx = c * TILE_SIZE + TILE_SIZE / 2;
            const cy = r * TILE_SIZE + TILE_SIZE / 2;
            
            ctx.save();
            ctx.translate(cx, cy);
            
            const scale = TILE_SIZE / 40;
            ctx.scale(scale, scale);
            
            // Wrapper ends
            ctx.fillStyle = '#EC4899'; // Pink wrapper
            ctx.beginPath();
            ctx.moveTo(-10, -10);
            ctx.lineTo(-20, -16);
            ctx.lineTo(-20, 16);
            ctx.lineTo(-10, 10);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(10, -10);
            ctx.lineTo(20, -16);
            ctx.lineTo(20, 16);
            ctx.lineTo(10, 10);
            ctx.fill();
            
            // Candy center
            ctx.fillStyle = '#A855F7'; // Purple center
            ctx.beginPath();
            ctx.arc(0, 0, 12, 0, Math.PI * 2);
            ctx.fill();
            
            // Highlight
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(-4, -4, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
          }
        }
      }
    };

    const updateAndDrawPacman = () => {
      const p = pacmanRef.current;
      
      alignToGrid(p);

      if (p.x % TILE_SIZE === 0 && p.y % TILE_SIZE === 0) {
        if (isValidMove(p.x, p.y, p.nextVx, p.nextVy)) {
          p.vx = p.nextVx;
          p.vy = p.nextVy;
        }
        
        if (!isValidMove(p.x, p.y, p.vx, p.vy)) {
          p.vx = 0;
          p.vy = 0;
        }
      }

      if (
        (p.vx > 0 && p.nextVx < 0) || 
        (p.vx < 0 && p.nextVx > 0) || 
        (p.vy > 0 && p.nextVy < 0) || 
        (p.vy < 0 && p.nextVy > 0)
      ) {
        p.vx = p.nextVx;
        p.vy = p.nextVy;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -TILE_SIZE) p.x = canvas.width;
      if (p.x > canvas.width) p.x = -TILE_SIZE;

      const c = Math.floor((p.x + TILE_SIZE / 2) / TILE_SIZE);
      const r = Math.floor((p.y + TILE_SIZE / 2) / TILE_SIZE);
      if (r >= 0 && r < mapRef.current.length && c >= 0 && c < mapRef.current[0].length) {
        if (mapRef.current[r][c] === 0) {
          mapRef.current[r][c] = 2; 
          scoreRef.current += 10;
          setScore(scoreRef.current);
        } else if (mapRef.current[r][c] === 4) {
          // Collected a Toffy!
          mapRef.current[r][c] = 2;
          scoreRef.current += 500;
          setScore(scoreRef.current);
          
          toffiesCollectedRef.current += 1;
          setToffiesCollected(toffiesCollectedRef.current);
          
          if (toffiesCollectedRef.current >= levelRef.current) {
            // Level complete!
            showLevelCompleteRef.current = true;
            setShowLevelComplete(true);
          } else {
            // Spawn next toffy
            spawnToffy(mapRef.current);
          }
        }
      }

      ctx.save();
      ctx.translate(p.x + TILE_SIZE / 2, p.y + TILE_SIZE / 2);
      if (p.vx > 0) ctx.rotate(0);
      else if (p.vx < 0) ctx.rotate(Math.PI);
      else if (p.vy > 0) ctx.rotate(Math.PI / 2);
      else if (p.vy < 0) ctx.rotate(-Math.PI / 2);

      const mouthAngle = 0.2 + 0.2 * Math.sin(time * 15);
      
      ctx.fillStyle = '#FACC15';
      ctx.beginPath();
      const pacRadius = Math.max(8, TILE_SIZE / 2 - 2);
      ctx.arc(0, 0, pacRadius, mouthAngle * Math.PI, (2 - mouthAngle) * Math.PI);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();

      // Draw pointer arrow to the Toffy
      if (toffyRef.current) {
        const tx = toffyRef.current.c * TILE_SIZE + TILE_SIZE / 2;
        const ty = toffyRef.current.r * TILE_SIZE + TILE_SIZE / 2;
        const px = p.x + TILE_SIZE / 2;
        const py = p.y + TILE_SIZE / 2;
        
        const dist = Math.hypot(tx - px, ty - py);
        
        // Only draw if the Toffy is far away
        if (dist > TILE_SIZE * 4) {
          const angle = Math.atan2(ty - py, tx - px);
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(angle);
          
          const orbitRadius = TILE_SIZE; // Distance from pacman
          
          ctx.fillStyle = '#EC4899'; // Pink arrow
          ctx.beginPath();
          ctx.moveTo(orbitRadius + 12, 0); // Tip of arrow
          ctx.lineTo(orbitRadius, -8);
          ctx.lineTo(orbitRadius, 8);
          ctx.fill();
          
          ctx.restore();
        }
      }
    };

    const updateAndDrawGhosts = () => {
      const p = pacmanRef.current;
      ghostsRef.current.forEach(g => {
        alignToGrid(g);

        if (g.x % TILE_SIZE === 0 && g.y % TILE_SIZE === 0) {
          const possibleDirs = [
            { vx: g.speed, vy: 0 },
            { vx: -g.speed, vy: 0 },
            { vx: 0, vy: g.speed },
            { vx: 0, vy: -g.speed },
          ].filter(d => isValidMove(g.x, g.y, d.vx, d.vy));

          const nonReverse = possibleDirs.filter(d => d.vx !== -g.vx || d.vy !== -g.vy);
          const validChoices = nonReverse.length > 0 ? nonReverse : possibleDirs;
          
          const distToPacman = Math.hypot(p.x - g.x, p.y - g.y);
          if (distToPacman < TILE_SIZE * 15) { // Chase if within 15 tiles
            validChoices.sort((a, b) => {
               const distA = Math.hypot(p.x - (g.x + a.vx * 10), p.y - (g.y + a.vy * 10));
               const distB = Math.hypot(p.x - (g.x + b.vx * 10), p.y - (g.y + b.vy * 10));
               return distA - distB;
            });
            if (validChoices.length > 0) {
              g.vx = validChoices[0].vx;
              g.vy = validChoices[0].vy;
            } else {
              g.vx = 0; g.vy = 0;
            }
          } else {
            if (validChoices.length > 0) {
              const dir = validChoices[Math.floor(Math.random() * validChoices.length)];
              g.vx = dir.vx;
              g.vy = dir.vy;
            } else {
              g.vx = 0;
              g.vy = 0;
            }
          }
        }

        g.x += g.vx;
        g.y += g.vy;

        if (g.x < -TILE_SIZE) g.x = canvas.width;
        if (g.x > canvas.width) g.x = -TILE_SIZE;

        ctx.fillStyle = g.color;
        ctx.beginPath();
        const h = Math.max(8, TILE_SIZE / 2 - 2); 
        ctx.arc(g.x + TILE_SIZE/2, g.y + TILE_SIZE/2, h, Math.PI, 0);
        ctx.lineTo(g.x + TILE_SIZE/2 + h, g.y + TILE_SIZE/2 + h);
        
        ctx.lineTo(g.x + TILE_SIZE/2 + h/2, g.y + TILE_SIZE/2 + h - (TILE_SIZE/6));
        ctx.lineTo(g.x + TILE_SIZE/2, g.y + TILE_SIZE/2 + h);
        ctx.lineTo(g.x + TILE_SIZE/2 - h/2, g.y + TILE_SIZE/2 + h - (TILE_SIZE/6));
        ctx.lineTo(g.x + TILE_SIZE/2 - h, g.y + TILE_SIZE/2 + h);
        ctx.fill();

        const dist = Math.hypot(p.x - g.x, p.y - g.y);
        if (dist < TILE_SIZE - 4) {
          setGameOver(true);
        }
      });
    };

    const loop = (timestamp: number) => {
      time = timestamp / 1000;
      
      drawMap();
      
      if (!gameOver && !gameWon && !showLevelCompleteRef.current) {
        updateAndDrawPacman();
        updateAndDrawGhosts();
      } else {
        const pacRadius = Math.max(8, TILE_SIZE / 2 - 2);
        ctx.fillStyle = '#FACC15';
        ctx.beginPath();
        ctx.arc(pacmanRef.current.x + TILE_SIZE / 2, pacmanRef.current.y + TILE_SIZE / 2, pacRadius, 0.2 * Math.PI, 1.8 * Math.PI);
        ctx.lineTo(pacmanRef.current.x + TILE_SIZE / 2, pacmanRef.current.y + TILE_SIZE / 2);
        ctx.fill();
        
        ghostsRef.current.forEach(g => {
            ctx.fillStyle = g.color;
            ctx.beginPath();
            ctx.arc(g.x + TILE_SIZE/2, g.y + TILE_SIZE/2, pacRadius, 0, Math.PI * 2);
            ctx.fill();
        });
      }

      if (!gameOver && !gameWon) {
        reqRef.current = requestAnimationFrame(loop);
      }
    };

    reqRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqRef.current);
  }, [gameOver, gameWon, isReady]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] touch-none pointer-events-auto"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Upgraded Premium HUD */}
      <div className="absolute top-0 left-0 w-full pt-24 px-6 pb-24 flex justify-between items-start pointer-events-none z-10 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        <div className="flex gap-4 md:gap-8 items-center bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col">
            <span className="text-white/50 text-xs font-mono font-bold uppercase tracking-widest mb-1">Level</span>
            <span className="text-white font-space font-black text-2xl md:text-3xl leading-none">{level}</span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-brand-cyan/70 text-xs font-mono font-bold uppercase tracking-widest mb-1">Toffy</span>
            <span className="text-brand-cyan font-space font-black text-2xl md:text-3xl leading-none">{toffiesCollected} <span className="text-brand-cyan/50 text-lg">/ {level}</span></span>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="flex flex-col">
            <span className="text-brand-yellow/70 text-xs font-mono font-bold uppercase tracking-widest mb-1">Score</span>
            <span className="text-brand-yellow font-space font-black text-2xl md:text-3xl leading-none">{score}</span>
          </div>
        </div>
      </div>

      <canvas 
        ref={canvasRef}
        className="block w-full h-full"
      />

      {(gameOver || gameWon) && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-20 pointer-events-auto">
          <motion.h2 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-6xl md:text-8xl font-space font-black uppercase mb-4 tracking-tighter drop-shadow-[0_0_30px_rgba(236,72,153,0.5)] ${gameWon ? 'text-brand-cyan' : 'text-brand-pink'}`}
          >
            {gameWon ? 'You Win!' : 'Game Over'}
          </motion.h2>
          <p className="text-white/70 font-mono text-xl mb-2 tracking-widest uppercase">Final Score</p>
          <p className="text-brand-yellow font-space font-black text-5xl mb-12">{score}</p>
          
          <button 
            onClick={() => initGame(false)}
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-brand-yellow text-black border-4 border-black font-mono font-bold text-xl hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0_rgba(250,204,21,0.5)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0_rgba(0,0,0,1)] transition-all uppercase rounded-lg"
          >
            Play Again
          </button>
        </div>
      )}

      {showLevelComplete && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-50 pointer-events-auto">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-space font-black uppercase mb-4 text-brand-cyan drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]"
          >
            Level {level} Complete!
          </motion.h2>
          <p className="text-white/70 font-mono text-xl mb-12 uppercase tracking-widest">Things are about to get faster.</p>
          <button 
            onClick={() => {
               levelRef.current += 1;
               setLevel(levelRef.current);
               initGame(true);
            }}
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-brand-cyan text-black border-4 border-black font-mono font-bold text-xl hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0_rgba(6,182,212,0.5)] active:translate-y-1 active:translate-x-1 active:shadow-[0px_0px_0_rgba(0,0,0,1)] transition-all uppercase rounded-lg"
          >
            START LEVEL {level + 1}
          </button>
        </div>
      )}
      
      <div className="absolute bottom-12 w-full text-white/30 font-space font-bold text-center px-4 md:hidden pointer-events-none tracking-widest uppercase">
        Swipe to move
      </div>
    </motion.div>
  );
}
