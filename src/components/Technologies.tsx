"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const technologies = [
  "React", "Next.js", "Node.js", "MongoDB", "Firebase", 
  "Docker", "AWS", "Vercel", "Cloudflare", "Framer Motion", "GSAP"
];

export default function Technologies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);

  // Divide into 3 columns for parallax
  const col1 = technologies.slice(0, 4);
  const col2 = technologies.slice(4, 8);
  const col3 = technologies.slice(8, 11);

  return (
    <section ref={containerRef} className="py-32 relative bg-white border-b-8 border-black overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-pink inline-block px-3 py-1 border-2 border-black"
          >
            Tech Stack
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-space font-black text-black mb-6 leading-tight uppercase"
          >
            Powered by <br />
            <span className="bg-brand-cyan text-white px-2 border-4 border-black inline-block transform rotate-1">Modern Tech</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl font-space font-bold text-black leading-relaxed max-w-lg bg-brand-yellow p-4 border-4 border-black shadow-[6px_6px_0_0_#000]"
          >
            We leverage industry-leading technologies to build scalable, secure, and blazing fast digital experiences.
          </motion.p>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center items-center gap-2 sm:gap-4 md:gap-6 h-[400px] overflow-hidden mask-image-vertical">
          
          <motion.div style={{ y: y1 }} className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-6 pt-10">
            {col1.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </motion.div>

          <motion.div style={{ y: y2 }} className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-6">
            {col2.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </motion.div>

          <motion.div style={{ y: y3 }} className="flex-1 flex flex-col gap-2 sm:gap-4 md:gap-6 pt-20">
            {col3.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </motion.div>

        </div>
      </div>
      
      {/* Inline styles for mask-image since Tailwind doesn't have it built-in cleanly for arbitrary values */}
      <style jsx>{`
        .mask-image-vertical {
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <div className="brutal-card px-2 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 bg-white flex items-center justify-center text-center">
      <span className="text-black font-space font-black uppercase tracking-wide text-[10px] sm:text-xs md:text-base leading-tight">{name}</span>
    </div>
  );
}

