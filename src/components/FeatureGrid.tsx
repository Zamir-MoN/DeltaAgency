"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";

import Lottie from "lottie-react";
import sideCatAnimation from "../../public/sidecat.json";

interface Feature {
  title: string;
  detail: string;
}

export default function FeatureGrid({ features, serviceTitle }: { features: Feature[], serviceTitle: string }) {
  const [selectedFeature, setSelectedFeature] = useState<{ feature: Feature; index: number } | null>(null);
  const [sideCat, setSideCat] = useState({ show: false, position: "bottom" as "bottom" | "top" });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (selectedFeature) {
      setSideCat({ show: true, position: Math.random() > 0.5 ? "top" : "bottom" });
      
      const scheduleNext = (isShowing: boolean) => {
        if (isShowing) {
          timeoutId = setTimeout(() => {
            setSideCat(prev => ({ ...prev, show: false }));
            scheduleNext(false);
          }, 3500);
        } else {
          const delay = Math.random() * 10000 + 5000;
          timeoutId = setTimeout(() => {
            setSideCat({ show: true, position: Math.random() > 0.5 ? "top" : "bottom" });
            scheduleNext(true);
          }, delay);
        }
      };

      scheduleNext(true);
      
      return () => clearTimeout(timeoutId);
    } else {
      setSideCat({ show: false, position: "bottom" });
    }
  }, [selectedFeature]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedFeature) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedFeature]);

  const getDrawerColor = (index: number) => {
    const colors = [
      "bg-brand-cyan",
      "bg-brand-pink",
      "bg-brand-yellow",
      "bg-brand-green",
      "bg-brand-blue",
      "bg-brand-purple"
    ];
    return colors[index % colors.length];
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {features.map((feature, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedFeature({ feature, index: i })}
            className="bg-brand-bg-1 border-4 border-black p-6 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] transition-all duration-200 cursor-pointer flex flex-col h-full"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="mt-1 flex-shrink-0 bg-brand-pink text-white border-2 border-black rounded-none p-1">
                <Check size={16} strokeWidth={4} />
              </div>
              <h3 className="text-xl font-space font-bold uppercase leading-tight">
                {feature.title}
              </h3>
            </div>
            <p className="text-base text-gray-800 font-medium line-clamp-3">
              {feature.detail}
            </p>
            <div className="mt-auto pt-4 flex justify-end">
                <span className="text-sm font-space font-bold uppercase border-b-2 border-black">Read More</span>
            </div>
          </div>
        ))}
      </div>

      {isMounted && typeof document !== 'undefined' && createPortal(
        <>
          <AnimatePresence>
            {selectedFeature && (
              <motion.div
                key="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99998] pointer-events-auto"
                style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)'
                }}
                onClick={() => setSelectedFeature(null)}
                data-lenis-prevent
              />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {selectedFeature && (
              <motion.div
                key="drawer"
                initial={{ x: selectedFeature.index % 2 === 0 ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ x: selectedFeature.index % 2 === 0 ? "-100%" : "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={`fixed top-0 bottom-0 z-[99999] w-full md:w-1/2 lg:w-2/5 border-x-4 border-black p-8 md:p-12 flex flex-col pointer-events-auto overflow-y-auto overflow-x-hidden ${
                  selectedFeature.index % 2 === 0 ? "left-0 md:border-l-0" : "right-0 md:border-r-0"
                } ${getDrawerColor(selectedFeature.index)}`}
                data-lenis-prevent
              >
                <div 
                  className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-60"
                  style={{
                    backgroundImage: `url('https://img.magnific.com/free-photo/anime-style-galaxy-background_23-2151134130.jpg?semt=ais_hybrid&w=740&q=80')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-6 right-6 md:top-8 md:right-8 bg-white border-4 border-black p-2 hover:bg-brand-pink hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all z-50 cursor-pointer"
                >
                  <X size={24} strokeWidth={3} className="text-black" />
                </button>

                <div className="flex-grow flex flex-col justify-center mt-12 md:mt-0 relative z-10">
                  <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                    <Check size={32} strokeWidth={4} className="text-brand-pink" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-space font-black text-black uppercase mb-6 leading-tight">
                    {selectedFeature.feature.title}
                  </h3>
                  
                  <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] mb-8 flex flex-col">
                    <img 
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2QtwHCHQmKoYU41pKkap_bkOO2PNdyTVO0VRIrVGMtiKsOlG11o6P_W5m&s=10" 
                      alt="Feature illustration" 
                      className="w-full h-48 md:h-64 object-cover border-b-4 border-black"
                    />
                    <div className="p-6 md:p-8">
                      <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
                        {selectedFeature.feature.detail}
                      </p>
                    </div>
                  </div>

                  <Link 
                    href="/#contact"
                    onClick={() => setSelectedFeature(null)}
                    className="w-full py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-black text-white hover:shadow-[6px_6px_0_0_rgba(236,72,153,1)] hover:bg-brand-pink hover:text-black hover:-translate-y-1 hover:-translate-x-1"
                  >
                    Discuss this feature
                  </Link>
                </div>

                {sideCat.show && (
                  <div className={`absolute left-4 md:left-8 w-24 md:w-32 z-[100] pointer-events-none ${sideCat.position === 'top' ? 'top-0 rotate-180' : 'bottom-0'}`}>
                    <Lottie animationData={sideCatAnimation} loop={true} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </>
  );
}
