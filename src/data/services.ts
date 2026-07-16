import { Monitor, PenTool, Fingerprint, Bot, Smartphone, Cloud, TrendingUp, Server } from "lucide-react";

export const services = [
  { 
    slug: "website-development",
    icon: Monitor, 
    title: "Website Development", 
    desc: "High-performance, accessible, and SEO-optimized web experiences.",
    features: [
      { title: "Custom Web Applications", detail: "We build highly interactive and dynamic web applications tailored to your specific business logic, using modern frameworks like React and Next.js." },
      { title: "E-Commerce Solutions", detail: "Robust, scalable, and secure online stores designed to maximize conversion rates and provide seamless shopping experiences." },
      { title: "CMS Development", detail: "Flexible content management systems (like Sanity or WordPress) that give your team complete control over your website's content without needing code." },
      { title: "Performance Optimization", detail: "Lightning-fast page loads and perfect Core Web Vitals scores to ensure the best user experience and SEO rankings." }
    ]
  },
  { 
    slug: "ui-ux-design",
    icon: PenTool, 
    title: "UI/UX Design", 
    desc: "Intuitive interfaces and engaging user experiences.",
    features: [
      { title: "User Research & Strategy", detail: "Deep-dive analysis into your target audience to understand their needs, pain points, and behaviors." },
      { title: "Wireframing & Prototyping", detail: "Iterative design process starting from low-fidelity wireframes to interactive high-fidelity prototypes." },
      { title: "Visual Design Systems", detail: "Comprehensive, scalable design systems ensuring consistency across all your digital touchpoints." },
      { title: "Usability Testing", detail: "Rigorous testing with real users to identify friction points and optimize the user journey." }
    ]
  },
  { 
    slug: "brand-identity",
    icon: Fingerprint, 
    title: "Brand Identity", 
    desc: "Memorable brand assets and cohesive visual systems.",
    features: [
      { title: "Logo & Identity Systems", detail: "Distinctive and scalable logo designs that form the foundation of your brand's visual identity." },
      { title: "Brand Guidelines", detail: "Extensive rulebooks covering typography, color palettes, spacing, and tone of voice to keep your brand aligned." },
      { title: "Typography & Color Palettes", detail: "Carefully curated fonts and colors that evoke the right emotions and align with your brand's core values." },
      { title: "Marketing Collateral", detail: "Beautifully designed physical and digital assets, from business cards to social media templates." }
    ]
  },
  { 
    slug: "ai-automation",
    icon: Bot, 
    title: "AI Automation", 
    desc: "Intelligent workflows that scale your business operations.",
    features: [
      { title: "Custom AI Chatbots", detail: "Intelligent conversational agents capable of handling customer support, lead generation, and complex queries 24/7." },
      { title: "Workflow Automation", detail: "Connecting your software stack (Zapier, Make, custom scripts) to eliminate manual data entry and repetitive tasks." },
      { title: "Machine Learning Integration", detail: "Integrating predictive models and AI APIs (like OpenAI) to bring advanced capabilities to your existing products." },
      { title: "Data Analysis & Insights", detail: "Automated pipelines that digest raw data and output actionable business intelligence and reports." }
    ]
  },
  { 
    slug: "app-development",
    icon: Smartphone, 
    title: "App Development", 
    desc: "Native and cross-platform mobile applications.",
    features: [
      { title: "iOS & Android Apps", detail: "High-quality mobile applications built for the App Store and Google Play, ensuring native-like performance." },
      { title: "React Native Development", detail: "Cost-effective cross-platform development that shares a single codebase without sacrificing user experience." },
      { title: "App Store Optimization", detail: "Strategic positioning, keyword optimization, and stunning assets to help your app rank higher and get more downloads." },
      { title: "Maintenance & Support", detail: "Ongoing updates, bug fixes, and feature additions to keep your app running smoothly as OS versions evolve." }
    ]
  },
  { 
    slug: "cloud-solutions",
    icon: Cloud, 
    title: "Cloud Solutions", 
    desc: "Scalable infrastructure and cloud-native architecture.",
    features: [
      { title: "AWS/Azure/GCP Setup", detail: "Expert configuration and deployment of your infrastructure on leading cloud providers." },
      { title: "Serverless Architecture", detail: "Highly scalable and cost-efficient backends that automatically scale from zero to millions of requests." },
      { title: "Database Migration", detail: "Seamless, zero-downtime migrations of your critical data from legacy systems to modern cloud databases." },
      { title: "Security & Compliance", detail: "Hardening your cloud environments to meet industry standards and protect against modern cyber threats." }
    ]
  },
  { 
    slug: "marketing",
    icon: TrendingUp, 
    title: "Marketing", 
    desc: "Data-driven strategies for digital growth.",
    features: [
      { title: "SEO & SEM", detail: "Comprehensive search engine optimization and targeted paid search campaigns to drive high-intent traffic." },
      { title: "Social Media Campaigns", detail: "Engaging, creative, and highly targeted advertising across platforms like Meta, LinkedIn, and TikTok." },
      { title: "Content Marketing", detail: "High-value blog posts, whitepapers, and videos designed to establish authority and nurture leads." },
      { title: "Analytics & Reporting", detail: "Custom dashboards and deep-dive analytics to track ROI and continuously refine marketing strategies." }
    ]
  },
  { 
    slug: "hosting",
    icon: Server, 
    title: "Hosting", 
    desc: "Secure, reliable, and lightning-fast hosting solutions.",
    features: [
      { title: "Managed Cloud Hosting", detail: "Enterprise-grade hosting solutions where we handle all the server management, updates, and optimization." },
      { title: "CDN Integration", detail: "Global content delivery networks to ensure your assets load instantly for users anywhere in the world." },
      { title: "24/7 Monitoring", detail: "Continuous uptime tracking and performance monitoring with automated alerts for immediate incident response." },
      { title: "Automated Backups", detail: "Secure, off-site daily backups to ensure your data is never lost and can be restored in minutes." }
    ]
  }
];
