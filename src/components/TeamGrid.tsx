"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Palette, Settings, Server, MonitorSmartphone, PenTool, Video, Clapperboard, X } from "lucide-react";
import PixelSnow from "./PixelSnow";

const teamMembers = [
  {
    name: "Yashashvi Bakshi",
    role: "CEO & Founder",
    description: "Leads the company's vision, technology strategy, and overall business direction. Oversees technical innovation while driving growth and long-term success.",
    icon: Rocket,
    color: "bg-brand-yellow",
    hoverColor: "hover:bg-brand-yellow",
    animation: "group-hover:-translate-y-2 group-hover:rotate-12",
    skills: ["Business Strategy", "Leadership", "Technology Strategy", "Product Development", "Software Architecture", "AI & Automation", "Innovation Management", "Startup Growth", "Decision Making", "Team Leadership", "Project Planning", "Client Relations"]
  },
  {
    name: "Danish Ansari",
    role: "Founder & Creative Director",
    description: "Oversees overall operations, creative strategy, and project execution. Contributes across technology, design, video production, content creation, and team management to ensure seamless collaboration and high-quality delivery.",
    icon: Palette,
    color: "bg-brand-pink",
    hoverColor: "hover:bg-brand-pink",
    animation: "group-hover:scale-110 group-hover:-rotate-12",
    skills: ["Creative Direction", "Project Management", "Brand Strategy", "UI/UX Design", "Web Development", "Motion Graphics", "Video Production", "Content Strategy", "Team Management", "Digital Marketing", "Client Communication", "Creative Problem Solving"]
  },
  {
    name: "Anmol Pandey",
    role: "Operations Manager",
    description: "Manages daily operations, team coordination, and project workflows, ensuring efficient execution and smooth communication across departments.",
    icon: Settings,
    color: "bg-brand-cyan",
    hoverColor: "hover:bg-brand-cyan",
    animation: "group-hover:rotate-90 group-hover:scale-110",
    skills: ["Operations Management", "Project Coordination", "Team Leadership", "Workflow Optimization", "Process Management", "Resource Planning", "Client Communication", "Time Management", "Risk Management", "Quality Assurance", "Documentation", "Strategic Planning"]
  },
  {
    name: "Sagar Pal",
    role: "Backend Developer & DevOps Engineer",
    description: "Builds scalable backend systems, manages servers, and handles Linux-based infrastructure to ensure secure, reliable, and high-performance applications.",
    icon: Server,
    color: "bg-brand-blue",
    hoverColor: "hover:bg-brand-blue",
    animation: "group-hover:-translate-y-2 group-hover:-rotate-6",
    skills: ["Node.js", "Express.js", "Python", "REST APIs", "Database Design", "MySQL", "PostgreSQL", "MongoDB", "Linux Administration", "Docker", "Nginx", "DevOps", "CI/CD", "Cloud Infrastructure", "VPS Management", "Server Security", "Git & GitHub", "Performance Optimization"]
  },
  {
    name: "Zamir Mondol",
    role: "UI/UX & Frontend Designer",
    description: "Designs intuitive user experiences and modern interfaces while developing responsive, user-friendly frontend solutions.",
    icon: MonitorSmartphone,
    color: "bg-brand-yellow",
    hoverColor: "hover:bg-brand-yellow",
    animation: "group-hover:scale-110 group-hover:rotate-6",
    skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Figma", "HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "GSAP Animations", "Framer Motion", "Responsive Design", "Design Systems", "Accessibility (WCAG)"]
  },
  {
    name: "Tushar Gupta",
    role: "Lead Graphic Designer",
    description: "Leads the design team and creates impactful brand identities, marketing creatives, and visual assets that strengthen client brands.",
    icon: PenTool,
    color: "bg-brand-pink",
    hoverColor: "hover:bg-brand-pink",
    animation: "group-hover:-translate-y-2 group-hover:-rotate-6",
    skills: ["Brand Identity Design", "Logo Design", "Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Social Media Design", "Print Design", "Packaging Design", "Typography", "Color Theory", "Marketing Creatives", "Visual Communication"]
  },
  {
    name: "Imraj Khan",
    role: "Video Editor",
    description: "Crafts high-quality video content with a focus on storytelling, smooth editing, and engaging visuals across digital platforms.",
    icon: Video,
    color: "bg-brand-cyan",
    hoverColor: "hover:bg-brand-cyan",
    animation: "group-hover:scale-125 group-hover:rotate-6",
    skills: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Color Grading", "Audio Editing", "Storytelling", "Cinematic Editing", "YouTube Video Editing", "Short-form Content", "Visual Effects (VFX)", "Content Optimization"]
  },
  {
    name: "Aman Pandat",
    role: "Video Editor",
    description: "Produces polished, engaging video content with attention to detail, visual quality, and creative storytelling.",
    icon: Clapperboard,
    color: "bg-brand-blue",
    hoverColor: "hover:bg-brand-blue",
    animation: "group-hover:-rotate-12 group-hover:scale-110",
    skills: ["Adobe Premiere Pro", "DaVinci Resolve", "After Effects", "Video Editing", "Motion Graphics", "Color Correction", "Audio Mixing", "Reels & Shorts Editing", "YouTube Content", "Social Media Videos", "Visual Storytelling", "Creative Editing"]
  },
];

export default function TeamGrid() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <div className="mb-24 relative">
      <h2 className="text-4xl md:text-5xl font-space font-black text-black uppercase mb-12 border-b-8 border-black pb-4 inline-block">The Crew</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
        {teamMembers.map((member, i) => (
          <div key={i} className="group bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0_0_#000] transition-all duration-200 flex flex-col h-full">
            <div className={`w-14 h-14 ${member.color} border-4 border-black flex items-center justify-center mb-6 transition-all duration-300 ${member.animation}`}>
              <member.icon size={28} className="text-black" />
            </div>
            <h3 className="text-xl font-space font-black text-black uppercase mb-1">{member.name}</h3>
            <p className="text-sm font-space font-bold text-gray-500 uppercase mb-4 pb-4 border-b-4 border-black">{member.role}</p>
            <p className="text-base font-inter font-medium text-gray-800 flex-grow mb-6 line-clamp-3">{member.description}</p>
            <button 
              onClick={() => setSelectedMember(member)}
              className={`mt-auto py-3 px-4 text-center font-space font-black uppercase text-sm border-2 border-black w-full transition-all duration-200 shadow-[4px_4px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none bg-brand-bg-1 ${member.hoverColor}`}
            >
              More Details
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedMember && (
          <div 
            className="fixed inset-0 z-[99999] flex flex-col justify-end items-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-3xl border-4 border-black shadow-[12px_12px_0_0_#000] relative overflow-hidden max-h-[85vh] mt-auto flex flex-col ${selectedMember.color}`}
            >
              {/* Galaxy Background Image with Mix Blend */}
              <div 
                className="absolute inset-0 pointer-events-none z-0 mix-blend-overlay opacity-60"
                style={{
                  backgroundImage: `url('https://img.magnific.com/free-photo/anime-style-galaxy-background_23-2151134130.jpg?semt=ais_hybrid&w=740&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              {/* Pixel Snow Effect */}
              <div className="absolute inset-0 pointer-events-none opacity-30 z-0 overflow-hidden">
                <PixelSnow color="#000000" flakeSize={0.02} density={0.1} speed={1.5} />
              </div>

              {/* Scrollable Content Container */}
              <div className="relative z-10 w-full h-full p-8 md:p-12 overflow-y-auto flex flex-col" data-lenis-prevent>
                <button 
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white border-4 border-black flex items-center justify-center hover:bg-brand-yellow transition-colors z-20 shadow-[4px_4px_0_0_#000] active:translate-y-1 active:translate-x-1 active:shadow-none"
                >
                  <X size={24} className="text-black" />
                </button>
                
                <div className="flex flex-col md:flex-row gap-8 items-start relative z-0 mt-4 md:mt-0">
                  <div className={`w-24 h-24 shrink-0 border-4 border-black flex items-center justify-center shadow-[8px_8px_0_0_#000] bg-white`}>
                    <selectedMember.icon size={48} className="text-black" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-space font-black text-black uppercase mb-4 mt-2 md:mt-0">
                      <span className="bg-white px-3 py-1 inline-block border-4 border-black shadow-[4px_4px_0_0_#000] leading-snug">{selectedMember.name}</span>
                    </h3>
                    <p className="text-xl font-space font-bold text-black uppercase mb-8">
                      <span className="bg-white px-3 py-1 inline-block border-4 border-black shadow-[4px_4px_0_0_#000]">{selectedMember.role}</span>
                    </p>
                    
                    <p className="text-lg font-inter font-bold text-gray-900 leading-relaxed bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] mb-10">
                      {selectedMember.description}
                    </p>
                    
                    {selectedMember.skills && selectedMember.skills.length > 0 && (
                      <div>
                        <h4 className="text-2xl font-space font-black text-black uppercase mb-6 mt-4">
                          <span className="bg-white px-3 py-1 inline-block border-4 border-black shadow-[4px_4px_0_0_#000]">Skills & Expertise</span>
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedMember.skills.map((skill, index) => (
                            <span key={index} className="bg-white border-2 border-black px-4 py-2 text-sm font-inter font-bold text-black shadow-[3px_3px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0_0_#000] transition-all cursor-default">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
