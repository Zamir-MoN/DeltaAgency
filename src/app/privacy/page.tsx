import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-brand-bg-1 bg-grid pt-32 pb-24 px-6 md:px-12">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <div className="bg-brand-cyan border-4 border-black p-8 md:p-12 mb-12 shadow-[12px_12px_0_0_#000] relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white border-b-4 border-l-4 border-black -translate-y-16 translate-x-16 rotate-45 z-0"></div>
          
          <div className="relative z-10">
            <div className="inline-block bg-black px-6 py-3 mb-6">
              <h1 className="text-4xl md:text-6xl font-space font-black text-white uppercase tracking-tight">
                Privacy Policy
              </h1>
            </div>
            <p className="text-xl font-space font-bold text-black uppercase">
              Last Updated: August 2026
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0_0_#000]">
          <div className="prose prose-lg max-w-none prose-headings:font-space prose-headings:font-black prose-headings:uppercase prose-headings:text-black prose-p:font-inter prose-p:text-gray-800 prose-strong:text-black">
            <p className="text-lg md:text-xl font-inter font-medium leading-relaxed mb-8">
              Delta X (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or use our services.
            </p>

            <h2 className="text-2xl md:text-3xl mt-12 mb-6 border-b-4 border-black pb-2 inline-block">1. Information We Collect</h2>
            <ul className="space-y-4 font-inter text-gray-800 list-none pl-0">
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-brand-yellow border-2 border-black mr-4 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-black font-bold">Personal Information:</strong> When you start a project or contact us, we may collect your name, email address, phone number, and company details.
                </div>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-4 h-4 bg-brand-pink border-2 border-black mr-4 mt-1.5 flex-shrink-0"></span>
                <div>
                  <strong className="text-black font-bold">Usage Data:</strong> We collect non-identifiable information about how visitors interact with our website (e.g., browser type, pages visited) to optimize our user experience and site performance.
                </div>
              </li>
            </ul>

            <h2 className="text-2xl md:text-3xl mt-12 mb-6 border-b-4 border-black pb-2 inline-block">2. How We Use Your Information</h2>
            <p className="mb-4 font-inter">We use the collected information to:</p>
            <ul className="space-y-3 font-inter text-gray-800 list-none pl-0">
              {[
                "Provide, manage, and scale our digital services.",
                "Communicate with you regarding projects, inquiries, or technical support.",
                "Send important updates, invoices, or marketing communications (which you can opt out of at any time).",
                "Improve our website functionality and service offerings."
              ].map((item, i) => (
                <li key={i} className="flex items-center">
                  <span className="inline-block w-3 h-3 bg-brand-cyan border-2 border-black mr-4 rounded-full"></span>
                  {item}
                </li>
              ))}
            </ul>

            <h2 className="text-2xl md:text-3xl mt-12 mb-6 border-b-4 border-black pb-2 inline-block">3. Data Sharing and Security</h2>
            <p className="font-inter text-gray-800 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share necessary data with trusted third-party tools (like hosting providers, cloud services, or payment processors) strictly to facilitate our work. We implement industry-standard security practices to protect your data from unauthorized access.
            </p>

            <h2 className="text-2xl md:text-3xl mt-12 mb-6 border-b-4 border-black pb-2 inline-block">4. Third-Party Links</h2>
            <p className="font-inter text-gray-800 leading-relaxed">
              Our website may contain links to client projects or third-party sites. We are not responsible for the privacy practices or content of these external sites.
            </p>

            <h2 className="text-2xl md:text-3xl mt-12 mb-6 border-b-4 border-black pb-2 inline-block">5. Contact Us</h2>
            <div className="bg-brand-bg-1 border-4 border-black p-6 shadow-[4px_4px_0_0_#000]">
              <p className="font-inter text-black font-bold mb-4">
                If you have any questions about this Privacy Policy or how we handle your data, please contact us at:
              </p>
              <div className="space-y-2 font-space font-bold uppercase">
                <p><span className="text-brand-blue">Email:</span> <a href="mailto:hello@deltax.agency" className="hover:underline">hello@deltax.agency</a></p>
                <p><span className="text-brand-pink">Address:</span> [Your Business Address]</p>
              </div>
            </div>

            <div className="mt-16 flex justify-center">
              <Link 
                href="/"
                className="inline-block px-8 py-4 bg-black text-white font-space font-black uppercase tracking-wider border-4 border-black hover:bg-brand-yellow hover:text-black transition-all hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
