"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Users, Zap, Sparkles } from "lucide-react";
import TeamGrid from "@/components/TeamGrid";

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="min-h-screen bg-brand-bg-1 overflow-hidden">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-dots pointer-events-none z-0 opacity-50"></div>
      
      <div className="relative z-10 pt-24 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              href="/"
              className="inline-flex items-center gap-2 font-space font-black uppercase text-black mb-16 hover:bg-black hover:text-white border-4 border-transparent hover:border-black px-4 py-2 transition-all duration-200"
            >
              <ArrowLeft size={20} strokeWidth={3} />
              Back to Base
            </Link>
          </motion.div>
          
          {/* HERO SECTION */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-24"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-[10rem] font-space font-black text-black uppercase leading-[0.9] mb-12 tracking-tight"
            >
              We Build The <br className="hidden md:block"/>
              <span className="inline-block relative mt-4 md:mt-0">
                <span className="absolute inset-0 bg-brand-yellow transform -rotate-2 border-4 border-black z-[-1]"></span>
                <span className="relative z-10 px-6 text-white" style={{ WebkitTextStroke: "2px black" }}>Future</span>
              </span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-space font-bold text-gray-800 max-w-4xl leading-relaxed mt-16 border-l-8 border-brand-pink pl-8"
            >
              Delta X is a collective of visionary designers, ruthless engineers, and strategic thinkers. We obliterate mediocrity.
            </motion.p>
          </motion.div>

        </div>

        {/* MARQUEE SECTION */}
        <div className="w-[110%] -ml-[5%] bg-brand-purple border-y-8 border-black py-8 overflow-hidden mb-40 transform -rotate-2 relative z-20">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 12 }}
            className="flex w-max items-center text-5xl md:text-6xl font-space font-black text-white uppercase gap-12"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex items-center gap-12 pl-12">
                <span>Innovate</span>
                <Sparkles size={48} className="text-brand-yellow" fill="currentColor" />
                <span>Dominate</span>
                <Sparkles size={48} className="text-brand-cyan" fill="currentColor" />
                <span>Elevate</span>
                <Sparkles size={48} className="text-brand-pink" fill="currentColor" />
                <span>Accelerate</span>
                <Sparkles size={48} className="text-brand-yellow" fill="currentColor" />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          {/* ASYMMETRICAL INFO SECTION */}
          <div className="mb-48 relative">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-brand-pink border-4 border-black p-8 md:p-10 shadow-[16px_16px_0_0_#000] mb-16 transform hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 relative z-10"
            >
              <div className="absolute -top-10 -right-10 bg-white border-4 border-black p-6 rounded-full shadow-[8px_8px_0_0_#000] hidden md:block group-hover:rotate-12 transition-transform">
                <Target size={40} className="text-black" />
              </div>
              <Target size={40} className="mb-6 text-black md:hidden" />
              
              <h2 className="text-4xl md:text-5xl font-space font-black text-black uppercase mb-6">Our Mission</h2>
              <p className="text-xl md:text-2xl font-inter font-bold text-black max-w-4xl leading-relaxed">
                To establish a new standard for digital experiences. We don't just build websites; we engineer digital powerhouses that propel businesses into the stratosphere.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-5 bg-brand-cyan border-4 border-black p-10 shadow-[12px_12px_0_0_#000] transform hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300 relative z-20"
              >
                <Users size={48} className="mb-6 text-black" />
                <h3 className="text-4xl font-space font-black text-black uppercase mb-6">Who We Are</h3>
                <p className="text-xl font-inter font-bold text-gray-900 leading-relaxed">
                  A tight-knit crew of industry veterans who thrive on complex challenges. We blend bold creativity with bulletproof technology.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="md:col-span-7 bg-brand-blue border-4 border-black p-10 md:p-16 shadow-[12px_12px_0_0_#000] transform md:mt-8 hover:-translate-y-2 hover:-translate-x-2 transition-transform duration-300"
              >
                <Zap size={48} className="mb-6 text-black" />
                <h3 className="text-4xl font-space font-black text-black uppercase mb-6">How We Work</h3>
                <p className="text-xl font-inter font-bold text-gray-900 leading-relaxed">
                  Fast, agile, and without compromise. We move at the speed of culture, delivering high-impact solutions with surgical precision and unrelenting momentum.
                </p>
              </motion.div>
            </div>
          </div>

          <TeamGrid />



        </div>
      </div>
    </div>
  );
}
