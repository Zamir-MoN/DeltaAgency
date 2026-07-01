"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, PenTool, Fingerprint, Bot, Smartphone, Cloud, TrendingUp, Server } from "lucide-react";

const services = [
  { icon: Monitor, title: "Website Development", desc: "High-performance, accessible, and SEO-optimized web experiences." },
  { icon: PenTool, title: "UI/UX Design", desc: "Intuitive interfaces and engaging user experiences." },
  { icon: Fingerprint, title: "Brand Identity", desc: "Memorable brand assets and cohesive visual systems." },
  { icon: Bot, title: "AI Automation", desc: "Intelligent workflows that scale your business operations." },
  { icon: Smartphone, title: "App Development", desc: "Native and cross-platform mobile applications." },
  { icon: Cloud, title: "Cloud Solutions", desc: "Scalable infrastructure and cloud-native architecture." },
  { icon: TrendingUp, title: "Marketing", desc: "Data-driven strategies for digital growth." },
  { icon: Server, title: "Hosting", desc: "Secure, reliable, and lightning-fast hosting solutions." }
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 10 degrees)
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
    >
      <div
        className="brutal-card p-8 h-full flex flex-col bg-white border-4 border-black"
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
          <span className="bg-black text-white px-3 py-1">Learn more</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerRef = useRef(null);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.title} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
