"use client";

import { motion } from "framer-motion";
import { Zap, Diamond, Search, MonitorSmartphone, ShieldCheck, Layers } from "lucide-react";

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
              className="brutal-card p-8 bg-white flex flex-col"
            >
              <div className="w-16 h-16 bg-brand-pink border-4 border-black flex items-center justify-center mb-6 text-black shadow-[4px_4px_0_0_#000]">
                <reason.icon size={32} />
              </div>
              <h4 className="text-2xl font-space font-black uppercase text-black mb-3">{reason.title}</h4>
              <p className="text-black font-space font-bold leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
