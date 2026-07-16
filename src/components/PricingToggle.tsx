"use client";

import React from 'react';
import { Smartphone, Globe, Server } from "lucide-react";

export type PricingTab = 'app' | 'web' | 'hosting';

interface PricingToggleProps {
  activeTab: PricingTab;
  setActiveTab: (tab: PricingTab) => void;
}

export default function PricingToggle({ activeTab, setActiveTab }: PricingToggleProps) {
  return (
    <div className="flex justify-center items-center mb-16">
      <div className="relative w-[320px] h-[80px] bg-white border-4 border-black p-2 shadow-[8px_8px_0_0_#000] flex items-center box-border">
        <input type="radio" id="brutal-opt-1" name="brutal-mode" className="hidden peer/opt1" checked={activeTab === 'app'} onChange={() => setActiveTab('app')} />
        <input type="radio" id="brutal-opt-2" name="brutal-mode" className="hidden peer/opt2" checked={activeTab === 'web'} onChange={() => setActiveTab('web')} />
        <input type="radio" id="brutal-opt-3" name="brutal-mode" className="hidden peer/opt3" checked={activeTab === 'hosting'} onChange={() => setActiveTab('hosting')} />

        {/* Labels / Icons */}
        <label htmlFor="brutal-opt-1" className="flex-1 h-full flex flex-col justify-center items-center gap-1 cursor-pointer z-10 transition-transform duration-300 hover:scale-110 peer-checked/opt1:text-white text-black peer-checked/opt1:drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          <Smartphone className="w-6 h-6" strokeWidth={3} />
          <span className="text-[10px] font-space font-black uppercase tracking-widest">Apps</span>
        </label>
        
        <label htmlFor="brutal-opt-2" className="flex-1 h-full flex flex-col justify-center items-center gap-1 cursor-pointer z-10 transition-transform duration-300 hover:scale-110 peer-checked/opt2:text-white text-black peer-checked/opt2:drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          <Globe className="w-6 h-6" strokeWidth={3} />
          <span className="text-[10px] font-space font-black uppercase tracking-widest">Web</span>
        </label>
        
        <label htmlFor="brutal-opt-3" className="flex-1 h-full flex flex-col justify-center items-center gap-1 cursor-pointer z-10 transition-transform duration-300 hover:scale-110 peer-checked/opt3:text-white text-black peer-checked/opt3:drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          <Server className="w-6 h-6" strokeWidth={3} />
          <span className="text-[10px] font-space font-black uppercase tracking-widest">Hosting</span>
        </label>

        {/* Sliding Highlight Block */}
        <div className="absolute top-2 left-2 w-[calc((100%-16px)/3)] h-[calc(100%-16px)] bg-brand-pink border-4 border-black z-0 transition-transform duration-300 cubic-bezier(0.34, 1.56, 0.64, 1) pointer-events-none shadow-[inset_0_-4px_0_0_rgba(0,0,0,0.2)]
          peer-checked/opt1:translate-x-0 
          peer-checked/opt2:translate-x-full 
          peer-checked/opt3:translate-x-[200%]
        " />
      </div>
    </div>
  );
}
