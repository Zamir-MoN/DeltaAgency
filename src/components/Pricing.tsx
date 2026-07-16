"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import PricingToggle, { PricingTab } from "./PricingToggle";

const webPlans = [
  {
    name: "Starter",
    price: "$2,500+",
    description: "Perfect for startups and small businesses needing a solid digital presence.",
    features: [
      "Custom Website Design",
      "Mobile Responsive",
      "Basic SEO Setup",
      "CMS Integration",
      "1 Month Free Support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$8,000+",
    description: "Comprehensive digital solutions for growing brands looking to scale.",
    features: [
      "Everything in Starter",
      "Advanced Animations",
      "E-Commerce Functionality",
      "Brand Identity System",
      "Performance Optimization",
      "3 Months Free Support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$20,000+",
    description: "Full-scale digital transformation and bespoke software solutions.",
    features: [
      "Everything in Professional",
      "Custom Web Applications",
      "AI & Automation Integration",
      "Cloud Infrastructure Setup",
      "Dedicated Project Manager",
      "12 Months Free Support",
    ],
    highlighted: false,
  },
];

const appPlans = [
  {
    name: "Starter",
    price: "$5,000+",
    description: "Native mobile app MVP for iOS or Android platforms.",
    features: [
      "Single Platform (iOS/Android)",
      "UI/UX Design",
      "Basic API Integration",
      "App Store Submission",
      "1 Month Free Support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$15,000+",
    description: "Cross-platform mobile applications with advanced feature sets.",
    features: [
      "Cross-Platform (React Native)",
      "Custom Animations",
      "Push Notifications",
      "Complex Backend Integration",
      "Offline Mode Support",
      "3 Months Free Support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$35,000+",
    description: "Enterprise-grade mobile solutions with scalable infrastructure.",
    features: [
      "Native iOS & Android",
      "AI & Machine Learning Features",
      "Real-time WebSocket Data",
      "Advanced Security Audits",
      "Dedicated Project Manager",
      "12 Months Free Support",
    ],
    highlighted: false,
  },
];

const hostingPlans = [
  {
    name: "Starter",
    price: "$150/mo",
    description: "Reliable shared hosting and maintenance for standard websites.",
    features: [
      "99.9% Uptime Guarantee",
      "Free SSL Certificate",
      "Weekly Backups",
      "Basic Security Monitoring",
      "Email Support",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$500/mo",
    description: "High-performance VPS hosting for growing digital platforms.",
    features: [
      "Virtual Private Server",
      "Global CDN Setup",
      "Daily Automated Backups",
      "Advanced Firewall Security",
      "Performance Optimization",
      "Priority Support",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$1,500+/mo",
    description: "Dedicated infrastructure for mission-critical applications.",
    features: [
      "Dedicated Server / AWS Scalable",
      "Load Balancing",
      "Real-time Threat Mitigation",
      "Disaster Recovery Setup",
      "Custom CI/CD Pipelines",
      "24/7 Phone Support",
    ],
    highlighted: false,
  },
];

const pricingData = {
  app: appPlans,
  web: webPlans,
  hosting: hostingPlans
};

export default function Pricing() {
  const [activeTab, setActiveTab] = useState<PricingTab>('web');
  const currentPlans = pricingData[activeTab];
  return (
    <section className="py-32 relative bg-brand-cyan bg-grid border-b-8 border-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-space font-black text-black uppercase tracking-widest mb-4 bg-brand-yellow inline-block px-4 py-1 border-2 border-black"
          >
            Investment
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-space font-black text-black uppercase mb-6 break-words"
          >
            Transparent <span className="bg-brand-pink text-white px-2 border-4 border-black inline-block mt-2 sm:mt-0 transform -rotate-2">Pricing</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl font-space font-bold text-black"
          >
            No hidden fees. Just premium value and exceptional results tailored to your scale.
          </motion.p>
        </div>

        <PricingToggle activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {currentPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col h-full p-8 lg:p-10 border-4 border-black transition-all duration-300 ${
                plan.highlighted
                  ? "bg-brand-yellow shadow-[6px_6px_0_0_#000] lg:-translate-y-6 hover:translate-x-[6px] hover:translate-y-[6px] lg:hover:-translate-y-[18px] hover:shadow-none z-10"
                  : "bg-white shadow-[6px_6px_0_0_#000] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none z-0"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-black text-white text-xs font-space font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0_0_#000]">
                  Most Popular
                </div>
              )}
              
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.15 }}
                className="flex flex-col flex-grow"
              >
                <h4 className="text-3xl font-space font-black text-black uppercase mb-2">
                  {plan.name}
                </h4>
                <p className="text-black font-space font-bold text-sm mb-6 min-h-[2.5rem]">
                  {plan.description}
                </p>
                
                <div className="text-4xl sm:text-5xl lg:text-3xl xl:text-4xl font-space font-black text-black mb-8 border-b-4 border-black pb-8 break-words">
                  {plan.price}
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0 bg-brand-pink text-black border-2 border-black rounded-none p-0.5 shadow-[2px_2px_0_0_#000]">
                        <Check size={16} strokeWidth={4} />
                      </div>
                      <span className="text-base font-space font-bold text-black leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <a
                  href="#contact"
                  className={`block w-full mt-auto py-4 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black hover:-translate-y-1 hover:-translate-x-1 ${
                    plan.highlighted
                      ? "bg-white text-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-brand-pink"
                      : "bg-white text-black shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] hover:bg-brand-blue hover:text-white"
                  }`}
                >
                  Choose {plan.name}
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
