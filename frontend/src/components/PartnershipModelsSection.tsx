import { ServiceCard } from "@/components/ui/service-card";

export default function PartnershipModelsSection() {
  const models = [
    {
      title: "Project-Based",
      description: "For specific client projects.",
      href: "/contact?model=project-based",
      imgSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-DFiJBJyUFg9QYTZOWEFeeza18HBnty.png&w=320&q=75",
      imgAlt: "Project-Based Partnership illustration",
      variant: "red" as const,
    },
    {
      title: "White-Label",
      description: "Your client. Your brand. Our technology.",
      href: "/contact?model=white-label",
      imgSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-SxvnIpN2RVwLK77XxK3MnVCU6Xgc29.png&w=320&q=75",
      imgAlt: "White-Label Partnership illustration",
      variant: "default" as const,
    },
    {
      title: "Dedicated Engineering",
      description: "Ongoing access to technical resources.",
      href: "/contact?model=dedicated-engineering",
      imgSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-J7XYh5Cix5CceVeAtkuVXYSGgrhjDL.png&w=320&q=75",
      imgAlt: "Dedicated Engineering Partnership illustration",
      variant: "gray" as const,
    },
    {
      title: "Referral Partnership",
      description: "Introduce opportunities that require technology expertise.",
      href: "/contact?model=referral-partnership",
      imgSrc: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-nY3Stc1545aP21dAi1IEbYlnc4rovS.png&w=320&q=75",
      imgAlt: "Referral Partnership illustration",
      variant: "blue" as const,
    },
  ];

  return (
    <section className="w-full bg-slate-900 text-white py-20 md:py-28 px-6 sm:px-12 lg:px-16 font-sans relative overflow-hidden">
      {/* Background Decorative Ambient Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1280px] mx-auto relative z-10">

        {/* SECTION HEADER */}
        <div className="flex flex-col items-start mb-12 md:mb-16">
          <div className="flex items-center mb-4">
            <div className="w-[3px] h-6 bg-[#1769E8] rounded-full mr-3" />
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1769E8]"
              style={{ fontFamily: "Cambria, Georgia, serif" }}
            >
              ENGAGEMENT OPTIONS
            </span>
          </div>

          <h2
            style={{ fontFamily: "Cambria, Georgia, serif" }}
            className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-tight max-w-3xl"
          >
            Partnership Models
          </h2>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-2xl font-sans">
            Client-aligned partnership structures tailored to your project scope, engineering scale, and release timelines.
          </p>
        </div>

        {/* 4 CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {models.map((model) => (
            <ServiceCard
              key={model.title}
              title={model.title}
              description={model.description}
              href={model.href}
              imgSrc={model.imgSrc}
              imgAlt={model.imgAlt}
              variant={model.variant}
              className="min-h-[220px]"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
