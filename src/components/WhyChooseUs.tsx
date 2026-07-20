"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Diamond, Search, MonitorSmartphone, ShieldCheck, Layers, X } from "lucide-react";

import Lottie from "lottie-react";
import catAnimation from "../../public/cat-animation.json";
import sideCatAnimation from "../../public/sidecat.json";
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
  const [sideCat, setSideCat] = useState({ show: false, position: "bottom" as "bottom" | "top" });

  useEffect(() => {
    const sideCatTitles = ["Fast Delivery", "Responsive", "SEO Optimized", "Modern Technologies"];
    let timeoutId: NodeJS.Timeout;

    if (selectedReason && sideCatTitles.includes(selectedReason.reason.title)) {
      // Show instantly on first open
      setSideCat({ show: true, position: Math.random() > 0.5 ? "top" : "bottom" });
      
      const scheduleNext = (isShowing: boolean) => {
        if (isShowing) {
          // Hide after 3.5 seconds (the animation length)
          timeoutId = setTimeout(() => {
            setSideCat(prev => ({ ...prev, show: false }));
            scheduleNext(false);
          }, 3500);
        } else {
          // Wait a random time (5 to 15 seconds) before showing again
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
  }, [selectedReason]);

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
    <section className="py-32 relative bg-brand-yellow bg-grid border-b-8 border-black overflow-hidden">
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
              className="absolute inset-0 pointer-events-auto"
              onClick={() => setSelectedReason(null)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            </motion.div>
            
            <motion.div
              initial={getSlideProps(selectedReason.index).initial}
              animate={getSlideProps(selectedReason.index).animate}
              exit={getSlideProps(selectedReason.index).exit}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`absolute border-black flex flex-col pointer-events-auto shadow-[0_0_0_0_#000] ${getDrawerClasses(selectedReason.index)} ${getDrawerColor(selectedReason.index)}`}
            >
              <div 
                className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-60"
                style={{
                  backgroundImage: `url('https://img.magnific.com/free-photo/anime-style-galaxy-background_23-2151134130.jpg?semt=ais_hybrid&w=740&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {(selectedReason.reason.title === "Premium Design" || selectedReason.reason.title === "Secure") && (
                <div className="absolute top-0 right-8 md:right-12 -translate-y-[35%] w-48 h-48 md:w-64 md:h-64 z-50 pointer-events-none">
                  <Lottie animationData={catAnimation} loop={true} />
                </div>
              )}

              {["Fast Delivery", "Responsive", "SEO Optimized", "Modern Technologies"].includes(selectedReason.reason.title) && sideCat.show && (
                <div className={`absolute left-4 md:left-8 w-24 md:w-32 z-[100] pointer-events-none ${sideCat.position === 'top' ? 'top-0 rotate-180' : 'bottom-0'}`}>
                  <Lottie animationData={sideCatAnimation} loop={true} />
                </div>
              )}

              <div className="flex-grow flex flex-col overflow-y-auto overflow-x-hidden p-8 md:p-12 relative z-10">
                <button 
                onClick={() => setSelectedReason(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 bg-white border-4 border-black p-2 hover:bg-brand-pink hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all z-50 cursor-pointer"
              >
                <X size={24} strokeWidth={3} className="text-black" />
              </button>

              <div className="flex-grow flex flex-col justify-center mt-32 md:mt-16 relative z-10">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                  <selectedReason.reason.icon size={32} strokeWidth={3} className="text-black" />
                </div>
                
                <h3 className="text-3xl md:text-5xl font-space font-black text-black uppercase mb-6 leading-tight">
                  {selectedReason.reason.title}
                </h3>
                
                <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] mb-8 flex flex-col">
                  <img 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2QtwHCHQmKoYU41pKkap_bkOO2PNdyTVO0VRIrVGMtiKsOlG11o6P_W5m&s=10" 
                    alt="Section illustration" 
                    className="w-full h-48 md:h-64 object-cover border-b-4 border-black"
                  />
                  <div className="p-6 md:p-8">
                    <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
                      {selectedReason.reason.description}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedReason(null)}
                  className="w-full py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-black text-white hover:shadow-[6px_6px_0_0_rgba(250,204,21,1)] hover:bg-brand-yellow hover:text-black hover:-translate-y-1 hover:-translate-x-1"
                >
                  Close Details
                </button>
              </div>
            </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
