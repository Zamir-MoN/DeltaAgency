"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Projects Delivered", value: 150, suffix: "+" },
  { label: "Global Clients", value: 50, suffix: "+" },
  { label: "Countries Served", value: 10, suffix: "+" },
  { label: "Satisfaction Rate", value: 99, suffix: "%" },
];

function AnimatedCounter({ value, duration = 2.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

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

export default function Statistics() {
  return (
    <section className="py-24 relative bg-brand-cyan border-b-8 border-black">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="text-center bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#000]"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-space font-black text-black mb-4 flex items-center justify-center">
                <AnimatedCounter value={stat.value} />
                <span className="text-white bg-black px-2 border-4 border-black ml-2">{stat.suffix}</span>
              </div>
              <div className="text-sm md:text-base font-space font-black text-black uppercase tracking-widest border-t-4 border-black pt-4">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
