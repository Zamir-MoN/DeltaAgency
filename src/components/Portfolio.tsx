"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";

const filters = ["All", "Website", "Branding", "App", "Automation", "AI"];

const projects = [
  {
    id: 1,
    title: "Quantum Finance",
    category: "Website",
    description: "A premium Web3 financial dashboard with real-time analytics.",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "Aura Identity",
    category: "Branding",
    description: "Complete brand overhaul for a modern lifestyle company.",
    color: "from-pink-500/20 to-orange-500/20",
  },
  {
    id: 3,
    title: "Nexus AI",
    category: "AI",
    description: "Generative AI platform for seamless content creation.",
    color: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 4,
    title: "Sync Mobile",
    category: "App",
    description: "Cross-platform productivity app with offline first architecture.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 5,
    title: "AutoFlow",
    category: "Automation",
    description: "Enterprise workflow automation reducing manual tasks by 80%.",
    color: "from-indigo-500/20 to-purple-500/20",
  },
  {
    id: 6,
    title: "Nova E-Commerce",
    category: "Website",
    description: "High-conversion headless Shopify storefront.",
    color: "from-red-500/20 to-rose-500/20",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <section id="portfolio" className="py-32 relative bg-brand-bg-1 border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl bg-white border-4 border-black p-6 shadow-[6px_6px_0_0_#000]">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-cyan inline-block px-3 py-1 border-2 border-black"
            >
              Selected Work
            </motion.h2>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-space font-black text-black uppercase"
            >
              Featured <span className="bg-brand-pink text-white px-2 border-4 border-black inline-block transform -rotate-2">Projects</span>
            </motion.h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 text-sm font-space font-black uppercase transition-all duration-200 border-4 border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none ${
                  activeFilter === filter
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-brand-yellow"
                }`}
              >
                {filter}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative border-4 border-black bg-white h-[450px] cursor-pointer shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
              >
                {/* Brutalist Pattern Background */}
                <div className={`absolute inset-0 bg-brand-cyan opacity-20`} />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-50" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className="bg-white border-4 border-black p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 shadow-[6px_6px_0_0_#000]">
                    <span className="inline-block px-3 py-1 mb-4 text-xs font-space font-black uppercase tracking-wider text-black bg-brand-yellow border-2 border-black">
                      {project.category}
                    </span>
                    <h4 className="text-3xl font-space font-black text-black mb-2 uppercase">
                      {project.title}
                    </h4>
                    <p className="text-black font-space font-bold mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <button className="flex items-center gap-2 text-sm font-space font-black uppercase text-white bg-black border-2 border-black hover:bg-brand-blue px-4 py-2.5 transition-colors">
                        Case Study <ArrowRight size={16} />
                      </button>
                      <button className="flex items-center gap-2 text-sm font-space font-black uppercase text-black bg-white border-2 border-black hover:bg-brand-yellow px-4 py-2.5 transition-colors">
                        Preview <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
