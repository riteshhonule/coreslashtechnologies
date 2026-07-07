import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { Shield, Eye, Database, Lock, Users, Globe, UserCheck, Mail, Phone, ExternalLink } from "lucide-react";
import { envConfig } from "../config/env.config";

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden font-sans text-gray-900 pb-24">
      <SEO
        title="Privacy Policy"
        description="Privacy Policy for Coreslash Technologies. Understand how we collect, use, process, and protect your personal information."
      />

      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Header */}
      <section className="relative pt-12 pb-16 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-6"
        >
          <Shield className="w-4 h-4 text-secondary-indigo" />
          <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">Legal Compliance</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900"
        >
          Privacy <span className="text-gradient-cyan">Policy</span>
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
            
            {/* Introduction */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">1. Introduction</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Welcome to Coreslash Technologies. We operate the website located at{" "}
                  <a
                    href={envConfig.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary-indigo hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    coreslashtechnologies.com <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  and deliver digital transformation products, custom software, artificial intelligence, IoT, and digital marketing services.
                </p>
                <p>
                  Your privacy is of paramount importance to us. This Privacy Policy describes how we collect, store, share, use, and process your personal information when you use our website, send inquiries through our lead generation systems, or execute projects with us.
                </p>
                <p>
                  By accessing or using our Services, you consent to the collection, use, transfer, and storage of your information in accordance with this Privacy Policy. If you do not agree with these policies, please discontinue your access to our services.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Information We Collect */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Eye className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">2. Information We Collect</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  We collect personal and technical information to optimize your experience, process contract applications, and respond to your digital project requests.
                </p>
                <div className="pl-4 border-l-2 border-secondary-indigo/25 space-y-3">
                  <p>
                    <strong>Direct Inquiries & Form Data:</strong> When you request a consultation, fill out a lead form, or submit inquiry data, we collect your <em>Full Name</em>, <em>Business Email Address</em>, <em>Phone Number</em>, <em>Company Details</em>, <em>Budget Specifications</em>, and any custom message descriptions you provide.
                  </p>
                  <p>
                    <strong>Usage & Analytics:</strong> We collect details about your device and network, including your IP Address, browser properties, operating system configuration, referral sources, duration of website visits, and general clicking patterns.
                  </p>
                  <p>
                    <strong>Billing Information:</strong> If you enter into a client contract and initiate transactions via our payment interfaces, we collect billing details and transaction history. Note that actual credit card data is securely handled directly by verified, third-party payment gateways, not stored in our databases.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* How We Use Information */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">3. How We Use Information</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>We process your data for several standard legal and business purposes:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>To evaluate project scope, calculate custom quotations, and contact you regarding initial project consultations.</li>
                  <li>To dispatch automated transaction receipts, verify payments, and handle invoices.</li>
                  <li>To notify you about updates to services, deliver customer assistance, and address critical security reports.</li>
                  <li>To generate site-wide analytics to debug performance, test UI accessibility, and optimize user experience layouts.</li>
                  <li>To comply with regulatory laws, tax reporting standards, and legal processes.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Data Protection & Security */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">4. Data Protection & Security</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  We prioritize data security. All information sent through our digital pipelines is protected using Transport Layer Security (TLS/SSL) encryption during transit.
                </p>
                <p>
                  Access to lead information is restricted internally to specialized IT support staff, operations teams, and directors required to coordinate project specifications. However, please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute safety.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Sharing & Disclosure */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">5. Sharing & Disclosure</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>We do not sell, rent, or trade your personal information to third parties.</p>
                <p>We may share your data under the following limited conditions:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Service Providers:</strong> We use hosting architectures, email notification delivery services, and payment processors to complete operations. These systems are bound by privacy requirements to not expose or utilize your data.</li>
                  <li><strong>Legal Obligations:</strong> We may disclose information if required to do so by applicable local laws, law enforcement inquiries, judicial trials, or tax authorities.</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or restructuring of Coreslash Technologies assets, user data could be transferred to the acquiring entity.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Cookies & Tracking */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">6. Cookies & Analytics</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  We deploy cookies (small text files saved on your terminal) and web beacons to remember preferences, assess page engagement speed, and compile statistical audience reports.
                </p>
                <p>
                  You have complete control over cookies through your web browser configuration. You can disable, block, or delete cookies at any time. For more information, please see our dedicated{" "}
                  <a href="/cookie-policy" className="text-secondary-indigo hover:underline font-semibold">
                    Cookie Policy
                  </a>.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Your Rights & Controls */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">7. Your Rights & Controls</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Regardless of your geographic location, we respect your rights to manage your personal details. Depending on your local jurisdiction (such as GDPR, CCPA, or regional IT regulations), you have:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Access Rights:</strong> You can request a summary report of all personal data we currently hold on you.</li>
                  <li><strong>Correction Rights:</strong> You can request immediate corrections of inaccurate or outdated information.</li>
                  <li><strong>Deletion Rights:</strong> You can request that we permanently delete your records from our systems, except where we must retain certain records for tax, legal, or contract completion purposes.</li>
                  <li><strong>Data Portability:</strong> You can request transfer of your structured profile information directly to another software operator.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Contact Information */}
            <section className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">8. Contact Information</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  If you have any questions about this Privacy Policy, wish to exercise your data protection rights, or have queries about how your data is handled, feel free to contact our data officer:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
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
                      <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Call / WhatsApp</p>
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
