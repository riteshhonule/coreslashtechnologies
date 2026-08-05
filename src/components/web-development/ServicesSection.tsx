import { motion } from "framer-motion";
import { 
  Building2, Briefcase, FileText, LayoutTemplate, ShoppingCart, 
  Globe, Layers3, Users, Workflow, Edit3, Link2, RefreshCw, Zap, Wrench, Search, ArrowUpRight 
} from "lucide-react";

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
}

const SERVICES: ServiceItem[] = [
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Corporate Website Development",
    description: "High-scale, secure, and robust digital platforms designed for large enterprise corporations.",
    colorClass: "from-blue-500/20 to-indigo-500/20 text-blue-500"
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: "Business Websites",
    description: "Convert visitors into long-term customers with high-conversion layouts customized for your industry.",
    colorClass: "from-cyan-500/20 to-teal-500/20 text-cyan-500"
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Landing Pages",
    description: "Single-page campaign sites built for speed, responsiveness, and maximizing sign-ups or product sales.",
    colorClass: "from-purple-500/20 to-pink-500/20 text-purple-500"
  },
  {
    icon: <LayoutTemplate className="w-5 h-5" />,
    title: "Portfolio Websites",
    description: "Visually stunning showcases designed to showcase agency, creative, or executive work with rich media.",
    colorClass: "from-blue-500/20 to-indigo-500/20 text-blue-500"
  },
  {
    icon: <ShoppingCart className="w-5 h-5" />,
    title: "Ecommerce Websites",
    description: "Fully featured online stores built to scale transactions safely with advanced analytics integrations.",
    colorClass: "from-emerald-500/20 to-green-500/20 text-emerald-500"
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "Custom Web Applications",
    description: "Dynamic software platforms custom-tailored to solve unique organizational operational workflows.",
    colorClass: "from-indigo-500/20 to-violet-500/20 text-indigo-500"
  },
  {
    icon: <Layers3 className="w-5 h-5" />,
    title: "SaaS Platforms",
    description: "Multi-tenant cloud applications optimized for recurring subscription workflows and secure APIs.",
    colorClass: "from-sky-500/20 to-blue-500/20 text-sky-500"
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "CRM Systems",
    description: "Custom customer relationship management dashboards for tracking user deals, history, and communications.",
    colorClass: "from-rose-500/20 to-red-500/20 text-rose-500"
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "ERP Systems",
    description: "Centralized enterprise resource planning tools to manage logistics, inventory, and employees.",
    colorClass: "from-violet-500/20 to-fuchsia-500/20 text-violet-500"
  },
  {
    icon: <Edit3 className="w-5 h-5" />,
    title: "CMS Development",
    description: "Tailored content management systems enabling non-technical teams to edit page copies in seconds.",
    colorClass: "from-lime-500/20 to-emerald-500/20 text-lime-500"
  },
  {
    icon: <Link2 className="w-5 h-5" />,
    title: "API Integration",
    description: "Secure, reliable pipelines linking your software with payment, tracking, and external SaaS gateways.",
    colorClass: "from-pink-500/20 to-rose-500/20 text-pink-500"
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Website Redesign",
    description: "Migrate legacy websites to modern frontend frameworks without losing search engine SEO authority.",
    colorClass: "from-blue-500/20 to-cyan-500/20 text-blue-500"
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Website Maintenance",
    description: "Ongoing monthly security patches, plugin updates, uptime monitoring, and visual adjustments.",
    colorClass: "from-slate-500/20 to-zinc-500/20 text-slate-500"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Performance Optimization",
    description: "Boost core web vitals, speed scores, and client load times using cutting-edge caching configurations.",
    colorClass: "from-yellow-500/20 to-amber-500/20 text-yellow-500"
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "SEO Optimization",
    description: "Implement structured page semantics, JSON sitemaps, speed assets, and layouts tuned for high Google rankings.",
    colorClass: "from-purple-500/20 to-indigo-500/20 text-purple-500"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden">
      {/* Title with left accent vertical border */}
      <div className="flex flex-col items-start gap-4 mb-16">
        <div className="flex items-center">
          <div className="w-[3px] h-6 bg-blue-600 dark:bg-blue-500 rounded-full mr-3" />
          <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Service Categories
          </h3>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Comprehensive Web Engineering Categories
        </h2>
      </div>

      {/* Grid containing the cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
            whileHover={{ y: -6 }}
            className="group relative p-6 rounded-2xl bg-card border border-border/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(59,130,246,0.08)] hover:border-blue-500/20 dark:hover:border-blue-500/10 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Top Border Glow Highlight on Hover */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />

            <div>
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${service.colorClass} flex items-center justify-center mb-5 shrink-0`}>
                {service.icon}
              </div>

              {/* Title */}
              <h4 className="text-base font-bold text-foreground mb-2 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h4>

              {/* Description */}
              <p className="text-muted-foreground text-xs leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            {/* Learn More link indicator */}
            <div className="flex items-center gap-1.5 text-blue-500 text-xs font-semibold select-none mt-auto">
              <span>Learn more</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
