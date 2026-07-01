"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import WhyChooseUs from "@/components/WhyChooseUs";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import Technologies from "@/components/Technologies";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <Technologies />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
}
