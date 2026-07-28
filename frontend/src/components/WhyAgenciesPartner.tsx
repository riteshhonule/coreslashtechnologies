import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  UserCheck, 
  Briefcase, 
  Users, 
  Clock, 
  Zap, 
  Code, 
  CheckCircle2 
} from "lucide-react";

const points = [
  {
    title: "White-Label Delivery",
    desc: "Completely invisible commits, generic email addresses, and zero branded markers. We remain in the background.",
    icon: ShieldCheck,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-600 border-blue-200/50 shadow-blue-500/5"
  },
  {
    title: "NDA Friendly Protocol",
    desc: "We sign strict Non-Disclosure Agreements upfront. Your agency's intellectual property and client files are secure.",
    icon: UserCheck,
    color: "from-purple-500/10 to-pink-500/10 text-purple-600 border-purple-200/50 shadow-purple-500/5"
  },
  {
    title: "Your Brand First",
    desc: "Your clients stay 100% yours. We never contact your end-clients directly unless you explicitly ask us to represent you.",
    icon: Briefcase,
    color: "from-amber-500/10 to-orange-500/10 text-amber-600 border-amber-200/50 shadow-amber-500/5"
  },
  {
    title: "Dedicated Developers",
    desc: "Secure senior engineer squads (React, NestJS, Python) that integrate seamlessly into your Slack or Teams channels.",
    icon: Users,
    color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-200/50 shadow-emerald-500/5"
  },
  {
    title: "Fast Response SLAs",
    desc: "Daily asynchronous updates and sub-24h response windows. We operate at your velocity to keep projects moving.",
    icon: Clock,
    color: "from-rose-500/10 to-red-500/10 text-rose-600 border-rose-200/50 shadow-rose-500/5"
  },
  {
    title: "Flexible Team Scaling",
    desc: "Scale your dedicated development capacity up or down dynamically with a simple 30-day notice framework.",
    icon: Zap,
    color: "from-cyan-500/10 to-sky-500/10 text-cyan-600 border-cyan-200/50 shadow-cyan-500/5"
  },
  {
    title: "Deep Technical Expertise",
    desc: "From complex database index tuning to AI workflow agent architectures, we write production-grade, secure code.",
    icon: Code,
    color: "from-indigo-500/10 to-violet-500/10 text-indigo-600 border-indigo-200/50 shadow-indigo-500/5"
  },
  {
    title: "Reliable Sprints",
    desc: "Structured bi-weekly Agile releases, thorough code reviews, and automated linting & testing pipelines.",
    icon: CheckCircle2,
    color: "from-teal-500/10 to-emerald-500/10 text-teal-600 border-teal-200/50 shadow-teal-500/5"
  }
];

export default function WhyAgenciesPartner() {
  return (
    <section className="py-16 md:py-28 relative z-10 bg-white border-b border-gray-200/60">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808003_1px,transparent_1px),linear-gradient(to_bottom,#80808003_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B21F4]/5 border border-[#5B21F4]/15 mb-6">
            <span className="text-xs font-bold text-[#5B21F4] uppercase tracking-widest">Invisible Operations</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Why Digital Agencies Partner <br />
            with <span className="text-gradient-purple">CoreSlash Technologies</span>
          </h2>
          <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
            We operate in the background as your silent engineering backbone, enabling you to take on more complex contracts, meet aggressive milestones, and scale revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, idx) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 1, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0, margin: "100px" }}
                transition={{ delay: idx * 0.04, duration: 0.4 }}
                className="group relative bg-[#F9FAFB]/60 hover:bg-white p-8 rounded-3xl border border-gray-200/50 hover:border-secondary-indigo/20 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/30 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br border flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 ${point.color}`}>
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  <h3 className="font-bold text-gray-950 text-lg mb-3 tracking-tight group-hover:text-secondary-indigo transition-colors">{point.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed font-semibold">{point.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
