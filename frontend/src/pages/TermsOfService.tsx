import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { FileText, Cpu, Receipt, ShieldAlert, Award, AlertTriangle, Key, Ban, ExternalLink, Mail, Phone } from "lucide-react";
import { envConfig } from "../config/env.config";

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden font-sans text-gray-900 pb-24">
      <SEO
        title="Terms of Service"
        description="Terms of Service for Coreslash Technologies. Learn about our service scope, payment terms, code ownership, and usage guidelines."
      />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-16 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-6"
        >
          <FileText className="w-4 h-4 text-secondary-indigo" />
          <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">Service Agreement</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900"
        >
          Terms of <span className="text-gradient-cyan">Service</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm md:text-base text-gray-500 font-medium"
        >
          Last Updated: June 23, 2026 • Effective Date: June 23, 2026
        </motion.p>
      </section>

      {/* Main Content Layout - Centered Full-Width Card */}
      <div className="max-w-4xl mx-auto px-6">
        <main className="space-y-10">
          <div className="bg-white border border-gray-200 shadow-xl shadow-gray-200/30 rounded-[2.5rem] p-8 md:p-12 space-y-12">
            
            {/* Acceptance & Services */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">1. Acceptance of Terms & Services Scope</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  By engaging with Coreslash Technologies (the "Company", "we", "us", or "our"), signing a client contract, submitting inquiries through{" "}
                  <a
                    href={envConfig.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-indigo hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    coreslashtechnologies.com <ExternalLink className="w-3 h-3" />
                  </a>,
                  or using any of our services, you agree to be bound by these Terms of Service. If you do not accept these terms, you must refrain from utilizing our services.
                </p>
                <p>
                  Coreslash Technologies provides a range of professional IT services, including but not limited to: Custom Website Development, Mobile App Development, Artificial Intelligence & Machine Learning Integrations, E-Commerce Systems (Shopify/Custom), Search Engine Optimization (SEO) & Marketing, Cloud Infrastructure Setup, SCADA & Industrial Automation, and Business Automation Systems.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Project Execution */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">2. Project Execution & Client Cooperation</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Successful project delivery requires active collaboration. To ensure projects stay on schedule, the Client agrees to provide prompt feedback, text copy, graphic assets, brand guidelines, credentials, or API tokens as outlined in our project onboarding checklists.
                </p>
                <p>
                  We coordinate project releases through agile milestones. Any deviation or addition to the features outlined in the original Statement of Work (SOW) will be processed as a "Change Order" and may incur additional charges and timeline extensions.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Intellectual Property */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Key className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">3. Intellectual Property Rights & Code Ownership</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Unless otherwise agreed in a signed written contract, the assignment of Intellectual Property (IP) is structured as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Client Ownership:</strong> Upon successful receipt of all final payments, invoice completions, and project sign-offs, Coreslash Technologies assigns all intellectual property rights and codebase ownership of custom code specifically developed for the Client.</li>
                  <li><strong>Company Libraries:</strong> Coreslash Technologies retains proprietary rights over any pre-existing code blocks, internal configuration files, development frameworks, and automation scripts utilized during the development. We grant the Client a perpetual, royalty-free, non-exclusive license to use these embedded items within their specific project.</li>
                  <li><strong>Third-Party Components:</strong> Licenses for third-party libraries, APIs, widgets, or visual components (such as premium fonts or icons) are governed by their respective vendor licenses and remain the financial responsibility of the Client.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Payments & Invoicing */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">4. Payments, Milestones & Invoicing</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Our professional billing system is organized around clearly defined payment milestones. These terms ensure transparency:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Milestone Deposits:</strong> Projects typically require an upfront commitment fee or deposit before scheduling resources. The remaining milestones are billed upon completion of designated stages (e.g., Design Sign-off, Beta Release, Final Delivery).</li>
                  <li><strong>Invoicing Terms:</strong> Invoices are dispatched electronically and are due within 7 to 14 business days. Late payments may result in the suspension of active development, hosting servers, or digital support access.</li>
                  <li><strong>Refunds:</strong> Since custom development, engineering, and digital marketing services require immediate allocation of engineering hours, payments made for completed design/development milestones are non-refundable.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Limitation of Liability */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">5. Limitation of Liability</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CORESLASH TECHNOLOGIES BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, EXEMPLARY, PUNATIVE, OR CONSEQUENTIAL DAMAGES WHATSOEVER.
                </p>
                <p>
                  This includes, but is not limited to, damages for loss of profits, business interruptions, data corruption, server downtime, security breaches on third-party host architectures, or any other commercial losses, even if we have been advised of the possibility of such losses. Our total aggregate liability under these terms shall not exceed the total fees paid by the Client to the Company for the specific project during the three (3) months prior to the occurrence of the claim.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Acceptable Use Policy */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">6. Acceptable Use Policy</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Our services, servers, and digital environments must only be utilized for lawful purposes. You agree not to use our codebases or websites to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Promote unlawful actions, distribute fraudulent content, or host materials that violate intellectual property rights.</li>
                  <li>Transmit malicious malware, viruses, trojans, logic bombs, or participate in distributed denial-of-service (DDoS) campaigns.</li>
                  <li>Reverse-engineer, copy, or scrape our proprietary system interfaces, frameworks, and design grids.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Termination */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Ban className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">7. Termination of Engagements</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Either party may terminate a project contract if the other party commits a material breach of terms and fails to cure such breach within thirty (30) days of receiving written notice.
                </p>
                <p>
                  Upon termination, the Client is legally required to pay for all completed milestones and human-hours logged up to the date of termination. If terminated before completion, no IP transfer or codebase deployment will be executed, and all licenses granted hereunder will cease.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Governing Law */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">8. Governing Law & Jurisdiction</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  These Terms of Service, along with any separate project contracts, shall be governed by, construed, and enforced in accordance with the laws of the State of Karnataka, India, without regard to its principles of conflicts of law.
                </p>
                <p>
                  You agree that any legal action, dispute, or lawsuit arising out of or relating to these Terms or our Services must be filed exclusively in the courts located in Belgaum, Karnataka, India.
                </p>
                <p className="pt-4">
                  For questions regarding these terms, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 hover:border-secondary-indigo/25 transition-all">
                    <Mail className="w-5 h-5 text-secondary-indigo shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Email Us</p>
                      <a href={`mailto:${envConfig.contact.email}`} className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-secondary-indigo transition-colors">
                        {envConfig.contact.email}
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4 hover:border-secondary-indigo/25 transition-all">
                    <Phone className="w-5 h-5 text-secondary-indigo shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">WhatsApp Us</p>
                      <a href={`tel:${envConfig.social.whatsappPhone}`} className="text-xs sm:text-sm font-semibold text-gray-900 hover:text-secondary-indigo transition-colors">
                        {envConfig.social.whatsappPhone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
