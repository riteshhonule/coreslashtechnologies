import FaqSection, { type FaqData } from "@/components/ui/habit-faq-scroller";

const webDevFaqData: FaqData = {
  mainTitle: "Frequently Asked Questions",
  mainSubtitle: "Everything you need to know about CoreSlash's web development process, tech stack, and service deliverables.",
  rows: [
    {
      id: "row1",
      speed: "55s",
      direction: "left",
      faqItems: [
        {
          id: "q1",
          question: "What web development services do you offer?",
          answer: "CoreSlash offers custom web applications, headless e-commerce, SaaS platform engineering, enterprise dashboards, custom CRM/ERP solutions, and database design."
        },
        {
          id: "q2",
          question: "How long does a website take?",
          answer: "Corporate portals take 4-6 weeks, while complex SaaS platforms and headless e-commerce engines take 8-12 weeks from discovery to deployment."
        },
        {
          id: "q3",
          question: "Which technologies do you use?",
          answer: "CoreSlash's frontend centers on React, Next.js, and Tailwind CSS. Backends use NestJS (Node.js) and Django. Databases include PostgreSQL, Redis, and MongoDB."
        }
      ]
    },
    {
      id: "row2",
      speed: "42s",
      direction: "right",
      faqItems: [
        {
          id: "q4",
          question: "Can you redesign an existing website?",
          answer: "Yes, CoreSlash specializes in legacy migration. CoreSlash redesigns frontend UI, refactor backend code for faster response times, and migrate databases with zero downtime."
        },
        {
          id: "q5",
          question: "Do you provide SEO optimization?",
          answer: "Yes, SEO is built into CoreSlash's core process: HTML5 semantic markup, structured JSON-LD schema data, image asset optimization, and canonical metadata tags."
        },
        {
          id: "q6",
          question: "Are your platforms responsive and mobile-friendly?",
          answer: "Absolutely. All web apps are mobile-first responsive, ensuring pixel-perfect rendering across all device screens from smartphones to 4K monitors."
        }
      ]
    },
    {
      id: "row3",
      speed: "60s",
      direction: "left",
      faqItems: [
        {
          id: "q7",
          question: "How do you handle security?",
          answer: "CoreSlash enforce HTTPS/SSL, CSRF and XSS protection headers, secure user auth with JWT/OAuth 2.0, SQL injection prevention, and cloud firewall layers."
        },
        {
          id: "q8",
          question: "Do you offer post-launch support & maintenance?",
          answer: "Yes, CoreSlash's ongoing SLA contracts covers proactive security patches, monthly upgrades, database backups, performance monitoring, and server checks."
        },
        {
          id: "q9",
          question: "Can you integrate payment gateways?",
          answer: "Yes, CoreSlash integrates payment processors like Stripe, PayPal, Razorpay, and Authorize.net with automated recurring billing for SaaS models."
        }
      ]
    }
  ]
};

export default function FAQAccordion() {
  return (
    <section className="w-full py-16 md:py-24 border-t border-border/40 overflow-hidden bg-background">
      <FaqSection data={webDevFaqData} />
    </section>
  );
}
