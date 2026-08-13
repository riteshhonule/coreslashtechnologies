import {
  Code,
  Settings,
  Monitor,
  Search,
  Megaphone,
  PenTool,
  User,
  Briefcase
} from "lucide-react";

export default function WhoCanPartnerSection() {
  const categories = [
    { id: "01", name: "Software Companies", icon: <Code className="w-5 h-5 stroke-[1.5]" /> },
    { id: "02", name: "IT Consultants", icon: <Settings className="w-5 h-5 stroke-[1.5]" /> },
    { id: "03", name: "Digital & Web Agencies", icon: <Monitor className="w-5 h-5 stroke-[1.5]" /> },
    { id: "04", name: "SEO Agencies", icon: <Search className="w-5 h-5 stroke-[1.5]" /> },
    { id: "05", name: "Marketing Agencies", icon: <Megaphone className="w-5 h-5 stroke-[1.5]" /> },
    { id: "06", name: "Branding & Creative Agencies", icon: <PenTool className="w-5 h-5 stroke-[1.5]" /> },
    { id: "07", name: "Freelancers", icon: <User className="w-5 h-5 stroke-[1.5]" /> },
    { id: "08", name: "Business Consultants", icon: <Briefcase className="w-5 h-5 stroke-[1.5]" /> },
  ];

  return (
    <section className="relative w-full text-slate-900 py-20 md:py-24 px-6 sm:px-12 lg:px-16 font-sans overflow-hidden">
      {/* Background Image & Soft Blur Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt="Corporate business team collaborating"
          className="w-full h-full object-cover object-center blur-sm opacity-95 scale-110"
        />
        {/* Darker overlay to ensure text readability without being glaringly white */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300/95 via-slate-800/85 to-slate-300/95" />
      </div>

      <div className="relative z-10 max-w-[1140px] mx-auto">

        {/* SECTION HEADER */}
        <div className="mb-14 md:mb-20 max-w-3xl">
          <h2
            style={{ fontFamily: "Cambria, Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight mb-5"
          >
            Who Can Partner With CoreSlash?
          </h2>
          <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
            Whether you are an agency, consultant, software company or independent professional, CoreSlash can extend your technical capabilities and help you take on more opportunities.
          </p>
        </div>

        {/* 4x2 GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 group/grid">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="group/card flex flex-col p-6 rounded-2xl border border-white/60 bg-white/40 backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all duration-500 cursor-pointer relative group-hover/grid:scale-[0.96] group-hover/grid:opacity-60 group-hover/grid:blur-[1.5px] hover:!scale-110 hover:!opacity-100 hover:!blur-none hover:z-30 hover:shadow-[0_20px_50px_rgba(23,105,232,0.2)] hover:!bg-white/95 hover:!border-white"
            >
              {/* Subtle ambient liquid blue glow inside the card on hover */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#1769E8]/0 via-[#1769E8]/5 to-[#1769E8]/0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl rounded-3xl" />

              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="text-slate-100 group-hover/card:text-[#1769E8] transition-all duration-500 transform group-hover/card:-translate-y-1">
                  {cat.icon}
                </div>
                <span className="text-slate-100 group-hover/card:text-[#1769E8]/70 text-xs font-semibold tracking-widest transition-colors duration-300">
                  {cat.id}
                </span>
              </div>

              <h3
                style={{ fontFamily: "Cambria, Georgia, serif" }}
                className="text-[25px] font-bold text-[#0B1738] mb-4 group-hover/card:text-[#1769E8] transition-colors duration-300 relative z-10"
              >
                {cat.name}
              </h3>

              <div className="w-4 h-[1.5px] bg-[#1769E8]/40 group-hover/card:bg-[#1769E8] group-hover/card:w-8 transition-all duration-500 relative z-10" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
