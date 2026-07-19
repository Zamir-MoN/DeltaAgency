"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, MessageSquare, Mail, Link as LinkIcon } from "lucide-react";
import PixelSnow from "./PixelSnow";

export default function Footer() {
  return (
    <footer className="relative border-t-8 border-black bg-brand-cyan pt-24 pb-12 overflow-hidden text-black">
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <PixelSnow color="#000000" flakeSize={0.02} density={0.15} speed={1.25} />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Intro */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 h-12 flex items-center text-4xl font-logo tracking-tighter uppercase text-black outline-none focus:outline-none">
              DX
            </Link>
            <p className="text-black font-space font-bold leading-relaxed mb-8">
              We build premium digital experiences, AI solutions, and brands for modern businesses aiming for the future.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<MessageSquare size={24} />} />
              <SocialLink href="#" icon={<Globe size={24} />} />
              <SocialLink href="#" icon={<LinkIcon size={24} />} />
              <SocialLink href="#" icon={<Mail size={24} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-black font-space font-black uppercase text-xl mb-6">Navigation</h4>
            <ul className="space-y-4">
              <FooterLink href="/#services">Services</FooterLink>
              <FooterLink href="/portfolio">Portfolio</FooterLink>
              <FooterLink href="/#process">Process</FooterLink>
              <FooterLink href="/#about">About Us</FooterLink>
              <FooterLink href="/#contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-black font-space font-black uppercase text-xl mb-6">Services</h4>
            <ul className="space-y-4">
              <FooterLink href="/services/website-development">Web Development</FooterLink>
              <FooterLink href="/services/ui-ux-design">UI/UX Design</FooterLink>
              <FooterLink href="/services/ai-automation">AI Automation</FooterLink>
              <FooterLink href="/services/brand-identity">Brand Identity</FooterLink>
              <FooterLink href="/services/cloud-solutions">Cloud Solutions</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-black font-space font-black uppercase text-xl mb-6">Stay Updated</h4>
            <p className="text-black font-space font-bold mb-6">
              Subscribe to our newsletter for the latest insights and digital trends.
            </p>
            <form className="relative flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border-4 border-black py-3 pl-4 pr-12 text-black placeholder:text-gray-500 focus:outline-none focus:ring-4 focus:ring-black font-bold"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 bottom-0 px-4 bg-brand-yellow border-l-4 border-black hover:bg-black hover:text-white transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight size={24} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black font-space font-bold text-sm uppercase">
            &copy; {new Date().getFullYear()} Delta X Agency. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-black hover:bg-black hover:text-white px-2 py-1 font-space font-bold text-sm uppercase transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-black hover:bg-black hover:text-white px-2 py-1 font-space font-bold text-sm uppercase transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-12 h-12 bg-white border-4 border-black shadow-[4px_4px_0_0_#000] flex items-center justify-center text-black hover:translate-y-1 hover:translate-x-1 hover:shadow-none hover:bg-brand-yellow transition-all duration-200"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-black font-space font-bold uppercase hover:bg-black hover:text-white px-2 py-1 -ml-2 transition-colors duration-200 inline-block border-2 border-transparent hover:border-black">
        {children}
      </Link>
    </li>
  );
}
