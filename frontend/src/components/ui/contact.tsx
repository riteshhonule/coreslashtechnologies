import React, { useState } from 'react';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { ArrowRight, ChevronDown, Sparkles, User, Mail, Phone, MapPin, Building2, MessageSquare, Shield, Loader2 } from "lucide-react";

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

      const res = await fetch('/api/enquiries/standard', {
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
    <section className="relative w-full min-h-[calc(100vh-76px)] lg:h-[calc(100vh-76px)] flex items-center justify-center py-4 px-4 sm:px-6 lg:px-12 bg-slate-950 overflow-hidden">
      {/* Background Image and Animated Bubbles */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[3px]" />
        
        {/* Animated Bubbles */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-500/20 rounded-full animate-bubble opacity-0"
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
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Start A Project</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-lg">
              {title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-md">
              Have an enterprise project or ambitious idea? Reach out to our solution architects for a free technical consultation.
            </p>

            {/* Direct Contact & Social Links */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div>
                <p className="text-[11px] text-slate-400 font-medium">Mail us directly</p>
                <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-semibold transition-colors">
                  {contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a 
                  href="https://x.com/CoreSlashTech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 flex items-center justify-center border border-slate-800 transition-all text-xs"
                >
                  <FaTwitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 flex items-center justify-center border border-slate-800 transition-all text-xs"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61591466563226" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-500 flex items-center justify-center border border-slate-800 transition-all text-xs"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/coreslash-technologies/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 flex items-center justify-center border border-slate-800 transition-all text-xs"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: One-Screen Fittable White Trustworthy Form Card */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-[22px] p-5 sm:p-6 lg:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200/90 relative overflow-hidden">
            
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

            {/* Success Overlay Notification */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 flex items-center justify-center text-2xl font-bold shadow-inner">
                  ✓
                </div>
                <h3 className="text-xl font-black text-[#0B1228]">Consultation Requested!</h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-sm leading-relaxed font-medium">
                  Thank you for reaching out. Our engineering team will review your inquiry and get back to you shortly.
                </p>
              </div>
            )}

            {/* Header */}
            <div className="mb-4 text-left">
              <span className="inline-block text-[10px] font-black tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-200/80 px-2.5 py-0.5 rounded mb-1.5">
                PROJECT ENQUIRY
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1228] tracking-tight">
                Let's Build Something Great
              </h2>
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
                    <User className="w-3 h-3 text-blue-600" /> Full Name *
                  </label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none font-medium"
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-600" /> Work Email *
                  </label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                    <input
                      type="email"
                      name="workEmail"
                      placeholder="Enter your work email"
                      value={formData.workEmail}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Row 2: Phone Number & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-blue-600" /> Phone Number *
                  </label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] font-medium placeholder:text-[#64748B] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-600" /> Location / City
                  </label>
                  <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all overflow-hidden">
                    <input
                      type="text"
                      name="location"
                      placeholder="Enter your city / location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none font-medium"
                    />
                  </div>
                </div>

              </div>

              {/* Row 3: Service / Industry */}
              <div className="space-y-1">
                <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-blue-600" /> Service / Industry
                </label>
                <div className="relative flex items-center bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all">
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] appearance-none cursor-pointer focus:outline-none font-medium [&>option]:bg-white [&>option]:text-slate-900"
                  >
                    <option value="" disabled className="text-slate-400">
                      Select a service
                    </option>
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-3 pointer-events-none flex-shrink-0" />
                </div>
              </div>

              {/* Row 4: Project Details */}
              <div className="space-y-1">
                <label className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-blue-600" /> Project Details *
                </label>
                <div className="relative flex items-start bg-[#F8FAFC] border border-[#D9E1EC] hover:border-slate-400 rounded-xl focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-600/10 focus-within:bg-white transition-all">
                  <textarea
                    name="projectDetails"
                    placeholder="Tell us about your project, goals, timeline, or requirements..."
                    value={formData.projectDetails}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full bg-transparent px-3 py-2.5 text-xs text-[#111827] placeholder:text-[#64748B] focus:outline-none resize-none h-[88px] font-medium"
                  />
                </div>
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
          -webkit-text-fill-color: #111827 !important;
          -webkit-box-shadow: 0 0 0px 1000px #F8FAFC inset !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </section>
  );
};
