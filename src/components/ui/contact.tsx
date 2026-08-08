import React, { useState } from 'react';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { ArrowRight, ChevronDown, Sparkles, User, Mail, Phone, MapPin, Building2, MessageSquare } from "lucide-react";

interface ContactSectionProps {
  title?: string;
  mainMessage?: string;
  contactEmail?: string;
  backgroundImageSrc?: string;
  onSubmit?: (data: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "We can turn your dream project into reality",
  mainMessage = "Let's talk! 👋",
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    setIsSubmitted(true);
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
    }, 4000);
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
    <section className="relative w-full min-h-[calc(100vh-76px)] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-12 bg-slate-950 overflow-hidden">
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
      <div className="relative z-10 max-w-[1240px] w-full mx-auto my-auto py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Info */}
          <div className="lg:col-span-5 text-left space-y-4 lg:space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Start A Project</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-lg">
              {title}
            </h1>

            <p className="text-slate-300 text-sm leading-relaxed font-normal max-w-md">
              Have an enterprise project or ambitious idea? Reach out to our solution architects for a free technical consultation.
            </p>

            {/* Direct Contact & Social Links */}
            <div className="pt-4 border-t border-slate-800/80 space-y-3">
              <div>
                <p className="text-xs text-slate-400 font-medium">Mail us directly</p>
                <a href={`mailto:${contactEmail}`} className="text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors">
                  {contactEmail}
                </a>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <a 
                  href="https://x.com/CoreSlashTech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X (Twitter)"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 flex items-center justify-center border border-slate-800 transition-all"
                >
                  <FaTwitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-pink-600/20 text-slate-300 hover:text-pink-400 flex items-center justify-center border border-slate-800 transition-all"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61591466563226" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-500 flex items-center justify-center border border-slate-800 transition-all"
                >
                  <FaFacebookF className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/coreslash-technologies/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-blue-600/20 text-slate-300 hover:text-blue-400 flex items-center justify-center border border-slate-800 transition-all"
                >
                  <FaLinkedinIn className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Dark Form Card from Screenshot */}
          <div className="lg:col-span-7 bg-[#0b1021]/95 backdrop-blur-xl text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800/80 relative overflow-hidden">
            {/* Success Overlay Notification */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-[#0b1021]/98 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-2xl font-bold shadow-inner">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-white">Consultation Requested!</h3>
                <p className="text-slate-300 text-sm max-w-xs leading-relaxed">
                  Thank you for reaching out. Our engineering team will review your inquiry and get back to you shortly.
                </p>
              </div>
            )}

            {/* Header */}
            <div className="mb-6 text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Start Your Project
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Fill in the details below and we'll get back to you shortly.
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Row 1: Full Name & Work Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative flex items-center bg-[#131c31]/90 border border-slate-700/60 rounded-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <User className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="relative flex items-center bg-[#131c31]/90 border border-slate-700/60 rounded-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <Mail className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
                  <input
                    type="email"
                    name="workEmail"
                    placeholder="Work Email"
                    value={formData.workEmail}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Phone Number & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative flex items-center bg-[#131c31]/90 border border-slate-700/60 rounded-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <Phone className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>

                <div className="relative flex items-center bg-[#131c31]/90 border border-slate-700/60 rounded-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                  <MapPin className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Industry */}
              <div className="relative flex items-center bg-[#131c31]/90 border border-slate-700/60 rounded-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <Building2 className="w-4 h-4 text-slate-400 ml-4 flex-shrink-0" />
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-white appearance-none cursor-pointer focus:outline-none [&>option]:bg-slate-900 [&>option]:text-white"
                >
                  <option value="" disabled className="text-slate-400">
                    Industry
                  </option>
                  {industryOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 mr-4 pointer-events-none flex-shrink-0" />
              </div>

              {/* Row 4: Project Details */}
              <div className="relative flex items-start bg-[#131c31]/90 border border-slate-700/60 rounded-2xl focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
                <MessageSquare className="w-4 h-4 text-slate-400 ml-4 mt-4 flex-shrink-0" />
                <textarea
                  name="projectDetails"
                  placeholder="Project Details"
                  value={formData.projectDetails}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-transparent px-3 py-3.5 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#9333ea] via-[#6366f1] to-[#3b82f6] hover:from-[#a855f7] hover:to-[#60a5fa] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 cursor-pointer"
                >
                  <span>Book Free Consultation</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Bubble Animation CSS */}
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
      `}</style>
    </section>
  );
};

export default ContactSection;
