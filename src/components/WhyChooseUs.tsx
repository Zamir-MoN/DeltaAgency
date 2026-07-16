"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Diamond, Search, MonitorSmartphone, ShieldCheck, Layers, X } from "lucide-react";

const reasons = [
  {
    icon: Zap,
    title: "Fast Delivery",
    description: "We optimize our workflows to deliver high-quality projects on time, every time, without compromising on excellence.",
  },
  {
    icon: Diamond,
    title: "Premium Design",
    description: "Our design language is rooted in modern aesthetics, ensuring your brand stands out with a luxurious and futuristic feel.",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built from the ground up with search engines in mind, ensuring your digital presence is discoverable and ranks high.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive",
    description: "Flawless experiences across all devices. We ensure your application looks and functions perfectly everywhere.",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Implementing industry-standard security practices to protect your data and provide peace of mind for your users.",
  },
  {
    icon: Layers,
    title: "Modern Technologies",
    description: "Leveraging the latest in web tech like Next.js, React, and Three.js for robust, scalable, and future-proof solutions.",
  },
];

export default function WhyChooseUs() {
  const [selectedReason, setSelectedReason] = useState<{ reason: typeof reasons[0], index: number } | null>(null);

  useEffect(() => {
    if (selectedReason) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedReason]);

  // Determine slide animation properties based on column
  const getSlideProps = (index: number) => {
    const col = index % 3;
    if (col === 0) return { initial: { x: "-100%", y: 0 }, animate: { x: 0, y: 0 }, exit: { x: "-100%", y: 0 } }; // Left
    if (col === 1) return { initial: { y: "100%", x: "-50%" }, animate: { y: 0, x: "-50%" }, exit: { y: "100%", x: "-50%" } }; // Middle
    return { initial: { x: "100%", y: 0 }, animate: { x: 0, y: 0 }, exit: { x: "100%", y: 0 } }; // Right
  };

  const getDrawerClasses = (index: number) => {
    const col = index % 3;
    if (col === 0) return "top-0 bottom-0 left-0 w-full md:w-1/2 lg:w-2/5 border-r-4 border-l-0"; // Left
    if (col === 1) return "bottom-0 left-1/2 w-full md:w-2/3 lg:w-1/2 h-[80vh] border-t-4 border-x-4"; // Middle (Bottom sheet)
    return "top-0 bottom-0 right-0 w-full md:w-1/2 lg:w-2/5 border-l-4 border-r-0"; // Right
  };

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
    <section className="py-32 relative bg-brand-yellow border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-cyan inline-block px-4 py-1 border-2 border-black"
          >
            Why Choose Delta X
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-space font-black text-black uppercase mb-6"
          >
            Built for <span className="bg-brand-pink text-white px-2 border-4 border-black inline-block transform rotate-2">Excellence</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {reasons.map((reason, idx) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => setSelectedReason({ reason, index: idx })}
              className="brutal-card p-8 bg-white flex flex-col cursor-pointer h-full"
            >
              <div className="w-16 h-16 bg-brand-pink border-4 border-black flex items-center justify-center mb-6 text-black shadow-[4px_4px_0_0_#000]">
                <reason.icon size={32} />
              </div>
              <h4 className="text-2xl font-space font-black uppercase text-black mb-3">{reason.title}</h4>
              <p className="text-black font-space font-bold leading-relaxed mb-6">{reason.description}</p>
              
              <div className="mt-auto pt-4 flex justify-end">
                <span className="text-sm font-space font-bold uppercase border-b-2 border-black">Details</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedReason && (
          <div className="fixed inset-0 z-[99999] flex pointer-events-none" data-lenis-prevent>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
              onClick={() => setSelectedReason(null)}
            />
            
            <motion.div
              initial={getSlideProps(selectedReason.index).initial}
              animate={getSlideProps(selectedReason.index).animate}
              exit={getSlideProps(selectedReason.index).exit}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute border-black p-8 md:p-12 flex flex-col pointer-events-auto overflow-y-auto shadow-[0_0_0_0_#000] ${getDrawerClasses(selectedReason.index)} ${getDrawerColor(selectedReason.index)}`}
            >
              <button 
                onClick={() => setSelectedReason(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 bg-white border-4 border-black p-2 hover:bg-brand-pink hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all z-10"
              >
                <X size={24} strokeWidth={3} className="text-black" />
              </button>

              <div className="flex-grow flex flex-col justify-center mt-12 md:mt-0">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                  <selectedReason.reason.icon size={32} strokeWidth={3} className="text-black" />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-space font-black text-black uppercase mb-6 leading-tight">
                  {selectedReason.reason.title}
                </h3>
                
                <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0_0_#000] mb-8">
                  <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
                    {selectedReason.reason.description}
                  </p>
                </div>

                <button 
                  onClick={() => setSelectedReason(null)}
                  className="w-full py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-black text-white hover:shadow-[6px_6px_0_0_rgba(250,204,21,1)] hover:bg-brand-yellow hover:text-black hover:-translate-y-1 hover:-translate-x-1"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
