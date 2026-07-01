"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send } from "lucide-react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
              <h3 className="text-5xl md:text-6xl font-space font-black text-black uppercase mb-6">
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
            <div className="w-full h-64 border-4 border-black bg-white relative group cursor-pointer shadow-[8px_8px_0_0_#000]">
              <div className="absolute inset-0 bg-brand-blue/20 group-hover:bg-transparent transition-colors duration-500 z-10 flex items-center justify-center pointer-events-none">
                 <span className="text-white font-space font-black uppercase text-xl px-6 py-2 bg-black border-4 border-white group-hover:opacity-0 transition-opacity duration-300">View on Map</span>
              </div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.5076401!3d37.757815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
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
            <form onSubmit={handleSubmit} className="bg-brand-yellow border-4 border-black p-8 md:p-12 h-full flex flex-col justify-center shadow-[12px_12px_0_0_#000]">
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
                  <select className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold focus:outline-none focus:ring-4 focus:ring-brand-pink focus:border-black transition-colors appearance-none">
                    <option value="" disabled selected>Select a budget</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k-50k">$25k - $50k</option>
                    <option value="50k+">$50k+</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-lg font-space font-black uppercase text-black mb-2">Service Required</label>
                <select className="w-full bg-white border-4 border-black px-4 py-3 text-black font-space font-bold focus:outline-none focus:ring-4 focus:ring-brand-pink focus:border-black transition-colors appearance-none">
                  <option value="" disabled selected>What can we help you with?</option>
                  <option value="web">Website Development</option>
                  <option value="branding">Brand Identity</option>
                  <option value="ai">AI Automation</option>
                  <option value="app">App Development</option>
                  <option value="other">Other</option>
                </select>
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
                    className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full"
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
