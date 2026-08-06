import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FaLinkedinIn, FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

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
    name: '',
    email: '',
    service: '',
    message: '',
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
      setFormData({ name: '', email: '', service: '', message: '' });
    }, 4000);
  };

  const serviceOptions = [
    'AI Automation & Custom LLMs',
    'Web Development & Next.js',
    'Mobile App Development (iOS/Android)',
    'Custom Enterprise Software Systems',
    'E-Commerce & Storefront Platforms',
    'SEO & Search Engine Growth',
    'Shopify OS 2.0 & Headless Development',
    'Cloud Infrastructure & DevOps',
    'Data Analytics & BI Dashboards',
    'Other Digital Solution'
  ];

  return (
    <section className="relative w-full h-[calc(100vh-76px)] min-h-[540px] max-h-[calc(100vh-76px)] flex items-center justify-center py-4 px-4 sm:px-6 lg:px-12 bg-slate-950 overflow-hidden">
      {/* Background Image and Animated Bubbles (Unchanged) */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url(${backgroundImageSrc})` }}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[3px]" />
        
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

      {/* Main Content Container - Single Screen Fit */}
      <div className="relative z-10 max-w-[1240px] w-full mx-auto my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 text-left space-y-3 lg:space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
              <span>Start A Project</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.15] tracking-tight drop-shadow-lg">
              {title}
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-md">
              Have an enterprise project or ambitious idea? Reach out to our solution architects for a free technical consultation.
            </p>
          </div>

          {/* Right Column: Premium WHITE Form Card */}
          <div className="lg:col-span-7 bg-white text-slate-900 rounded-[1.75rem] p-5 sm:p-6 md:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-200/80 relative overflow-hidden">
            {/* Success Overlay Notification */}
            {isSubmitted && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl font-bold shadow-inner">
                  ✓
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">Message Sent Successfully!</h3>
                <p className="text-slate-600 text-xs max-w-xs leading-relaxed">
                  Thank you for reaching out. Our engineering team will review your inquiry and get back to you within 24 hours.
                </p>
              </div>
            )}

            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  {mainMessage}
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <span>Mail us at</span>
                  <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline font-bold">
                    {contactEmail}
                  </a>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold text-[10px] uppercase tracking-wider mr-1">OR</span>
                <a 
                  href="https://x.com/CoreSlashTech" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 flex items-center justify-center border border-slate-200/70 transition-all"
                >
                  <FaTwitter className="w-3 h-3 text-blue-400" />
                </a>
                <a 
                  href="https://www.instagram.com/coreslashtechnologies?igsh=MWRmaTN2am1wNG1kdw%3D%3D&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-pink-50 text-slate-600 hover:text-pink-600 flex items-center justify-center border border-slate-200/70 transition-all"
                >
                  <FaInstagram className="w-3 h-3 text-pink-500" />
                </a>
                <a 
                  href="https://www.facebook.com/profile.php?id=61591466563226" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 flex items-center justify-center border border-slate-200/70 transition-all"
                >
                  <FaFacebookF className="w-3 h-3 text-blue-600" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/coreslash-technologies/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 flex items-center justify-center border border-slate-200/70 transition-all"
                >
                  <FaLinkedinIn className="w-3 h-3 text-blue-600" />
                </a>
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Leave us a brief message</p>
              
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-xs font-semibold text-slate-700">Your Name *</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="h-9 text-xs rounded-lg bg-slate-50/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all" 
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-xs font-semibold text-slate-700">Email Address *</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    placeholder="john@company.com" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="h-9 text-xs rounded-lg bg-slate-50/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all" 
                  />
                </div>
              </div>

              {/* Service Selection Dropdown */}
              <div className="space-y-1">
                <Label htmlFor="service" className="text-xs font-semibold text-slate-700">I'm looking for...</Label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full h-9 rounded-lg bg-slate-50/80 border border-slate-200 text-slate-900 text-xs px-3 pr-8 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer transition-all outline-none"
                  >
                    <option value="" disabled>-- Select a digital service division --</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Project Description Textarea */}
              <div className="space-y-1">
                <Label htmlFor="message" className="text-xs font-semibold text-slate-700">Briefly describe your project idea... *</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us about your requirements, goals, or timeline..."
                  className="min-h-[65px] h-[65px] text-xs rounded-lg bg-slate-50/80 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 font-medium transition-all resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-10 text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-1"
              >
                <span>Send a message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
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
