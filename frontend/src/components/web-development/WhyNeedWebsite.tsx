import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Cpu, Award, Smile, Search, TrendingUp, Sparkles } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="p-6 rounded-2xl bg-card border border-border/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_30px_rgba(59,130,246,0.08)] hover:border-blue-500/30 dark:hover:border-blue-500/20 transition-all duration-300 flex items-start gap-4"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-bold text-foreground mb-1.5">{title}</h4>
        <p className="text-muted-foreground text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

export default function WhyNeedWebsite() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Establish High Credibility",
      description: "A secure, polished website forms the first impression of trust and authority for enterprise clients.",
      delay: 0.1
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Accelerate Lead Generation",
      description: "Convert traffic into qualified enterprise opportunities through highly optimized user landing funnels.",
      delay: 0.2
    },
    {
      icon: <Cpu className="w-5 h-5" />,
      title: "Business Process Automation",
      description: "Integrate ERP/CRM sync, scheduling, and billing flows to automate backend operations.",
      delay: 0.3
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Consistent Global Branding",
      description: "Project an innovative, unified visual identity that communicates your core values to partners.",
      delay: 0.4
    },
    {
      icon: <Smile className="w-5 h-5" />,
      title: "Superb Customer Experience",
      description: "Smooth animations, fast loads, and layouts that ensure customers find what they need in seconds.",
      delay: 0.5
    },
    {
      icon: <Search className="w-5 h-5" />,
      title: "Built-In SEO Optimization",
      description: "Clean semantic HTML structures designed to align perfectly with Google search indexing algorithms.",
      delay: 0.6
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "Infinite Scalability",
      description: "Architected to manage sudden traffic spikes, allowing your company to scale without performance loss.",
      delay: 0.7
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left column heading/text */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Growth</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Why Your Business Needs a Professional Web Presence
          </h2>
          
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            In the modern digital landscape, your website functions as the absolute core of your operations. A generic or slow site actively costs client trust, lead opportunities, and search rankings. CoreSlash builds enterprise-grade architectures that turn your web presence into an automated growth engine.
          </p>

          <div className="p-6 rounded-2xl bg-gradient-to-tr from-blue-600/10 via-indigo-600/10 to-purple-600/10 border border-blue-500/20 backdrop-blur-md">
            <h4 className="text-base font-bold text-foreground mb-2">94% of First Impressions</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Are design-related. Users decide whether to trust a business within 0.05 seconds of landing on their website. Premium design is not an option—it is the foundation of trust.
            </p>
          </div>
        </div>

        {/* Right column benefits grid */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
          {benefits.map((b) => (
            <BenefitCard
              key={b.title}
              icon={b.icon}
              title={b.title}
              description={b.description}
              delay={b.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
