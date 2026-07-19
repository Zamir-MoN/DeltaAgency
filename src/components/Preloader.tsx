"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while loading
    if (typeof window !== "undefined") {
      document.body.style.overflow = "hidden";
      
      const timer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = "";
      }, 2000); // 2 seconds before it triggers the exit

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white bg-grid pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.3 }}
        >
          <div className="flex items-center text-[120px] md:text-[180px] lg:text-[240px] font-logo tracking-tighter cursor-default select-none">
            <motion.span
              initial={{ y: 0, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "-100vh", opacity: 1 }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.8, ease: "easeOut" },
                y: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
              }}
              className="text-black inline-block drop-shadow-[8px_8px_0_rgba(236,72,153,1)]"
            >
              D
            </motion.span>
            <motion.span
              initial={{ y: 0, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: "100vh", opacity: 1 }}
              transition={{
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.8, ease: "easeOut" },
                y: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
              }}
              className="text-brand-cyan inline-block drop-shadow-[8px_8px_0_rgba(250,204,21,1)] ml-2"
            >
              X
            </motion.span>
          </div>
          
          <motion.div 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.4 }}
            className="mt-8 font-space font-black text-2xl uppercase tracking-[0.3em] text-black bg-brand-yellow px-4 py-2 border-4 border-black shadow-[4px_4px_0_0_#000]"
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
