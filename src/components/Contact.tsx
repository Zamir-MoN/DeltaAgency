"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, ChevronDown } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMapInteractive, setIsMapInteractive] = useState(false);
  const [budget, setBudget] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Message sent successfully!");
    }, 2000);
  };

  return (
    <section id="contact" className="py-32 relative bg-white border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] mb-12">
              <h2 className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-pink inline-block px-3 py-1 border-2 border-black">
                Get in Touch
              </h2>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-space font-black text-black uppercase mb-6">
                Let's Build the <span className="bg-brand-cyan text-white px-2 border-4 border-black inline-block mt-2 transform rotate-2">Future</span>
              </h3>
              <p className="text-xl font-space font-bold text-black leading-relaxed max-w-md">
                Ready to start your next project? Contact us today and let's discuss how we can help your brand grow.
              </p>
            </div>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-6 brutal-card bg-brand-yellow p-6 border-4 border-black">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 text-black shadow-[4px_4px_0_0_#000]">
                  <MapPin size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-space font-black text-black uppercase mb-1">Our Studio</h4>
                  <p className="text-black font-space font-bold text-lg">
                    100 Innovation Drive, Suite 300<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 brutal-card bg-brand-cyan p-6 border-4 border-black">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 text-black shadow-[4px_4px_0_0_#000]">
                  <Phone size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-space font-black text-black uppercase mb-1">Phone</h4>
                  <p className="text-black font-space font-bold text-lg">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 brutal-card bg-brand-pink p-6 border-4 border-black">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center flex-shrink-0 text-black shadow-[4px_4px_0_0_#000]">
                  <Mail size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-space font-black text-black uppercase mb-1">Email</h4>
                  <p className="text-black font-space font-bold text-lg">
                    hello@deltax.agency
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div 
              className="w-full h-48 md:h-64 border-4 border-black bg-white relative shadow-[8px_8px_0_0_#000]"
              onMouseLeave={() => setIsMapInteractive(false)}
            >
              {!isMapInteractive && (
                <div 
                  className="absolute inset-0 bg-brand-blue/20 z-10 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsMapInteractive(true)}
                >
                   <span className="text-white font-space font-black uppercase text-xl px-6 py-2 bg-black border-4 border-white hover:bg-brand-pink hover:text-black transition-colors duration-300">Interact with Map</span>
                </div>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.5076401!3d37.757815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                className="w-full h-full"
                style={{ border: 0, pointerEvents: isMapInteractive ? 'auto' : 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="bg-brand-yellow border-4 border-black p-6 md:p-12 h-full flex flex-col justify-center shadow-[12px_12px_0_0_#000]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-space font-black uppercase text-black mb-2">Full Name</label>
                  <input required type="text" className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold focus:outline-none focus:ring-4 focus:ring-brand-pink focus:border-black transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-lg font-space font-black uppercase text-black mb-2">Email Address</label>
                  <input required type="email" className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold focus:outline-none focus:ring-4 focus:ring-brand-pink focus:border-black transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-space font-black uppercase text-black mb-2">Company</label>
                  <input type="text" className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold focus:outline-none focus:ring-4 focus:ring-brand-pink focus:border-black transition-colors" placeholder="Your Company" />
                </div>
                <div>
                  <label className="block text-lg font-space font-black uppercase text-black mb-2">Budget</label>
                  <CustomSelect 
                    options={[
                      { value: "5k-10k", label: "$5k - $10k" },
                      { value: "10k-25k", label: "$10k - $25k" },
                      { value: "25k-50k", label: "$25k - $50k" },
                      { value: "50k+", label: "$50k+" },
                    ]}
                    placeholder="Select a budget"
                    value={budget}
                    onChange={setBudget}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-space font-black uppercase text-black mb-2">Service Required</label>
                <CustomSelect 
                  options={[
                    { value: "web", label: "Website Development" },
                    { value: "branding", label: "Brand Identity" },
                    { value: "ai", label: "AI Automation" },
                    { value: "app", label: "App Development" },
                    { value: "other", label: "Other" },
                  ]}
                  placeholder="What can we help you with?"
                  value={service}
                  onChange={setService}
                />
              </div>

              <div className="mb-8">
                <label className="block text-lg font-space font-black uppercase text-black mb-2">Message</label>
                <textarea required rows={5} className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold focus:outline-none focus:ring-4 focus:ring-brand-pink focus:border-black transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 flex items-center justify-center gap-3 bg-black text-white border-4 border-black font-space font-black text-xl uppercase tracking-wider transition-all duration-200 hover:bg-brand-pink hover:text-black hover:-translate-y-1 hover:-translate-x-1 shadow-[4px_4px_0_0_#000] hover:shadow-[8px_8px_0_0_#000] disabled:opacity-70 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_0_#000] disabled:hover:bg-black disabled:hover:text-white"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={24} strokeWidth={3} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface CustomSelectProps {
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

function CustomSelect({ options, placeholder, value, onChange }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${isOpen ? 'z-50' : 'z-10'}`} ref={containerRef}>
      <div 
        className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold cursor-pointer flex justify-between items-center transition-colors focus-within:ring-4 focus-within:ring-brand-pink"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen(!isOpen);
          }
        }}
      >
        <span className={value ? "text-black" : "text-black/60"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={24} className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border-4 border-black shadow-[6px_6px_0_0_#000] z-50 flex flex-col overflow-y-auto max-h-[208px]"
            data-lenis-prevent
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-3 text-black font-space font-bold cursor-pointer transition-colors border-b-4 border-black last:border-b-0 hover:bg-brand-pink ${value === option.value ? "bg-brand-yellow" : "bg-white"}`}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
