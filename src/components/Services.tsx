"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "../data/services";
import { useRouter } from "next/navigation";
import PixelSnow from "./PixelSnow";

function ServiceCard({ service, index, onClick }: { service: typeof services[0]; index: number; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className="h-full flex"
    >
      <div
        className="brutal-card w-full p-8 flex flex-col bg-white border-4 border-black group cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#000]"
        onClick={onClick}
      >
        <div className="w-16 h-16 bg-brand-yellow border-4 border-black flex items-center justify-center mb-6 text-black shadow-[4px_4px_0_0_#000]">
          <service.icon size={32} />
        </div>
        
        <h4 className="text-2xl font-space font-black text-black uppercase mb-4">
          {service.title}
        </h4>
        
        <p className="text-black font-space font-bold leading-relaxed flex-grow">
          {service.desc}
        </p>
        
        <div className="mt-8 flex items-center text-sm font-space font-black text-black uppercase">
          <span className="bg-black text-white px-4 py-2 border-2 border-black group-hover:bg-brand-pink group-hover:text-black group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[4px_4px_0_0_#000] transition-all duration-200">
            Details
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef(null);
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedService]);

  return (
    <section id="services" ref={containerRef} className="py-32 relative bg-brand-bg-1 border-b-8 border-black overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-yellow inline-block px-4 py-1 border-2 border-black"
          >
            Our Expertise
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-space font-black text-black uppercase mb-6 break-words"
          >
            Comprehensive Digital <span className="bg-brand-blue text-white px-2 border-4 border-black inline-block transform -rotate-1">Solutions</span>
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl font-space font-bold text-black"
          >
            We provide end-to-end services tailored for modern brands. From striking designs to powerful automation, we deliver excellence at every step.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-fr">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} onClick={() => setSelectedService(service)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (() => {
          const selectedIndex = services.findIndex(s => s.slug === selectedService.slug);
          
          const getColor = (index: number, offset = 0) => {
            const colors = [
              "bg-brand-cyan",
              "bg-brand-pink",
              "bg-brand-yellow",
              "bg-brand-green",
              "bg-brand-blue",
              "bg-brand-purple"
            ];
            return colors[(index + offset) % colors.length];
          };

          const getHexColor = (index: number) => {
            const hexes = [
              "#06B6D4", // brand-cyan
              "#EC4899", // brand-pink
              "#FACC15", // brand-yellow
              "#22C55E", // brand-green
              "#3B82F6", // brand-blue
              "#A855F7"  // brand-purple
            ];
            return hexes[index % hexes.length];
          };

          return (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none" data-lenis-prevent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto overflow-hidden"
                onClick={() => setSelectedService(null)}
              >
                <div className="absolute inset-0 opacity-50">
                  <PixelSnow 
                    color={getHexColor(selectedIndex)} 
                    flakeSize={0.015} 
                    density={0.1} 
                    speed={1.5} 
                  />
                </div>
              </motion.div>
              
              <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row pointer-events-auto h-auto max-h-[90vh] overflow-y-auto overflow-x-hidden md:overflow-visible">
                
                <motion.div
                  initial={{ x: "-100vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100vw", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className={`w-full md:w-2/5 border-4 border-black border-b-0 md:border-b-4 md:border-r-0 p-8 md:p-12 flex flex-col justify-center items-center text-center ${getColor(selectedIndex, 0)}`}
                >
                  <div className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center mb-8 shadow-[4px_4px_0_0_#000]">
                    <selectedService.icon size={48} className="text-black" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-space font-black text-black uppercase mb-4">
                    {selectedService.title}
                  </h3>
                </motion.div>

                <motion.div
                  initial={{ x: "100vw", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "100vw", opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200, delay: 0.1 }}
                  className="w-full md:w-3/5 bg-white border-4 border-black p-8 md:p-12 flex flex-col shadow-[8px_8px_0_0_#000] relative"
                >
                  <button 
                    onClick={() => setSelectedService(null)}
                    className={`absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 border-4 border-black flex items-center justify-center hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[4px_4px_0_0_#000] transition-all z-50 cursor-pointer text-black font-black text-xl ${getColor(selectedIndex, 1)}`}
                  >
                    X
                  </button>
                  
                  <h4 className={`text-xl md:text-2xl font-space font-black text-black uppercase mb-6 inline-block px-3 py-1 border-2 border-black w-fit mt-8 md:mt-0 ${getColor(selectedIndex, 2)}`}>
                    Service Details
                  </h4>
                  
                  <p className="text-black font-space font-bold text-lg mb-8 leading-relaxed">
                    {selectedService.desc}
                  </p>
                  
                  <div className="space-y-4 mb-10 flex-grow">
                    {selectedService.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`mt-1 flex-shrink-0 text-black border-2 border-black rounded-none p-0.5 shadow-[2px_2px_0_0_#000] ${getColor(selectedIndex, 0)}`}>
                          <Check size={16} strokeWidth={4} />
                        </div>
                        <span className="text-base font-space font-bold text-black leading-relaxed">
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>
                
                <button
                  onClick={() => {
                    setSelectedService(null);
                    setTimeout(() => {
                      router.push(`/services/${selectedService.slug}`);
                    }, 500);
                  }}
                  className="w-full py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-black text-white hover:shadow-[6px_6px_0_0_rgba(236,72,153,1)] hover:bg-brand-pink hover:text-black hover:-translate-y-1 hover:-translate-x-1"
                >
                  Get Started
                </button>
              </motion.div>
            </div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
