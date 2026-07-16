"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
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
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 15, restDelta: 0.001 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

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
            className="text-4xl sm:text-5xl md:text-6xl font-space font-black text-black uppercase mb-6"
          >
            Our Proven <span className="bg-brand-blue text-white px-2 border-4 border-black inline-block transform rotate-1">Process</span>
          </motion.h3>
        </div>

        <div className="max-w-2xl mx-auto pb-24 px-4 mt-8">
          <div ref={timelineRef} className="relative">
            {/* Brutalist Line Background */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-6 border-x-4 border-black bg-white z-0" />
            
            {/* Animated Line */}
            <motion.div 
              className="absolute left-1/2 -translate-x-1/2 top-0 w-6 border-x-4 border-black bg-brand-yellow origin-top z-0"
              style={{ height: lineHeight }}
            />

            <div className="space-y-16 md:space-y-24 relative z-10">
              {steps.map((step, index) => {
              return (
                <div key={step.title} className="flex flex-col items-center justify-center w-full relative">
                  
                  {/* Center Node */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20, delay: 0 } }}
                    viewport={{ once: false, margin: "0px 0px -20% 0px" }}
                    className="w-16 h-16 rounded-none bg-brand-yellow border-4 border-black shadow-[4px_4px_0_0_#000] flex flex-shrink-0 items-center justify-center z-20 mb-8"
                  >
                    <div className="text-black">
                      <step.icon size={24} strokeWidth={3} />
                    </div>
                  </motion.div>

                  {/* Centered Content */}
                  <div className="w-full px-2 md:px-0">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15, delay: 0.1 } }}
                      viewport={{ once: false, margin: "0px 0px -20% 0px" }}
                      className="brutal-card p-6 md:p-8 bg-white w-full max-w-lg mx-auto text-center z-20 relative"
                    >
                      <h4 className="text-2xl font-space font-black uppercase text-black mb-3">{step.title}</h4>
                      <p className="text-black font-space font-bold leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
