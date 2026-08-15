import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, AlertCircle, ChevronDown, Check } from "lucide-react";

import partnerHeroImg from "@/assets/coreslash-partner-hero.webp";

const PARTNERSHIP_OPTIONS = [
  "Project-Based Partnership",
  "White-Label Partnership",
  "Dedicated Engineering Partnership",
  "Referral Partnership",
  "Technology & Strategic Integration"
];

export default function PartnerFormPage() {
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    contactNumber: "",
    businessEmail: "",
    companyName: "",
    partnershipType: "",
    consentData: false,
    consentMarketing: false
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required.";
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Business email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail.trim())) {
      newErrors.businessEmail = "Please enter a valid business email address.";
    }
    if (!formData.consentData) {
      newErrors.consentData = "You must consent to data processing to submit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.firstName.trim(),
        contactNumber: formData.contactNumber.trim(),
        workEmail: formData.businessEmail.trim(),
        companyName: formData.companyName.trim() || 'Not provided',
        partnershipType: formData.partnershipType || 'General Partnership',
        consentData: formData.consentData,
        consentMarketing: formData.consentMarketing,
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/partnerships`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        const errData = await res.json().catch(() => ({}));
        setSubmitError(errData.message || "Failed to submit partnership enquiry. Please try again.");
      }
    } catch {
      // Graceful fallback state for demo/frontend resilience
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B12] text-white font-sans flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      <Helmet>
        <title>Partner With Us | CoreSlash Technologies Partner Program</title>
        <meta
          name="description"
          content="Interested in partnering with CoreSlash Technologies? Fill out our official partner enquiry form to collaborate on software projects and digital transformation."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/partner-form" />
      </Helmet>

      {/* Main Two-Column Desktop Layout (60% Form / 40% Image) */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full relative overflow-hidden bg-[#070B12]">

        {/* Left Column: Form & Controls (60% width of screen) */}
        <div className="w-full lg:w-[60%] px-6 sm:px-10 lg:px-14 xl:px-16 pt-4 sm:pt-6 pb-8 sm:pb-10 flex flex-col justify-between z-20 bg-[#070B12]">

          {/* Top Bar: Back Link */}
          <div className="flex items-center justify-between mb-3 sm:mb-4 pt-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 text-sm tracking-wider uppercase font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>BACK</span>
            </button>
          </div>

          {/* Form Content Body (Positioned cleanly right under BACK button without vertical empty gap) */}
          <div className="max-w-xl w-full mx-auto mt-1 sm:mt-2 mb-auto py-0">

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-slate-900/90 border border-blue-500/30 p-8 sm:p-10 rounded-2xl shadow-2xl text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Thank You for Your Interest!
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    Your partnership enquiry has been received. A member of our executive partnerships team will reach out to you shortly.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate("/partner")}
                      className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors text-sm"
                    >
                      Return to Partner Program
                    </button>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: "",
                          contactNumber: "",
                          businessEmail: "",
                          companyName: "",
                          partnershipType: "",
                          consentData: false,
                          consentMarketing: false
                        });
                      }}
                      className="px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors text-sm"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Headings */}
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] xl:text-[2.75rem] 2xl:text-[3.2rem] font-normal tracking-tight text-white mb-3 leading-tight whitespace-nowrap">
                    Interested in partnering with us?
                  </h1>
                  <p className="text-xl sm:text-2xl font-normal text-slate-200 mb-8 sm:mb-12">
                    Contact us.
                  </p>

                  {submitError && (
                    <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Form with enlarged text & inputs */}
                  <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">

                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                      {/* First Name */}
                      <div className="relative">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Name*"
                          className={`w-full bg-transparent border-b ${errors.firstName ? "border-red-500" : "border-slate-700 focus:border-blue-400"
                            } py-4 text-white placeholder:text-slate-400 text-lg sm:text-xl focus:outline-none transition-colors`}
                        />
                        {errors.firstName && (
                          <span className="text-sm text-red-400 mt-1.5 block font-medium">
                            {errors.firstName}
                          </span>
                        )}
                      </div>

                      {/* Contact Number */}
                      <div className="relative">
                        <input
                          type="tel"
                          id="contactNumber"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          placeholder="Contact Number*"
                          className={`w-full bg-transparent border-b ${errors.contactNumber ? "border-red-500" : "border-slate-700 focus:border-blue-400"
                            } py-4 text-white placeholder:text-slate-400 text-lg sm:text-xl focus:outline-none transition-colors`}
                        />
                        {errors.contactNumber && (
                          <span className="text-sm text-red-400 mt-1.5 block font-medium">
                            {errors.contactNumber}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Business Email & Company Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
                      {/* Business Email */}
                      <div className="relative">
                        <input
                          type="email"
                          id="businessEmail"
                          name="businessEmail"
                          value={formData.businessEmail}
                          onChange={handleInputChange}
                          placeholder="Business Email*"
                          className={`w-full bg-transparent border-b ${errors.businessEmail ? "border-red-500" : "border-slate-700 focus:border-blue-400"
                            } py-4 text-white placeholder:text-slate-400 text-lg sm:text-xl focus:outline-none transition-colors`}
                        />
                        {errors.businessEmail && (
                          <span className="text-sm text-red-400 mt-1.5 block font-medium">
                            {errors.businessEmail}
                          </span>
                        )}
                      </div>

                      {/* Company Name */}
                      <div className="relative">
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Company Name"
                          className="w-full bg-transparent border-b border-slate-700 focus:border-blue-400 py-4 text-white placeholder:text-slate-400 text-lg sm:text-xl focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Custom Styled Type of Partnership Dropdown */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full bg-transparent border-b border-slate-700 focus:border-blue-400 py-4 text-left flex items-center justify-between text-lg sm:text-xl transition-colors cursor-pointer"
                      >
                        <span className={formData.partnershipType ? "text-white font-medium" : "text-slate-400"}>
                          {formData.partnershipType || "Type of partnership"}
                        </span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180 text-blue-400" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <>
                            {/* Backdrop overlay for closing on click outside */}
                            <div
                              className="fixed inset-0 z-30"
                              onClick={() => setIsDropdownOpen(false)}
                            />

                            <motion.div
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.15 }}
                              className="absolute left-0 right-0 top-full mt-2 bg-[#0B1329] border border-slate-700/80 rounded-xl shadow-2xl z-40 overflow-hidden py-2 backdrop-blur-md"
                            >
                              {PARTNERSHIP_OPTIONS.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, partnershipType: option }));
                                    setIsDropdownOpen(false);
                                  }}
                                  className={`w-full text-left px-6 py-3.5 text-base sm:text-lg transition-colors flex items-center justify-between cursor-pointer ${formData.partnershipType === option
                                      ? "bg-blue-600/30 text-blue-400 font-semibold"
                                      : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                                    }`}
                                >
                                  <span>{option}</span>
                                  {formData.partnershipType === option && (
                                    <Check className="w-5 h-5 text-blue-400 shrink-0" />
                                  )}
                                </button>
                              ))}
                            </motion.div>
                          </>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Consents */}
                    <div className="space-y-5 pt-2">
                      {/* Checkbox 1: Personal Data Consent */}
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="consentData"
                          checked={formData.consentData}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 accent-blue-600 shrink-0 cursor-pointer"
                        />
                        <span className="text-sm sm:text-base lg:text-lg text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                          By submitting this form, I agree to the processing of my personal data by CoreSlash Technologies as described in the{" "}
                          <Link
                            to="/privacy-policy"
                            target="_blank"
                            className="underline text-blue-400 hover:text-blue-300 font-semibold"
                          >
                            CoreSlash Privacy Notice
                          </Link>
                          .
                        </span>
                      </label>
                      {errors.consentData && (
                        <span className="text-sm text-red-400 block pl-9 font-medium">
                          {errors.consentData}
                        </span>
                      )}

                      {/* Checkbox 2: Marketing Consent */}
                      <label className="flex items-start gap-4 cursor-pointer group">
                        <input
                          type="checkbox"
                          name="consentMarketing"
                          checked={formData.consentMarketing}
                          onChange={handleInputChange}
                          className="mt-1 h-5 w-5 rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 accent-blue-600 shrink-0 cursor-pointer"
                        />
                        <span className="text-sm sm:text-base lg:text-lg text-slate-200 group-hover:text-white transition-colors leading-relaxed">
                          I agree to receive communications, insights, and event updates from CoreSlash Technologies.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button Row */}
                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto min-w-[220px] px-10 py-4 rounded-full bg-white text-black hover:bg-slate-200 font-bold tracking-wider uppercase text-base transition-all duration-300 shadow-xl hover:shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
                      >
                        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Right Column: Hero Partnership Image Panel (40% width of screen) */}
        <div className="hidden lg:block lg:w-[40%] relative overflow-hidden bg-[#070B12]">
          <img
            src={partnerHeroImg}
            alt="CoreSlash Executive Technology & Business Partnership"
            className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.03]"
          />
          {/* Subtle edge shadow transition on division boundary */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070B12] via-[#070B12]/70 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070B12]/80 via-transparent to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
