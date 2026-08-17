import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, ArrowRight, ArrowLeft, Loader2, Shield, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const INDUSTRIES = [
  "Manufacturing",
  "Healthcare",
  "Education",
  "Finance",
  "Retail",
  "Technology",
  "Construction",
  "Real Estate",
  "Hospitality",
  "Logistics",
  "Other"
];

interface PremiumContactFormProps {
  initialPhone?: string;
  onBack?: () => void;
  onSuccess?: () => void;
  source?: string;
}

export function PremiumContactForm({
  initialPhone,
  onBack,
  onSuccess,
  source: _source = 'premium_contact_form'
}: PremiumContactFormProps = {}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: initialPhone || "",
    location: "",
    industry: "",
    details: ""
  });

  // Keep phone updated if initialPhone changes
  React.useEffect(() => {
    if (initialPhone) {
      setFormData(prev => ({ ...prev, phone: initialPhone }));
    }
  }, [initialPhone]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.name,
        workEmail: formData.email,
        phone: formData.phone || initialPhone || '',
        location: formData.location || 'Not provided',
        service: formData.industry || 'General Consultation',
        projectDetails: formData.details || 'Interested in CoreSlash software & AI services.',
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/enquiries/standard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowSuccessModal(true);
        setFormData({
          name: "", email: "", phone: "", location: "", industry: "", details: ""
        });
        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Submission failed: ${errData.message || 'Server error'}`);
      }
    } catch (err) {
      console.error('Backend API connection error:', err);
      alert("Could not connect to backend server. Please ensure NestJS server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center max-w-[720px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative p-5 sm:p-7 lg:p-8 rounded-[20px] bg-[#0A0F1C] text-white shadow-2xl overflow-hidden z-10"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="mb-5 text-left relative z-10">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          )}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              PROJECT ENQUIRY
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-tight mb-2">
            Let's Build Something Great
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed font-light">
            Tell us a little about your project and our solution architects will get back to you shortly.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 text-left relative z-10">

          {/* Row 1: Full Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Full Name */}
            <div className="space-y-2 relative group">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
                className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-1 relative group">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
                className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 2: Work Email & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Work Email */}
            <div className="space-y-1 relative group">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                Work Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your work email"
                required
                className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Location */}
            <div className="space-y-1 relative group">
              <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                Location / City
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter your city / location"
                className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Row 3: Service / Industry Custom Select */}
          <div className="space-y-1 relative">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
              Service / Industry
            </label>
            <div
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className="w-full bg-transparent border-b border-slate-700 pb-1.5 text-base sm:text-lg text-white flex items-center justify-between cursor-pointer focus-within:border-blue-500 transition-colors"
            >
              <span className={cn(formData.industry ? "text-white" : "text-slate-600")}>
                {formData.industry || "Select a service"}
              </span>
              <ChevronDown size={18} className={cn("text-slate-500 transition-transform duration-300", isIndustryOpen && "rotate-180 text-blue-400")} />
            </div>

            {/* Custom Industry Dropdown */}
            <AnimatePresence>
              {isIndustryOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsIndustryOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-slate-700/80 rounded-xl shadow-2xl z-50 overflow-hidden py-2"
                  >
                    <div className="max-h-[220px] overflow-y-auto custom-scrollbar">
                      {INDUSTRIES.map(ind => (
                        <div
                          key={ind}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData(prev => ({ ...prev, industry: ind }));
                            setIsIndustryOpen(false);
                          }}
                          className={cn(
                            "flex items-center justify-between px-5 py-3 hover:bg-blue-600/20 cursor-pointer text-sm sm:text-base transition-colors",
                            formData.industry === ind ? "text-blue-400 font-medium bg-blue-600/10" : "text-slate-300"
                          )}
                        >
                          {ind}
                          {formData.industry === ind && <Check size={16} className="text-blue-400" />}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Row 4: Project Details */}
          <div className="space-y-1 relative group">
            <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
              Project Details *
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={2}
              placeholder="Tell us about your project, goals, timeline, or requirements..."
              required
              className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none resize-none transition-colors"
            />
          </div>

          {/* Row 5: CTA Button & Trust Microcopy */}
          <div className="pt-3 space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 rounded-none bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 active:scale-[0.99] text-white font-bold tracking-wider text-sm sm:text-base flex items-center justify-center gap-2 shadow-[0_8px_25px_rgba(37,99,235,0.3)] transition-all duration-300 cursor-pointer disabled:opacity-50 uppercase"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-2 font-medium">
              <Shield className="w-4 h-4 text-blue-500/70" />
              Your information is strictly confidential and will only be used to respond to your enquiry.
            </p>
          </div>

        </form>
      </motion.div>

      {/* Custom 24-Hour Response Success Modal Popup */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-md bg-[#0A0F1C] text-white rounded-[24px] p-8 sm:p-10 text-center shadow-2xl border border-slate-700/80 overflow-hidden z-50"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight mb-3">
                Request Received! 🎉
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                Thank you for reaching out to <span className="text-white">CoreSlash Technologies</span>. Our team will review your project details and reach out to you within <span className="text-blue-400">24 hours</span>.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-4 rounded-none bg-slate-800 hover:bg-slate-700 text-white font-bold tracking-wider text-sm transition-all cursor-pointer uppercase"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #0A0F1C inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
