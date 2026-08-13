import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

const partnerFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about partnering with CoreSlash Technologies.",
  rows: [
    {
      id: "row1",
      speed: "50s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "Do you work with agencies?",
          answer: "Yes. CoreSlash works with digital agencies, web agencies, SEO agencies, marketing companies, consultants, software companies, and other organizations that require technical delivery support.",
        },
        {
          id: "q2",
          question: "Can CoreSlash work under our brand?",
          answer: "Yes. CoreSlash can support white-label development arrangements where CoreSlash works behind the scenes as your technical delivery partner.",
        },
        {
          id: "q3",
          question: "Who owns the client relationship?",
          answer: "The partnership model can be structured so that you remain responsible for the client relationship while CoreSlash handles the agreed technical execution.",
        },
        {
          id: "q4",
          question: "Can we start with a single project?",
          answer: "Yes. You can start with a single project and explore a longer-term partnership based on the experience.",
        },
      ],
    },
    {
      id: "row2",
      speed: "45s",
      direction: "right",
      faqItems: [
        {
          id: "q5",
          question: "Can you work with our existing developers?",
          answer: "Yes. CoreSlash can work as an extension of your existing team and collaborate with your developers where required.",
        },
        {
          id: "q6",
          question: "Do you sign NDAs?",
          answer: "Yes. Confidentiality and NDA arrangements can be discussed based on the partnership and project requirements.",
        },
        {
          id: "q7",
          question: "What types of projects do you accept?",
          answer: "CoreSlash supports websites, custom software, APIs, AI automation, ERP/CRM solutions, technical SEO, website maintenance, and other software engineering requirements.",
        },
        {
          id: "q8",
          question: "How quickly can you respond to a new requirement?",
          answer: "CoreSlash's target is to provide an initial response within 24 hours for project and partnership inquiries.",
        },
      ],
    },
  ],
};

export default function PartnerFaqSection() {
  return (
    <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
      <FaqSection data={partnerFaqData} />
    </section>
  );
}
