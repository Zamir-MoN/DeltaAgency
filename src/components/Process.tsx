"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, Code, Beaker, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Research & Strategy",
    description: "We dive deep into your industry, competitors, and target audience to formulate a winning digital strategy.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    description: "Our designers craft intuitive, stunning interfaces that align perfectly with your brand identity and goals.",
  },
  {
    icon: Code,
    title: "Development",
    description: "We build robust, scalable, and high-performance solutions using cutting-edge technologies and best practices.",
  },
  {
    icon: Beaker,
    title: "Testing & QA",
    description: "Rigorous testing across devices and browsers to ensure a flawless, bug-free user experience.",
  },
  {
    icon: Rocket,
    title: "Launch & Scale",
    description: "We deploy your project securely and provide ongoing support to help your digital presence scale.",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={containerRef} className="py-32 relative bg-brand-pink border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-24 bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-yellow inline-block px-4 py-1 border-2 border-black"
          >
            How We Work
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-space font-black text-black uppercase mb-6"
          >
            Our Proven <span className="bg-brand-blue text-white px-2 border-4 border-black inline-block transform rotate-1">Process</span>
          </motion.h3>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Brutalist Line Background */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-2 border-l-4 border-r-4 border-black bg-white md:-translate-x-1/2" />
          
          {/* Animated Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-2 border-l-4 border-r-4 border-black bg-brand-yellow md:-translate-x-1/2 origin-top z-0"
            style={{ height: lineHeight }}
          />

          <div className="space-y-12 md:space-y-24 relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={step.title} className="flex flex-col md:flex-row items-center justify-between w-full relative">
                  
                  {/* Left Content (or empty for odd) */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-12' : 'order-3 pl-12 text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="brutal-card p-6 bg-white"
                    >
                      <h4 className="text-2xl font-space font-black uppercase text-black mb-3">{step.title}</h4>
                      <p className="text-black font-space font-bold leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Center Node */}
                  <div className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-none bg-brand-yellow border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center z-10 ${!isEven && 'md:order-2'}`}>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="text-black"
                    >
                      <step.icon size={24} />
                    </motion.div>
                  </div>

                  {/* Mobile Content */}
                  <div className="md:hidden w-full pl-24 pr-4">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="brutal-card p-6 bg-white"
                    >
                      <h4 className="text-2xl font-space font-black uppercase text-black mb-3">{step.title}</h4>
                      <p className="text-black font-space font-bold leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Empty div for flex spacing on desktop */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-3' : 'order-1'}`} />

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
