"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Clock, Shield, Cpu, TrendingUp, PenTool } from "lucide-react";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Project timelines vary depending on the scope and complexity. A typical standard website takes 4-6 weeks, while complex web applications or enterprise solutions can take 3-6 months. We prioritize quality while adhering strictly to agreed-upon deadlines.",
    icon: Clock,
    color: "bg-brand-cyan",
    textColor: "text-black"
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Yes, absolutely. All our premium packages include a period of complimentary post-launch support. We also offer ongoing maintenance and retainer packages to ensure your digital products remain secure, up-to-date, and performant.",
    icon: Shield,
    color: "bg-brand-yellow",
    textColor: "text-black"
  },
  {
    question: "How do you integrate AI into my business?",
    answer: "We start with a thorough analysis of your workflows. Then, we implement bespoke AI solutions—ranging from intelligent chatbots and automated data processing to predictive analytics—designed specifically to reduce overhead and increase your operational efficiency.",
    icon: Cpu,
    color: "bg-brand-blue",
    textColor: "text-white"
  },
  {
    question: "Will my website be SEO optimized?",
    answer: "SEO is built into our core process. We ensure technical SEO best practices, optimal site speed, structured data (Schema markup), and semantic HTML, giving you the best possible foundation to rank highly on search engines.",
    icon: TrendingUp,
    color: "bg-brand-purple",
    textColor: "text-white"
  },
  {
    question: "Can you redesign an existing application?",
    answer: "Yes. We frequently work with clients to audit their existing digital products, identifying UX friction points and technical debt, before executing a comprehensive redesign that modernizes both the frontend aesthetic and backend architecture.",
    icon: PenTool,
    color: "bg-brand-green",
    textColor: "text-black"
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-32 relative bg-brand-pink border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-16">
        
        {/* Left Side dynamic card */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-32">
            <AnimatePresence mode="wait">
              {hoveredIndex !== null ? (
                <motion.div
                  key={`hover-card-${hoveredIndex}`}
                  initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                  transition={{ duration: 0.2 }}
                  className={`${faqs[hoveredIndex].color} border-4 border-black p-10 shadow-[8px_8px_0_0_#000] flex flex-col items-center justify-center text-center min-h-[400px]`}
                >
                  <div className={`p-6 border-4 border-black bg-white shadow-[4px_4px_0_0_#000] mb-8 transform -rotate-3`}>
                    {(() => {
                      const Icon = faqs[hoveredIndex].icon;
                      return <Icon size={80} strokeWidth={2} className="text-black" />;
                    })()}
                  </div>
                  <h3 className={`text-3xl font-space font-black uppercase ${faqs[hoveredIndex].textColor}`}>
                    {faqs[hoveredIndex].question}
                  </h3>
                </motion.div>
              ) : (
                <motion.div
                  key="default-card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] min-h-[400px] flex flex-col justify-center"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-yellow inline-block px-3 py-1 border-2 border-black"
                  >
                    F.A.Q
                  </motion.h2>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-space font-black text-black uppercase mb-6 leading-[1.1]"
                  >
                    Common <br className="hidden lg:block" />
                    <span className="bg-brand-blue text-white px-2 border-4 border-black inline-block mt-3 transform rotate-2">Questions</span>
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="text-lg font-space font-bold text-black leading-relaxed"
                  >
                    Everything you need to know about working with Delta X and our process.
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="w-full lg:w-2/3 max-w-3xl">
          <div className="space-y-6">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`bg-white border-4 border-black transition-all duration-200 overflow-hidden ${
                    isActive ? "shadow-[8px_8px_0_0_#000] -translate-y-1 -translate-x-1" : "shadow-[4px_4px_0_0_#000]"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none transition-colors ${
                      isActive 
                        ? "bg-brand-yellow border-b-4 border-black" 
                        : hoveredIndex === index 
                          ? faq.color 
                          : "bg-white"
                    }`}
                  >
                    <span className={`text-xl font-space font-black uppercase ${hoveredIndex === index && !isActive ? faq.textColor : "text-black"}`}>
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 w-10 h-10 border-4 border-black bg-white flex items-center justify-center text-black shadow-[2px_2px_0_0_#000]">
                      {isActive ? <Minus size={20} strokeWidth={3} /> : <Plus size={20} strokeWidth={3} />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-8 pb-8 pt-6 bg-white">
                          <p className="text-black font-space font-bold leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
