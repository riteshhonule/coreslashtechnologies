import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { 
  Settings, Building, Cpu, IterationCw, Layers, 
  ShieldCheck, Zap, HeartHandshake, MessageSquare 
} from "lucide-react";

interface FeatureItem {
  icon: ReactNode;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Custom Solutions",
    description: "No generic templates or quick builders. We code custom-fit web platforms matching your specific enterprise operational logic."
  },
  {
    icon: <Building className="w-5 h-5" />,
    title: "Enterprise Architecture",
    description: "Built using robust design patterns, decoupled microservices, and reliable, scalable layout layers."
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Modern Technologies",
    description: "We code using state-of-the-art frameworks including React 19, NestJS, TypeScript, and AWS cloud tools."
  },
  {
    icon: <IterationCw className="w-5 h-5" />,
    title: "Agile Development",
    description: "Follow structural sprint plans, staging environment releases, and interactive progress demos."
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Scalable Systems",
    description: "Database-optimized structures designed to process thousands of concurrent user queries with low lag."
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Secure Development",
    description: "Equipped with built-in CSRF, XSS, and SQL injection protections to ensure your databases remain completely secure."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Fast Delivery",
    description: "Utilize parallel frontend/backend pipelines to ship production-ready portals inside agreed timelines."
  },
  {
    icon: <HeartHandshake className="w-5 h-5" />,
    title: "Long-Term Support",
    description: "Ongoing SLA contract support, server health monitoring, database backups, and feature expansion modules."
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Transparent Communication",
    description: "Direct Slack or Microsoft Teams channels linking your leads with our developers for fast query resolution."
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      {/* Title with left accent vertical border */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="flex items-center">
          <div className="w-[3px] h-6 bg-blue-600 dark:bg-blue-500 rounded-full mr-3" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Why Choose CoreSlash
          </h3>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Engineering Excellence at Every Step
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-card border border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:shadow-[0_12px_30px_rgba(59,130,246,0.06)] hover:border-blue-500/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-5 shrink-0">
                {feature.icon}
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">{feature.title}</h4>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
