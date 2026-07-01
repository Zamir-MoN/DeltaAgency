"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(onComplete, 1200); // Wait for exit animation
          }, 500);
          return 100;
        }
        // Random progress increment for a more organic feel
        return prev + Math.floor(Math.random() * 15) + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-brand-bg-1 text-brand-text-primary overflow-hidden"
        >
          {/* Background subtle noise/glow could go here */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-blue/10 via-brand-bg-1 to-brand-bg-1 opacity-50 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-space font-bold tracking-tighter mb-8"
            >
              DELTA <span className="text-brand-blue">X</span>
            </motion.div>

            <div className="w-64 h-1 bg-brand-border rounded-full overflow-hidden mb-4 relative">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-purple"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear", duration: 0.2 }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm font-inter text-brand-text-secondary tracking-widest"
            >
              {Math.min(progress, 100)}%
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
