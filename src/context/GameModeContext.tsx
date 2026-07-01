"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PacmanGame from "@/components/PacmanGame";

interface GameModeContextType {
  isGameMode: boolean;
  toggleGameMode: () => void;
}

const GameModeContext = createContext<GameModeContextType | undefined>(undefined);

export function GameModeProvider({ children }: { children: React.ReactNode }) {
  const [isGameMode, setIsGameMode] = useState(false);

  const toggleGameMode = () => {
    setIsGameMode((prev) => !prev);
  };

  useEffect(() => {
    if (isGameMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isGameMode]);

  return (
    <GameModeContext.Provider value={{ isGameMode, toggleGameMode }}>
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
      <AnimatePresence>
        {isGameMode && <PacmanGame onClose={toggleGameMode} />}
      </AnimatePresence>
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  const context = useContext(GameModeContext);
  if (context === undefined) {
    throw new Error("useGameMode must be used within a GameModeProvider");
  }
  return context;
}
