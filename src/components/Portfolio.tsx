"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, X } from "lucide-react";

const filters = ["All", "Website", "DX & Branding", "App", "Automation", "AI"];

const projects = [
  {
    id: 1,
    title: "Quantum Finance",
    category: "Website",
    description: "A premium Web3 financial dashboard with real-time analytics.",
    color: "from-blue-500/20 to-purple-500/20",
    image: "https://themewagon.com/wp-content/uploads/2026/05/sarab.webp",
  },
  {
    id: 2,
    title: "Aura Identity",
    category: "DX & Branding",
    description: "Complete brand overhaul for a modern lifestyle company.",
    color: "from-pink-500/20 to-orange-500/20",
    image: "https://market-resized.envatousercontent.com/previews/files/296280653/preview.jpg?w=590&h=300&cf_fit=crop&crop=top&format=auto&q=85&s=e76c8181a9122831b0a2abc1e3bcc27e9f7b2e1b391328cc559ed088f3ef5164",
  },
  {
    id: 3,
    title: "Nexus AI",
    category: "AI",
    description: "Generative AI platform for seamless content creation.",
    color: "from-cyan-500/20 to-blue-500/20",
    image: "https://market-resized.envatousercontent.com/previews/files/660085031/01_bridge.png?w=590&h=300&cf_fit=crop&crop=top&format=auto&q=85&s=891ed034b06fa300532f3b18e447b46c279c1e9c4aa4b273505bb8643a1c664a",
  },
  {
    id: 4,
    title: "Sync Mobile",
    category: "App",
    description: "Cross-platform productivity app with offline first architecture.",
    color: "from-emerald-500/20 to-teal-500/20",
    image: "https://www.themezaa.com/wp-content/uploads/2020/02/best-creative-digital-agency-wordpress-themes.jpg",
  },
  {
    id: 5,
    title: "AutoFlow",
    category: "Automation",
    description: "Enterprise workflow automation reducing manual tasks by 80%.",
    color: "from-indigo-500/20 to-purple-500/20",
    image: "https://www.themezaa.com/wp-content/uploads/2020/02/agencium-best-creative-digital-agency-wordpress-themes.jpg",
  },
  {
    id: 6,
    title: "Nova E-Commerce",
    category: "Website",
    description: "High-conversion headless Shopify storefront.",
    color: "from-red-500/20 to-rose-500/20",
    image: "https://market-resized.envatousercontent.com/previews/files/456855774/02_uncode.png?w=590&h=300&cf_fit=crop&crop=top&format=auto&q=85&s=fd9820ffd933ea4652c35727dcacf168bed87bdb4408a6bec0d63aa56bf12514",
  },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [mobileRevealedCard, setMobileRevealedCard] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const filteredProjects = projects.filter(
    (project) => activeFilter === "All" || project.category === activeFilter
  );

  return (
    <section id="portfolio" className="pt-8 pb-16 md:py-32 relative bg-brand-bg-1 bg-grid border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 md:gap-8">
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
           className="flex flex-wrap justify-center md:justify-end gap-x-2 gap-y-4 md:gap-4"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 md:px-6 py-2 text-xs md:text-sm font-space font-black uppercase transition-all duration-200 border-4 border-black shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none ${
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
            {filteredProjects.map((project) => {
              const isRevealed = mobileRevealedCard === project.id;
              return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMobileRevealedCard(isRevealed ? null : project.id)}
                className="group relative border-4 border-black bg-white h-[350px] md:h-[450px] cursor-pointer shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200"
              >
                {/* Water Flow Background Effect */}
                <div className="absolute inset-0 overflow-hidden z-0 bg-brand-bg-1">
                  <div className="absolute inset-0 bg-brand-cyan opacity-20" />
                  <div className={`absolute left-1/2 -translate-x-1/2 w-[250%] pb-[250%] transition-all duration-[800ms] ease-in-out lg:group-hover:top-[-20%] ${isRevealed ? 'top-[-20%]' : 'top-[100%]'}`}>
                    <div className="absolute inset-0 rounded-[40%] bg-brand-blue/40 animate-[spin_6s_linear_infinite]" />
                    <div className="absolute inset-0 rounded-[45%] bg-brand-cyan/60 animate-[spin_7s_linear_infinite_reverse]" />
                  </div>
                  {project.image && (
                    <img src={project.image} alt={project.title} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[800ms] lg:group-hover:opacity-100 ${isRevealed ? 'opacity-100' : 'opacity-0'}`} />
                  )}
                </div>

                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end z-10">
                  <div className={`w-full bg-white/60 backdrop-blur-sm border-4 border-black p-4 md:p-6 transform transition-transform duration-300 shadow-[4px_4px_0_0_#000] md:shadow-[6px_6px_0_0_#000] lg:group-hover:translate-y-0 ${isRevealed ? 'translate-y-0' : 'translate-y-4 md:translate-y-8'}`}>
                    <span className="inline-block px-2 py-1 md:px-3 md:py-1 mb-2 md:mb-4 text-[10px] md:text-xs font-space font-black uppercase tracking-wider text-black bg-brand-yellow border-2 border-black">
                      {project.category}
                    </span>
                    <h4 className="text-xl md:text-3xl font-space font-black text-black mb-2 uppercase break-words">
                      {project.title}
                    </h4>
                    <p className="text-sm md:text-base text-black font-space font-bold mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 md:gap-4">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-space font-black uppercase text-white bg-black border-2 border-black hover:bg-brand-blue px-3 py-2 md:px-4 md:py-2.5 transition-colors"
                      >
                        Case Study <ArrowRight size={16} />
                      </button>
                      <a 
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-sm font-space font-black uppercase text-black bg-white border-2 border-black hover:bg-brand-yellow px-4 py-2.5 transition-colors"
                      >
                        Preview <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )})}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Case Study Bottom Drawer */}
      <AnimatePresence>
        {selectedProject && (
          <div data-lenis-prevent className="fixed inset-0 z-[100000] flex items-end justify-center pointer-events-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto cursor-pointer"
            />
            
            {/* Drawer */}
            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              data-lenis-prevent
              className="w-[95vw] max-w-[1400px] bg-brand-bg-1 border-t-8 border-x-8 border-black h-[90vh] overflow-y-auto pointer-events-auto relative rounded-t-3xl shadow-[0_-10px_0_0_rgba(0,0,0,0.2)] flex flex-col"
            >
              {/* Drawer Header */}
              <div className="w-full flex justify-between items-center px-8 md:px-12 py-6 border-b-8 border-black sticky top-0 bg-brand-bg-1 z-50">
                <h3 className="text-2xl md:text-4xl font-space font-black uppercase text-black">
                  Case Study
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-white border-4 border-black hover:bg-brand-red hover:text-white transition-colors shadow-[4px_4px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="w-full flex flex-col items-start px-8 md:px-12 pt-8 pb-16">
                {selectedProject.image && (
                  <div className="w-full border-8 border-black shadow-[8px_8px_0_0_#000] md:shadow-[16px_16px_0_0_#000] mb-12 overflow-hidden bg-white max-h-[60vh]">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover object-top" />
                  </div>
                )}
                
                <div className="w-full flex flex-col items-start">
                  <span className="inline-block px-4 py-2 mb-6 text-sm font-space font-black uppercase tracking-wider text-black bg-brand-yellow border-4 border-black shadow-[4px_4px_0_0_#000]">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-4xl md:text-6xl font-space font-black text-black mb-6 uppercase">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl md:text-2xl font-space font-bold text-black/80 mb-10 leading-relaxed">
                    {selectedProject.description}
                  </p>
                  
                  <div className="prose prose-lg prose-black max-w-none font-space font-medium mb-12">
                    <p className="mb-4">
                      This is a detailed case study for {selectedProject.title}. We approached this project with a brutalist yet functional design philosophy, focusing on high conversion rates and an unforgettable user experience.
                    </p>
                    <p>
                      By leveraging modern web technologies and bold aesthetics, we helped them achieve a 300% increase in user engagement and drastically improved their brand presence online.
                    </p>
                  </div>
                  
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-xl font-space font-black uppercase text-white bg-brand-blue border-4 border-black hover:bg-brand-cyan px-8 py-4 transition-all shadow-[8px_8px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none"
                  >
                    Visit Live Site <ExternalLink size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
