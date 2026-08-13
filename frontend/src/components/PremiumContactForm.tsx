import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, Building, MessageSquare, ChevronDown, Check, ArrowRight, ArrowLeft, Loader2, Shield, Sparkles } from "lucide-react";
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
  const [industrySearch, setIndustrySearch] = useState("");

  const filteredIndustries = INDUSTRIES.filter(i =>
    i.toLowerCase().includes(industrySearch.toLowerCase())
  );

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
    <div className="w-full h-full flex flex-col justify-center max-w-[680px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative p-5 sm:p-6 lg:p-7 rounded-[26px] bg-[#0B101D]/95 backdrop-blur-2xl text-white border border-slate-700/60 shadow-[0_25px_70px_rgba(0,0,0,0.75)] overflow-hidden z-10"
      >
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Edge Cyan-to-Blue Gradient Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

        {/* Header */}
        <div className="mb-4 text-left relative z-10">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Phone
            </button>
          )}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold tracking-widest uppercase text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full shadow-sm">
              <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />
              PROJECT ENQUIRY
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
            Let's Build Something Great
          </h3>
          <p className="text-slate-300 text-[11px] sm:text-xs mt-1.5 leading-relaxed font-medium">
            Tell us a little about your project and our solution architects will get back to you shortly.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-left relative z-10">

          {/* Row 1: Full Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <User size={13} className="text-blue-400" /> Full Name *
              </label>
              <div className="relative flex items-center bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/25 focus-within:bg-slate-950 transition-all overflow-hidden shadow-inner">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none font-semibold"
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Mail size={13} className="text-blue-400" /> Work Email *
              </label>
              <div className="relative flex items-center bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/25 focus-within:bg-slate-950 transition-all overflow-hidden shadow-inner">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your work email"
                  required
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none font-semibold"
                />
              </div>
            </div>

          </div>

          {/* Row 2: Phone & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Phone size={13} className="text-blue-400" /> Phone Number *
              </label>
              <div className="relative flex items-center bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/25 focus-within:bg-slate-950 transition-all overflow-hidden shadow-inner">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-100 font-semibold placeholder:text-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <MapPin size={13} className="text-blue-400" /> Location / City
              </label>
              <div className="relative flex items-center bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 rounded-xl focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/25 focus-within:bg-slate-950 transition-all overflow-hidden shadow-inner">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your city / location"
                  className="w-full bg-transparent px-3.5 py-2.5 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none font-semibold"
                />
              </div>
            </div>

          </div>

          {/* Row 3: Industry / Service Custom Select */}
          <div className="space-y-1.5 relative">
            <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Building size={13} className="text-blue-400" /> Service / Industry
            </label>
            <div
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className="relative flex items-center justify-between bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 rounded-xl px-3.5 py-2.5 cursor-pointer transition-all shadow-inner"
            >
              <span className={cn("text-xs font-semibold", formData.industry ? "text-slate-100" : "text-slate-500")}>
                {formData.industry || "Select a service"}
              </span>
              <ChevronDown size={14} className={cn("text-slate-400 transition-transform duration-300", isIndustryOpen && "rotate-180")} />
            </div>

            {/* Custom Industry Dropdown */}
            <AnimatePresence>
              {isIndustryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-1.5 p-2 bg-[#0F172A] border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search industry..."
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-100 outline-none focus:border-blue-500 mb-1.5 placeholder:text-slate-500 font-medium"
                  />
                  <div className="max-h-[160px] overflow-y-auto custom-scrollbar space-y-0.5">
                    {filteredIndustries.map(ind => (
                      <div
                        key={ind}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, industry: ind }));
                          setIsIndustryOpen(false);
                          setIndustrySearch("");
                        }}
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-blue-600/20 hover:text-white cursor-pointer text-xs text-slate-300 transition-colors font-semibold"
                      >
                        {ind}
                        {formData.industry === ind && <Check size={14} className="text-blue-400" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Row 4: Project Details */}
          <div className="space-y-1.5">
            <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <MessageSquare size={13} className="text-blue-400" /> Project Details *
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={3}
              placeholder="Tell us about your project, goals, timeline, or requirements..."
              className="w-full bg-slate-900/80 border border-slate-700/80 hover:border-slate-600 rounded-xl p-3.5 text-xs text-slate-100 placeholder:text-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/25 focus:bg-slate-950 resize-none h-[88px] font-semibold transition-all shadow-inner"
            />
          </div>

          {/* Row 5: CTA Button & Trust Microcopy */}
          <div className="pt-2 space-y-2.5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 active:scale-[0.99] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_35px_rgba(37,99,235,0.55)] transition-all duration-300 cursor-pointer disabled:opacity-50 tracking-wide uppercase"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-400 text-center flex items-center justify-center gap-1.5 font-medium">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="relative w-full max-w-md bg-[#0B101D] text-white rounded-[28px] p-7 sm:p-9 text-center shadow-2xl border border-slate-700/80 overflow-hidden z-50"
            >
              {/* Top Edge Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500" />

              {/* Success Badge Icon */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
                Request Received! 🎉
              </h3>

              {/* Subtitle with 24 Hours Message */}
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                Thank you for reaching out to <span className="font-extrabold text-white">CoreSlash Technologies</span>. Our team will review your project details and reach out to you within <span className="font-extrabold text-blue-400">24 hours</span>.
              </p>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => {
                  setShowSuccessModal(false);
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg shadow-blue-500/30 active:scale-[0.99] transition-all cursor-pointer uppercase tracking-wider"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pure CSS Autofill Overrides */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill {
          -webkit-text-fill-color: #F8FAFC !important;
          -webkit-box-shadow: 0 0 0px 1000px #0F172A inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
