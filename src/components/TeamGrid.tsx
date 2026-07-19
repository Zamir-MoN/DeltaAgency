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
    name: "MD. Zamir",
    role: "UI/UX & Frontend Designer",
    description: "Designs intuitive user experiences and modern interfaces while developing responsive, user-friendly frontend solutions.",
    icon: MonitorSmartphone,
    color: "bg-brand-yellow",
    hoverColor: "hover:bg-brand-yellow",
    animation: "group-hover:scale-110 group-hover:rotate-6",
    skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Figma", "HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "GSAP Animations", "Framer Motion", "Responsive Design", "Design Systems", "Accessibility (WCAG)"],
    hoverImage: "/images/md_zamir_bg_002.png"
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
    name: "Imraj Mondal",
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
  const [hoveredIndex, setHoveredIndex] = useState(0);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  return (
    <div className="mb-24 relative">
      <h2 className="text-4xl md:text-5xl font-space font-black text-black uppercase mb-12 border-b-8 border-black pb-4 inline-block">The Crew</h2>
      
      <div className="flex flex-col gap-4 md:gap-6 max-w-3xl mx-auto lg:mr-auto lg:ml-[5%] xl:ml-[10%] mt-8 lg:mt-24 relative">
        {teamMembers.map((member, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div 
              key={i} 
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => setSelectedMember(member)} 
              className={`group border-4 border-black p-4 md:p-6 transition-all duration-200 flex flex-row items-center justify-between w-full relative cursor-pointer z-10 hover:z-50 ${isHovered ? `${member.color} shadow-[10px_10px_0_0_#000] -translate-y-1 -translate-x-1` : 'bg-white shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1'}`}
            >
              
              {/* Floating Preview Card (Desktop Only) */}
              <div 
                className={`hidden lg:flex absolute left-[calc(100%+2rem)] top-1/2 -translate-y-1/2 w-[340px] aspect-square border-4 border-black p-8 shadow-[12px_12px_0_0_#000] flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden ${member.color} ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
              >
                {(member as any).hoverImage ? (
                  <div 
                    className="absolute inset-0 z-0 opacity-100 pointer-events-none"
                    style={{
                      backgroundImage: `url('${(member as any).hoverImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                ) : (
                  <>
                    <div className="relative z-10 w-24 h-24 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000] -rotate-3">
                      <member.icon size={48} className="text-black" />
                    </div>
                    <h3 className="relative z-10 text-2xl font-space font-black text-white uppercase [text-shadow:2px_2px_0px_#000] mb-2 leading-tight">
                      {member.name}
                    </h3>
                    <p className="relative z-10 text-sm font-space font-bold text-white uppercase [text-shadow:2px_2px_0px_#000]">
                      {member.role}
                    </p>
                  </>
                )}
              </div>

              <div className="flex items-center gap-4 md:gap-6 relative z-10">
                <div className={`hidden md:flex w-12 h-12 md:w-14 md:h-14 bg-white border-4 border-black items-center justify-center shrink-0 transition-all duration-300 ${member.animation}`}>
                  <member.icon size={24} className="text-black" />
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                  <h3 className={`text-lg md:text-xl font-space font-black uppercase transition-all duration-300 ${isHovered ? 'text-white [text-shadow:2px_2px_0px_#000]' : 'text-black'}`}>
                    {member.name}
                  </h3>
                  <span className={`hidden md:block ${isHovered ? 'text-white [text-shadow:2px_2px_0px_#000]' : 'text-black'}`}>-</span>
                  <p className={`text-sm md:text-base font-space font-bold uppercase transition-all duration-300 ${isHovered ? 'text-white [text-shadow:2px_2px_0px_#000]' : 'text-gray-500'}`}>
                    {member.role}
                  </p>
                </div>
              </div>

              <div className={`relative z-10 w-10 h-10 md:w-12 md:h-12 border-4 border-black flex items-center justify-center shrink-0 transition-colors ${isHovered ? 'bg-white text-black' : 'bg-brand-bg-1 text-black group-hover:bg-brand-yellow'}`}>
                <span className="text-2xl md:text-3xl font-space font-black leading-none mt-1">+</span>
              </div>
            </div>
          );
        })}
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
                  className="absolute top-6 right-6 md:top-8 md:right-8 bg-white border-4 border-black p-2 hover:bg-brand-yellow hover:-translate-y-1 hover:shadow-[4px_4px_0_0_#000] transition-all z-50 cursor-pointer hidden md:block"
                >
                  <X size={24} strokeWidth={3} className="text-black" />
                </button>

                <div className="flex-grow flex flex-col justify-center mt-12 md:mt-0 relative z-10">
                  <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0_0_#000]">
                    <selectedMember.icon size={32} strokeWidth={4} className="text-black" />
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-space font-black text-black uppercase mb-2 leading-tight">
                    {selectedMember.name}
                  </h3>
                  <p className="text-xl md:text-2xl font-space font-bold text-black uppercase mb-6 opacity-90">
                    {selectedMember.role}
                  </p>
                  
                  <div className="bg-white border-4 border-black shadow-[4px_4px_0_0_#000] mb-8 flex flex-col">
                    {(selectedMember as any).hoverImage && (
                      <img 
                        src={(selectedMember as any).hoverImage}
                        alt={selectedMember.name}
                        className="w-full h-56 md:h-80 object-cover object-top border-b-4 border-black"
                      />
                    )}
                    <div className="p-6 md:p-8">
                      <p className="text-lg md:text-xl text-black font-medium leading-relaxed">
                        {selectedMember.description}
                      </p>
                      
                      {selectedMember.skills && selectedMember.skills.length > 0 && (
                        <div className="mt-8 pt-8 border-t-4 border-black">
                          <h4 className="text-xl md:text-2xl font-space font-black text-black uppercase mb-6">
                            Skills & Expertise
                          </h4>
                          <div className="flex flex-wrap gap-3">
                            {selectedMember.skills.map((skill, index) => (
                              <span key={index} className="bg-brand-bg-1 border-2 border-black px-4 py-2 text-sm font-space font-bold text-black uppercase shadow-[2px_2px_0_0_#000]">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button 
                    onClick={() => setSelectedMember(null)}
                    className="w-full py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-black text-white hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-brand-yellow hover:text-black hover:-translate-y-1 hover:-translate-x-1"
                  >
                    Close Details
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
