"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";

interface Feature {
  title: string;
  detail: string;
}

export default function FeatureGrid({ features, serviceTitle }: { features: Feature[], serviceTitle: string }) {
  const [selectedFeature, setSelectedFeature] = useState<{ feature: Feature; index: number } | null>(null);

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

      <AnimatePresence>
        {selectedFeature && (
          <div className="fixed inset-0 z-[99999] flex pointer-events-none" data-lenis-prevent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setSelectedFeature(null)}
            />
            
            <motion.div
              initial={{ x: selectedFeature.index % 2 === 0 ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: selectedFeature.index % 2 === 0 ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute top-0 bottom-0 w-full md:w-1/2 lg:w-2/5 border-x-4 border-black p-8 md:p-12 flex flex-col pointer-events-auto overflow-y-auto ${
                selectedFeature.index % 2 === 0 ? "left-0 md:border-l-0" : "right-0 md:border-r-0"
              } ${getDrawerColor(selectedFeature.index)}`}
            >
              <button 
                onClick={() => setSelectedFeature(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 bg-white border-4 border-black p-2 hover:bg-brand-pink hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all z-10"
              >
                <X size={24} strokeWidth={3} className="text-black" />
              </button>

              <div className="flex-grow flex flex-col justify-center mt-12 md:mt-0">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                  <Check size={32} strokeWidth={4} className="text-brand-pink" />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-space font-black text-black uppercase mb-6 leading-tight">
                  {selectedFeature.feature.title}
                </h3>
                
                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0_0_#000] mb-8">
                  <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
                    {selectedFeature.feature.detail}
                  </p>
                </div>

                <Link 
                  href="/#contact"
                  onClick={() => setSelectedFeature(null)}
                  className="w-full py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-black text-white hover:shadow-[6px_6px_0_0_rgba(236,72,153,1)] hover:bg-brand-pink hover:text-black hover:-translate-y-1 hover:-translate-x-1"
                >
                  Discuss this feature
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
