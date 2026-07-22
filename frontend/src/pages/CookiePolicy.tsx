import React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { Cookie, Info, BarChart2, ShieldCheck, Settings, HelpCircle, Mail, ExternalLink } from "lucide-react";
import { envConfig } from "../config/env.config";

export default function CookiePolicy() {
  return (
    <div className="relative min-h-screen bg-[#F9FAFB] overflow-hidden font-sans text-gray-900 pb-24">
      <SEO
        title="Cookie Policy | CoreSlash Technologies"
        description="Learn about how we use cookies and tracking technologies to improve your experience on our website."
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
          <Cookie className="w-4 h-4 text-secondary-indigo" />
          <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">Cookie Settings</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-gray-900"
        >
          Cookie <span className="text-gradient-cyan">Policy</span>
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
            
            {/* What Are Cookies? */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">1. What Are Cookies?</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  Cookies are small text files containing details of your browser settings that are stored on your computer or mobile terminal when you visit a webpage.
                </p>
                <p>
                  They act as a memory token for websites. They allow our server to identify your system configuration, remember preferences, and ensure page interactions function correctly. We also use web beacons, tracking pixels, and local storage elements which function similarly.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* How We Use Cookies */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">2. How We Use Cookies</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  We deploy cookies to improve your navigation experience, monitor site usage speed, and customize promotional campaigns.
                </p>
                <p>
                  Cookies can be either "first-party" cookies (which are set directly by Coreslash Technologies) or "third-party" cookies (which are set by external companies providing analytics, payment platforms, or support modules). They are also split between "session" cookies (deleted automatically when you close your web browser) and "persistent" cookies (remain stored until they expire or are manually cleared).
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Cookie Categories */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">3. Cookie Categories We Collect</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>We classify the cookies we run into the following categories:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Essential Cookies:</strong> These cookies are critical to run fundamental features of our website, such as validating user sessions, executing payment transaction pipelines, and keeping spam filters active on our lead forms. They cannot be deactivated manually.</li>
                  <li><strong>Analytical & Performance Cookies:</strong> These elements collect aggregated data about how visitors navigate our page. This reveals which sub-sections are popular, how quickly pages compile, and if any loading issues occur. This helps us optimize performance.</li>
                  <li><strong>Functional Cookies:</strong> These enable the website to provide enhanced personalization and custom properties, such as maintaining form inputs so you do not have to re-type details if you refresh a page.</li>
                  <li><strong>Targeting & Advertising Cookies:</strong> These cookies may be set through our site by advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Third-Party Cookies */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">4. Third-Party Tracker Disclosures</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  We deploy specialized third-party software systems to handle analytics and transactional records. These vendors write cookies to your terminal:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Google Analytics:</strong> We use Google Analytics to compile insights on visitor counts, geography, and general page flows. Google Analytics processes data anonymously. You can opt out of Google Analytics tracking using Google's opt-out tool.</li>
                  <li><strong>LinkedIn & Meta Tags:</strong> We use marketing trackers to measure the return on investment of our campaigns. These allow us to display tailored project promotions to users who have previously visited our site.</li>
                  <li><strong>Stripe & Payment Gateways:</strong> When processing deposits or contract fees, our payment providers utilize security cookies to prevent fraudulent actions and secure transactions.</li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Managing Preferences */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <Settings className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">5. Managing Cookie Preferences</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  You have complete control over how cookies are managed on your device. Most web browsers allow you to modify settings to block new cookies, delete existing cookies, or alert you when cookies are sent.
                </p>
                <p>To configure these controls, visit the settings menu for your specific web browser:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                  {[
                    { name: "Google Chrome", url: "https://support.google.com/chrome/answer/95647" },
                    { name: "Apple Safari", url: "https://support.apple.com/guide/safari/manage-cookies-sfri11471" },
                    { name: "Mozilla Firefox", url: "https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" },
                    { name: "Microsoft Edge", url: "https://support.microsoft.com/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9a73-d065-ca94-01b2c3902639" },
                  ].map((browser) => (
                    <a
                      key={browser.name}
                      href={browser.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-secondary-indigo/25 hover:bg-gray-100 transition-all text-center text-xs font-semibold text-gray-700 hover:text-gray-900 flex items-center justify-center gap-1 shadow-sm"
                    >
                      {browser.name} <ExternalLink className="w-3 h-3" />
                    </a>
                  ))}
                </div>
                <p className="pt-2 text-xs text-gray-500 italic">
                  Note: If you disable or delete essential session cookies, some sections of our web portal, such as contact and payment forms, may not function as intended.
                </p>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* Policy Inquiries */}
            <section className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-secondary-indigo/10 border border-secondary-indigo/15 text-secondary-indigo shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">6. Updates & Inquiries</h2>
              </div>
              <div className="text-gray-600 leading-relaxed space-y-4 text-sm md:text-base text-justify">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our technology systems or legal obligations. We recommend reviewing this page periodically to stay informed about how we use tracking cookies.
                </p>
                <p>
                  If you have any questions or require support managing your tracking preferences, feel free to contact us:
                </p>
                <div className="pt-2">
                  <a
                    href={`mailto:${envConfig.contact.email}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-secondary-indigo/25 hover:bg-gray-100 text-sm font-semibold text-gray-900 hover:text-secondary-indigo transition-all shadow-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Contact our support desk at {envConfig.contact.email}
                  </a>
                </div>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
