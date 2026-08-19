import { Helmet } from "react-helmet-async";
import PartnerHero from "@/components/PartnerHero";
import WhyPartnerSection from "@/components/WhyPartnerSection";
import PartnerDeliverSection from "@/components/PartnerDeliverSection";
import WhoCanPartnerSection from "@/components/WhoCanPartnerSection";
import PartnershipModelsSection from "@/components/PartnershipModelsSection";
import WhiteLabelPartnershipSection from "@/components/WhiteLabelPartnershipSection";
import PartnershipPrinciplesSection from "@/components/PartnershipPrinciplesSection";
import PartnerFaqSection from "@/components/PartnerFaqSection";
import PartnerTechnologyStackSection from "@/components/PartnerTechnologyStackSection";
import CTASection from "@/components/web-development/CTASection";

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Helmet>
        <title>Partner With CoreSlash | CoreSlash Technologies Partner Program</title>
        <meta
          name="description"
          content="Partner with CoreSlash Technologies for agency white-label software engineering, sub-contracting, and full-stack technical delivery capabilities."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/partner" />

        {/* Open Graph SEO */}
        <meta property="og:title" content="Partner With CoreSlash | CoreSlash Technologies Partner Program" />
        <meta property="og:description" content="Partner with CoreSlash Technologies for agency white-label software engineering, sub-contracting, and full-stack technical delivery capabilities." />
        <meta property="og:url" content="https://coreslashtechnologies.com/partner" />
        <meta property="og:type" content="website" />

        {/* Twitter Card SEO */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Partner With CoreSlash | CoreSlash Technologies Partner Program" />
        <meta name="twitter:description" content="Partner with CoreSlash Technologies for agency white-label software engineering, sub-contracting, and full-stack technical delivery capabilities." />
      </Helmet>

      {/* Hero Section */}
      <PartnerHero />

      {/* Why Partner Section */}
      <WhyPartnerSection />

      {/* Who Can Partner With Us Section */}
      <WhoCanPartnerSection />

      {/* What We Can Deliver Section */}
      <PartnerDeliverSection />

      {/* 6. Partnership Models Section */}
      <PartnershipModelsSection />

      {/* White-Label Partnership Section */}
      <WhiteLabelPartnershipSection />

      {/* Partnership Principles Section */}
      <PartnershipPrinciplesSection />

      {/* Technology Stack Section */}
      <PartnerTechnologyStackSection />

      {/* FAQ Section */}
      <PartnerFaqSection />



      {/* CTA Section */}
      <CTASection
        badge="GROW WITH CORESLASH"
        title="Ready to Expand Your Technical Capabilities?"
        subtitle="Whether you have an immediate client requirement or want to establish a long-term technical delivery partnership, CoreSlash is ready to execute."
        primaryBtnText="Become a Partner"
        secondaryBtnText="Schedule Strategy Call"
        primaryBtnLink="/partner-form"
        secondaryBtnLink="/contact"
      />
    </div>
  );
}




