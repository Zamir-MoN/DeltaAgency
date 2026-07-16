import { notFound } from "next/navigation";
import { services } from "../../../data/services";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import FeatureGrid from "../../../components/FeatureGrid";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetail({ params }: { params: Params }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 md:px-12 bg-brand-bg-1 bg-dots">
      <div className="container mx-auto max-w-4xl">
        <Link 
          href="/#services"
          className="inline-flex items-center gap-2 font-space font-bold uppercase mb-8 border-b-4 border-transparent hover:border-black transition-colors"
        >
          <ArrowLeft size={20} strokeWidth={3} />
          Back to Services
        </Link>
        
        <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] p-8 md:p-12 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12 pb-12 border-b-4 border-black">
            <div className="w-24 h-24 bg-brand-yellow border-4 border-black flex flex-shrink-0 items-center justify-center shadow-[4px_4px_0_0_#000]">
              <Icon size={48} className="text-black" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-space font-black uppercase tracking-tight mb-4">
                {service.title}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-black">
                {service.desc}
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-space font-black uppercase mb-8">What&apos;s Included</h2>
          
          <FeatureGrid features={service.features} serviceTitle={service.title} />

          <div className="bg-brand-blue text-white border-4 border-black p-8 md:p-12 shadow-[8px_8px_0_0_#000] text-center">
            <h2 className="text-3xl font-space font-black uppercase mb-4">Ready to start?</h2>
            <p className="text-lg mb-8 font-medium">Let&apos;s discuss how our {service.title} expertise can help your business grow.</p>
            <Link 
              href="/#contact"
              className="inline-block py-4 px-8 text-center font-space font-black uppercase tracking-wider transition-all duration-200 border-4 border-black bg-brand-yellow text-black hover:shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:-translate-x-1"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
