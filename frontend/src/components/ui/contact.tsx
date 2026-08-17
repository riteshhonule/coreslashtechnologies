import React, { useState } from 'react';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { ArrowRight, ChevronDown, Sparkles, Shield, Loader2, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ContactSectionProps {
  title?: string;
  mainMessage?: string;
  contactEmail?: string;
  backgroundImageSrc?: string;
  onSubmit?: (data: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "We can turn your dream project into reality",
  mainMessage: _mainMessage = "Let's talk! 👋",
  contactEmail = "contact@coreslashtechnologies.com",
  backgroundImageSrc = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80",
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    phoneNumber: '',
    location: '',
    industry: '',
    projectDetails: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName || 'Website Inquiry',
        workEmail: formData.workEmail,
        phone: formData.phoneNumber || 'Not provided',
        location: formData.location || 'Not provided',
        service: formData.industry || 'General Inquiry',
        projectDetails: formData.projectDetails || 'New contact inquiry from website.',
      };

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/enquiries/standard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsSubmitted(true);
        onSubmit?.(formData);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            fullName: '',
            workEmail: '',
            phoneNumber: '',
            location: '',
            industry: '',
            projectDetails: '',
          });
        }, 5000);
      } else {
        const errData = await res.json().catch(() => ({}));
        alert(`Submission failed: ${errData.message || 'Server error'}`);
      }
    } catch (err) {
      console.error('Backend API connection error:', err);
      alert('Could not connect to backend server. Please ensure NestJS backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const industryOptions = [
    'Manufacturing',
    'Healthcare',
    'Education',
    'Finance',
    'Retail',
    'Technology',
    'Construction',
    'Real Estate',
    'Hospitality',
    'Logistics',
    'AI Automation & Custom LLMs',
    'Web & Mobile App Development',
    'E-Commerce & Storefronts',
    'Other'
  ];

  return (
    <section className="relative w-full min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] flex items-center justify-center py-4 px-4 sm:px-6 lg:px-12 bg-[#050810] overflow-hidden">
      {/* Background Image and Animated Bubbles */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <div className="absolute inset-0 bg-[#050810]/90 backdrop-blur-sm" />
        
        {/* Animated Bubbles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-500/10 rounded-full animate-bubble opacity-0"
              style={{
                width: `${Math.random() * 16 + 6}px`,
                height: `${Math.random() * 16 + 6}px`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${Math.random() * 16 + 8}s`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1200px] w-full mx-auto my-auto py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-5 text-left space-y-3 lg:space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-bold tracking-widest uppercase backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>Start A Project</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-white leading-[1.15] tracking-tight drop-shadow-lg">
              {title}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-light max-w-md">
              Have an enterprise project or ambitious idea? Reach out to our solution architects for a free technical consultation.
            </p>

            {/* Direct Contact & Social Links */}
            <div className="pt-6 border-t border-slate-800/80 space-y-3">
              <div>
                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-1">Mail us directly</p>
                <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                  {contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a 
                  href="https://x.com/CoreSlashTech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X (Twitter)"
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all text-sm"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-pink-600/20 text-slate-400 hover:text-pink-400 flex items-center justify-center transition-all text-sm"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61591466563226" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-blue-500 flex items-center justify-center transition-all text-sm"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/coreslash-technologies/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600/20 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all text-sm"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Minimalist Underline Form */}
          <div className="lg:col-span-7 bg-[#0A0F1C] text-white rounded-[20px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-400" />

            {/* Success Overlay Notification */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0A0F1C]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight mb-3">Consultation Requested! 🎉</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                    Thank you for reaching out to <span className="text-white">CoreSlash Technologies</span>. Our team will review your project details and reach out to you within <span className="text-blue-400">24 hours</span>.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Header */}
            <div className="mb-6 text-left">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                PROJECT ENQUIRY
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-white tracking-tight mb-2">
                Let's Build Something Great
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                Tell us a little about your project and our solution architects will get back to you shortly.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 text-left">
              
              {/* Row 1: Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                
                {/* Full Name */}
                <div className="space-y-2 relative group">
                  <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
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
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
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
                    name="workEmail"
                    placeholder="Enter your work email"
                    value={formData.workEmail}
                    onChange={handleChange}
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
                    placeholder="Enter your city / location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Row 3: Service / Industry */}
              <div className="space-y-1 relative group">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                  Service / Industry
                </label>
                <div className="relative">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-b border-slate-700 focus:border-blue-500 pb-1.5 text-base sm:text-lg text-white appearance-none cursor-pointer focus:outline-none transition-colors [&>option]:bg-[#0A0F1C] [&>option]:text-white"
                  >
                    <option value="" disabled className="text-slate-600">
                      Select a service
                    </option>
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute right-0 top-0 text-slate-500 pointer-events-none" />
                </div>
              </div>

              {/* Row 4: Project Details */}
              <div className="space-y-1 relative group">
                <label className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 block mb-1">
                  Project Details *
                </label>
                <textarea
                  name="projectDetails"
                  placeholder="Tell us about your project, goals, timeline, or requirements..."
                  value={formData.projectDetails}
                  onChange={handleChange}
                  required
                  rows={2}
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
          </div>

        </div>
      </div>

      {/* Bubble Animation & Light Input Autofill Overrides CSS */}
      <style>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(calc(var(--rand-x-offset) * 10vw)) scale(1.2);
            opacity: 0;
          }
        }
        .animate-bubble {
          animation: bubble var(--animation-duration, 15s) ease-in-out infinite;
          animation-fill-mode: forwards;
          --rand-x-offset: 1;
        }

        /* Pure CSS Autofill Overrides for Light Inputs */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        textarea:-webkit-autofill {
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #0A0F1C inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
};
