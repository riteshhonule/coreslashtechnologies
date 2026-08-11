import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, Building, MessageSquare, ChevronDown, Check, ArrowRight, ArrowLeft, Loader2, Shield } from "lucide-react";
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
  source = 'premium_contact_form'
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

      const res = await fetch('/api/enquiries/standard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        if (onSuccess) {
          onSuccess();
        } else {
          setFormData({
            name: "", email: "", phone: "", location: "", industry: "", details: ""
          });
          alert("Consultation requested successfully! Your entry has been saved to the database.");
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
        className="relative p-5 sm:p-6 lg:p-7 rounded-[22px] bg-white text-slate-900 border border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden z-10"
      >
        {/* Top Edge Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        {/* Header */}
        <div className="mb-4 text-left">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors mb-2 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Phone
            </button>
          )}
          <div>
            <span className="inline-block text-[10px] font-black tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded mb-1.5">
              PROJECT ENQUIRY
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1228] tracking-tight">
            Let's Build Something Great
          </h3>
          <p className="text-slate-600 text-[11px] sm:text-xs mt-1 leading-normal font-normal">
            Tell us a little about your project and our team will get back to you shortly.
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-3 text-left">
          
          {/* Row 1: Full Name & Work Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <User size={13} className="text-blue-600" /> Full Name *
              </label>
              <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Work Email */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <Mail size={13} className="text-blue-600" /> Work Email *
              </label>
              <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your work email"
                  required
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none font-medium"
                />
              </div>
            </div>

          </div>

          {/* Row 2: Phone & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            
            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <Phone size={13} className="text-blue-600" /> Phone Number *
              </label>
              <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] font-medium placeholder:text-[#64748B] focus:outline-none"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-1">
              <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                <MapPin size={13} className="text-blue-600" /> Location / City
              </label>
              <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your city / location"
                  className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none font-medium"
                />
              </div>
            </div>

          </div>

          {/* Row 3: Industry / Service Custom Select */}
          <div className="space-y-1 relative">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <Building size={13} className="text-blue-600" /> Service / Industry
            </label>
            <div 
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className="relative flex items-center justify-between bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl px-3 py-2.5 cursor-pointer transition-all"
            >
              <span className={cn("text-xs font-medium", formData.industry ? "text-[#111827]" : "text-slate-400")}>
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
                  className="absolute top-full left-0 right-0 mt-1.5 p-2 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <input 
                    type="text" 
                    placeholder="Search industry..." 
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-900 outline-none focus:border-blue-600 mb-1.5 placeholder:text-slate-400 font-medium"
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
                        className="flex items-center justify-between px-3 py-1.5 rounded-lg hover:bg-slate-100 cursor-pointer text-xs text-slate-800 transition-colors font-medium"
                      >
                        {ind}
                        {formData.industry === ind && <Check size={14} className="text-blue-600" />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Row 4: Project Details */}
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
              <MessageSquare size={13} className="text-blue-600" /> Project Details *
            </label>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={3}
              placeholder="Tell us about your project, goals, timeline, or requirements..."
              className="w-full bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl p-3 text-xs text-[#111827] placeholder:text-[#64748B] outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/10 focus:bg-white resize-none h-[88px] font-medium transition-all"
            />
          </div>

          {/* Row 5: CTA Button & Trust Microcopy */}
          <div className="pt-1.5 space-y-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-blue-500/25 transition-all duration-300 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Book a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1 font-medium">
              <Shield className="w-3 h-3 text-blue-600" />
              Your information is kept confidential and will only be used to respond to your enquiry.
            </p>
          </div>

        </form>
      </motion.div>

      {/* Pure CSS Autofill Overrides */}
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill {
          -webkit-text-fill-color: #111827 !important;
          -webkit-box-shadow: 0 0 0px 1000px #F8FAFC inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
