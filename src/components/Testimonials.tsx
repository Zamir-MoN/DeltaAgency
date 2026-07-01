"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    company: "TechNova",
    role: "CEO",
    content: "Delta X completely transformed our digital presence. Their attention to detail and modern aesthetic brought our brand to the next level.",
    rating: 5,
  },
  {
    name: "David Chen",
    company: "Lumina Health",
    role: "Marketing Director",
    content: "Working with this agency was a breeze. The team is highly skilled, communicative, and delivered a stunning, high-performance web app.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    company: "FinEdge",
    role: "Founder",
    content: "The level of premium quality Delta X brings to the table is unmatched. Our conversion rates increased by 40% after the redesign.",
    rating: 5,
  },
  {
    name: "Marcus Thorne",
    company: "Quantum Logistics",
    role: "CTO",
    content: "Their expertise in modern web technologies and AI automation helped us scale our operations efficiently. Truly a world-class team.",
    rating: 5,
  },
];

// Duplicate for infinite marquee
const duplicatedTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative bg-brand-bg-1 border-b-8 border-black overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 mb-16 text-center max-w-3xl bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-yellow inline-block px-4 py-1 border-2 border-black"
        >
          Client Success
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-space font-black text-black uppercase mb-6"
        >
          What Our <span className="bg-brand-blue text-white px-2 border-4 border-black inline-block transform -rotate-2">Partners Say</span>
        </motion.h3>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex space-x-6 px-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.name}-${idx}`}
              className="w-[350px] md:w-[450px] flex-shrink-0 brutal-card p-8 bg-white"
            >
              <div className="flex text-black mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={24} fill="currentColor" />
                ))}
              </div>
              <p className="text-black font-space font-bold leading-relaxed mb-8 text-lg border-l-4 border-brand-pink pl-4">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-brand-yellow border-4 border-black flex items-center justify-center text-black font-space font-black text-2xl shadow-[4px_4px_0_0_#000]">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-space font-black text-black uppercase">
                    {testimonial.name}
                  </h5>
                  <p className="text-sm font-space font-bold text-black uppercase">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
