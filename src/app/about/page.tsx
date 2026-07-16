import Link from "next/link";
import { ArrowLeft, Target, Users, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-bg-1 bg-dots pt-24 pb-32">
      <div className="container mx-auto px-6 md:px-12">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-space font-black uppercase text-black mb-12 hover:bg-black hover:text-white border-4 border-transparent hover:border-black px-4 py-2 transition-all duration-200"
        >
          <ArrowLeft size={20} strokeWidth={3} />
          Back to Home
        </Link>
        
        <div className="mb-16">
          <h1 className="text-5xl md:text-7xl font-space font-black text-black uppercase leading-tight mb-8">
            The Team <br/>
            Behind the <span className="bg-brand-yellow px-2 inline-block transform -rotate-2 border-4 border-black">Magic</span>
          </h1>
          <p className="text-xl md:text-2xl font-space font-bold text-gray-800 max-w-3xl leading-relaxed">
            Delta X is a collective of visionary designers, ruthless engineers, and strategic thinkers. We build the internet of tomorrow, today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { icon: Target, title: "Our Mission", desc: "To obliterate mediocrity and establish a new standard for digital experiences.", color: "bg-brand-pink" },
            { icon: Users, title: "Who We Are", desc: "A tight-knit crew of industry veterans who thrive on complex challenges.", color: "bg-brand-cyan" },
            { icon: Zap, title: "How We Work", desc: "Fast, agile, and without compromise. We move at the speed of culture.", color: "bg-brand-blue" }
          ].map((item, i) => (
            <div key={i} className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#000] transition-all duration-200">
              <div className={`w-16 h-16 ${item.color} border-4 border-black flex items-center justify-center mb-6`}>
                <item.icon size={32} className="text-black" />
              </div>
              <h3 className="text-2xl font-space font-black text-black uppercase mb-4">{item.title}</h3>
              <p className="text-lg font-space font-bold text-gray-800">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-purple border-4 border-black p-12 md:p-20 shadow-[12px_12px_0_0_#000] text-center">
          <h2 className="text-4xl md:text-5xl font-space font-black text-white uppercase mb-8">Ready to dominate?</h2>
          <Link 
            href="/#contact"
            className="inline-block px-10 py-5 bg-white text-black font-space font-black uppercase text-xl border-4 border-black hover:bg-black hover:text-white hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_#000] transition-all duration-200"
          >
            Start a Project
          </Link>
        </div>

      </div>
    </div>
  );
}
