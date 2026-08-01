"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  MessageSquare,
  CheckCircle2,
  Calendar,
  ArrowRight,
  ChevronDown,
} from "lucide-react";

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  industry: string;
  projectDetails: string;
}

const INDUSTRIES = [
  "Manufacturing",
  "Healthcare",
  "Education",
  "Retail & E-commerce",
  "Finance",
  "Real Estate",
  "Hospitality",
  "Logistics",
  "IT & Software",
  "Construction",
  "Automotive",
  "Other",
];

export const ContactFormSession: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    industry: "",
    projectDetails: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectIndustry = (industry: string) => {
    setFormData((prev) => ({ ...prev, industry }));
    setIsIndustryOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* Background Animated Glow Elements */}
      <div className="absolute -top-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Main Glassmorphic Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 bg-card/70 backdrop-blur-2xl border border-border/60 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Header Badge, Title & Subtitle */}
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold uppercase tracking-widest text-blue-400 mb-3"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>BOOK A FREE SESSION</span>
                </motion.div>

                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                  Book a Free Session
                </h3>
                <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                  Get a personalized growth roadmap in 30 minutes.
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* 1. Full Name */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-500" />
                    <span>Full Name *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter Your Name"
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* 2. Work Email */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-blue-500" />
                    <span>Work Email *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Your Email"
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* 3. Phone Number */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-500" />
                    <span>Phone Number *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 00000 00000"
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>

                {/* 4. Location */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" />
                    <span>Location *</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter Your Location"
                      className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* 5. Industry Dropdown Select */}
              <div className="space-y-2 relative">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-500" />
                  <span>Select Industry *</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsIndustryOpen((prev) => !prev)}
                    className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 text-foreground text-left text-sm flex items-center justify-between focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                  >
                    <span className={formData.industry ? "text-foreground font-medium" : "text-muted-foreground/60"}>
                      {formData.industry || "Choose industry..."}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isIndustryOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {isIndustryOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 z-50 max-h-56 overflow-y-auto bg-card border border-border rounded-xl shadow-2xl p-1 backdrop-blur-xl"
                      >
                        {INDUSTRIES.map((ind) => (
                          <button
                            key={ind}
                            type="button"
                            onClick={() => handleSelectIndustry(ind)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                              formData.industry === ind
                                ? "bg-blue-500/20 text-blue-400 font-semibold"
                                : "text-foreground hover:bg-muted"
                            }`}
                          >
                            {ind}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* 6. Project Details Textarea */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                  <span>Project Details</span>
                </label>
                <textarea
                  name="projectDetails"
                  rows={5}
                  value={formData.projectDetails}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project, goals, requirements, or challenges..."
                  className="w-full px-4 py-3 rounded-xl bg-background/60 border border-border/60 text-foreground placeholder:text-muted-foreground/60 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
              </div>

              {/* Submit Primary Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Booking...</span>
                  </span>
                ) : (
                  <>
                    <span>Book Free Consultation</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>

              {/* Perks Guarantee List Below Button */}
              <div className="pt-4 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center sm:text-left text-xs font-medium text-muted-foreground">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free 30-Minute Consultation</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>No Commitment Required</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Response Within 24 Hours</span>
                </div>
              </div>
            </motion.form>
          ) : (
            /* Success Message Card */
            <motion.div
              key="success"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-12 px-6 text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">
                Session Requested!
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                Thank you, <span className="font-semibold text-foreground">{formData.fullName || "there"}</span>. Our senior technical strategist will review your project details and get back to you at <span className="text-blue-400 font-medium">{formData.email}</span> within 24 hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: "",
                    email: "",
                    phone: "",
                    location: "",
                    industry: "",
                    projectDetails: "",
                  });
                }}
                className="mt-6 px-6 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-sm font-semibold text-foreground transition-all cursor-pointer"
              >
                Book Another Session
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ContactFormSession;
