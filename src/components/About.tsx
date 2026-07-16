"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const stats = [
  { label: "Years Experience", value: 10, suffix: "+" },
  { label: "Projects Completed", value: 150, suffix: "+" },
  { label: "Global Clients", value: 50, suffix: "+" },
  { label: "Countries Served", value: 10, suffix: "+" },
];

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * value));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };

      animationFrame = requestAnimationFrame(updateCount);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, value, duration]);

  return <span ref={nodeRef}>{count}</span>;
}

export default function About() {
  const containerRef = useRef(null);

  return (
    <section id="about" ref={containerRef} className="py-32 relative bg-brand-cyan bg-grid border-b-8 border-black overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Introduction */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-white border-2 border-black px-3 py-1 inline-block shadow-[4px_4px_0_0_#000]">About Delta X</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-space font-black text-black leading-tight mb-6 uppercase">
              We engineer the <span className="bg-brand-pink text-white px-2 border-4 border-black inline-block transform rotate-2">Future</span> of digital.
            </h3>
            <p className="text-lg md:text-xl font-space font-bold text-black leading-relaxed mb-8 bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              At Delta X, we don't just build websites; we craft immersive digital experiences that elevate brands. By merging cutting-edge technologies like AI and web graphics with premium aesthetics, we deliver solutions that are both stunning and highly functional.
            </p>
            <p className="text-lg md:text-xl font-space font-bold text-black leading-relaxed mb-10">
              Our multidisciplinary team of designers, engineers, and strategists work collaboratively to transform complex challenges into elegant, intuitive products that drive growth and conversions for modern businesses.
            </p>
            
            <Link 
              href="/about" 
              className="inline-block px-8 py-4 bg-black text-white font-space font-black uppercase text-lg border-4 border-black hover:bg-brand-pink hover:text-black hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] transition-all duration-200"
            >
              More Details
            </Link>
          </motion.div>

          {/* Right: Statistics */}
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className="brutal-card p-8 bg-white flex flex-col justify-center items-center text-center"
              >
                <div className="text-4xl md:text-6xl font-space font-black text-black mb-2 flex items-center">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-brand-blue">{stat.suffix}</span>
                </div>
                <div className="text-sm md:text-base font-space font-bold text-black uppercase tracking-wider border-t-4 border-black pt-4 mt-4 w-full">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
