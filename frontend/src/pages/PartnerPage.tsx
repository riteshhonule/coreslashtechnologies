import { Helmet } from "react-helmet-async";
import PartnerHero from "@/components/PartnerHero";
import WhyPartnerSection from "@/components/WhyPartnerSection";
import PartnerDeliverSection from "@/components/PartnerDeliverSection";
import WhoCanPartnerSection from "@/components/WhoCanPartnerSection";

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[#070b0a] transition-colors duration-300">
      <Helmet>
        <title>Partner With CoreSlash | CoreSlash Technologies Partner Program</title>
        <meta
          name="description"
          content="Have a client requirement, software project, website project, or digital transformation opportunity? Partner with CoreSlash for technical expertise and delivery capabilities."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/partner" />
      </Helmet>

      {/* Hero Section */}
      <PartnerHero />

      {/* Why Partner Section */}
      <WhyPartnerSection />

      {/* Who Can Partner With Us Section */}
      <WhoCanPartnerSection />

      {/* What We Can Deliver Section */}
      <PartnerDeliverSection />
    </div>
  );
}
