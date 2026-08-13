import { ArrowRight } from "lucide-react";

export default function WhyPartnerSection() {
  const benefits = [
    {
      id: "01",
      tag: "SERVICES",
      title: "Expand Your Services",
      description: "Offer technology solutions without building an in-house team.",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "02",
      tag: "CAPACITY",
      title: "Increase Project Capacity",
      description: "Take on more projects with additional engineering support.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "03",
      tag: "EXPERTISE",
      title: "Technical Expertise",
      description: "Access experienced developers across modern technologies.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "04",
      tag: "DELIVERY",
      title: "Faster Delivery",
      description: "Get projects developed and delivered efficiently.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "05",
      tag: "WHITE-LABEL",
      title: "White-Label Support",
      description: "CoreSlash can work behind your brand seamlessly.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "06",
      tag: "SUPPORT",
      title: "Long-Term Support",
      description: "Continue with maintenance, development and technical support.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="w-full bg-white text-slate-900 py-20 md:py-24 px-6 sm:px-12 lg:px-16 font-sans">
      <div className="max-w-[1140px] mx-auto">

        {/* SECTION HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 md:mb-14">
          <h2
            style={{ fontFamily: "Cambria, Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-slate-900 tracking-tight"
          >
            Why Partner With CoreSlash?
          </h2>
          <a
            href="/services"
            className="group inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase text-slate-600 hover:text-slate-900 transition-colors"
          >
            VIEW ALL
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* BENEFIT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image */}
              <div className="w-full aspect-[2/1] overflow-hidden mb-5 bg-slate-100">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Editorial Category Label & Number */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1.5px] bg-[#1769E8]" />
                  <span
                    style={{ fontFamily: "Cambria, Georgia, serif" }}
                    className="text-[#0B1738] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
                  >
                    {benefit.tag}
                  </span>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm font-semibold tracking-widest">
                  {benefit.id}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3
                  style={{ fontFamily: "Cambria, Georgia, serif" }}
                  className="text-lg sm:text-xl font-bold text-[#0B1738] mb-2 leading-snug group-hover:text-[#1769E8] transition-colors"
                >
                  {benefit.title}
                </h3>
                {/* Styled somewhat like the author text in the design */}
                <div className="flex items-center gap-2 mt-3 text-slate-500 text-sm">

                  <p className="font-medium">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
