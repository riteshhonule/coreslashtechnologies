import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MapPin, Building, MessageSquare, ChevronDown, Check, ArrowRight, Loader2 } from "lucide-react";
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

export function PremiumContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    industry: "",
    details: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const [industrySearch, setIndustrySearch] = useState("");

  const filteredIndustries = INDUSTRIES.filter(i => 
    i.toLowerCase().includes(industrySearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({
        name: "", email: "", phone: "", location: "", industry: "", details: ""
      });
      alert("Consultation requested successfully!");
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const badges = [
    "Free 30-Minute Consultation",
    "No Commitment Required",
    "Response Within 24 Hours"
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative p-8 md:p-10 rounded-[28px] overflow-visible z-10"
        style={{
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 20px 40px -20px rgba(0,0,0,0.5), inset 0 1px 0 0 rgba(255,255,255,0.1)"
        }}
      >
        {/* Soft glow behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none -z-10" />

        <div className="mb-8">
          <h3 className="text-3xl font-semibold text-white tracking-tight mb-2">
            Start Your Project
          </h3>
          <p className="text-white/60 text-sm md:text-base">
            Fill in the details below and we'll get back to you shortly.
          </p>
        </div>

        <motion.form 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onSubmit={handleSubmit} 
          className="space-y-5"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div variants={itemVariants} className="relative group">

              <div className={cn(
                "relative flex items-center bg-white/[0.03] rounded-[20px] border border-white/10 transition-colors duration-300 overflow-hidden",
                focusedField === 'name' ? "border-blue-400/50 bg-white/[0.05]" : "hover:border-white/20"
              )}>
                <div className="pl-4 pr-3 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 pr-4 text-white text-sm outline-none placeholder:text-transparent peer"
                  required
                />
                <label className={cn(
                  "absolute left-11 text-white/50 text-sm pointer-events-none transition-all duration-300",
                  (focusedField === 'name' || formData.name) ? "text-[10px] -translate-y-3" : "translate-y-0"
                )}>
                  Full Name
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">

              <div className={cn(
                "relative flex items-center bg-white/[0.03] rounded-[20px] border border-white/10 transition-colors duration-300 overflow-hidden",
                focusedField === 'email' ? "border-blue-400/50 bg-white/[0.05]" : "hover:border-white/20"
              )}>
                <div className="pl-4 pr-3 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 pr-4 text-white text-sm outline-none placeholder:text-transparent peer"
                  required
                />
                <label className={cn(
                  "absolute left-11 text-white/50 text-sm pointer-events-none transition-all duration-300",
                  (focusedField === 'email' || formData.email) ? "text-[10px] -translate-y-3" : "translate-y-0"
                )}>
                  Work Email
                </label>
              </div>
            </motion.div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div variants={itemVariants} className="relative group">

              <div className={cn(
                "relative flex items-center bg-white/[0.03] rounded-[20px] border border-white/10 transition-colors duration-300 overflow-hidden",
                focusedField === 'phone' ? "border-blue-400/50 bg-white/[0.05]" : "hover:border-white/20"
              )}>
                <div className="pl-4 pr-3 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 pr-4 text-white text-sm outline-none placeholder:text-transparent peer"
                />
                <label className={cn(
                  "absolute left-11 text-white/50 text-sm pointer-events-none transition-all duration-300",
                  (focusedField === 'phone' || formData.phone) ? "text-[10px] -translate-y-3" : "translate-y-0"
                )}>
                  Phone Number
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">

              <div className={cn(
                "relative flex items-center bg-white/[0.03] rounded-[20px] border border-white/10 transition-colors duration-300 overflow-hidden",
                focusedField === 'location' ? "border-blue-400/50 bg-white/[0.05]" : "hover:border-white/20"
              )}>
                <div className="pl-4 pr-3 text-white/40 group-focus-within:text-blue-400 transition-colors">
                  <MapPin size={18} />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('location')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 pr-4 text-white text-sm outline-none placeholder:text-transparent peer"
                />
                <label className={cn(
                  "absolute left-11 text-white/50 text-sm pointer-events-none transition-all duration-300",
                  (focusedField === 'location' || formData.location) ? "text-[10px] -translate-y-3" : "translate-y-0"
                )}>
                  Location
                </label>
              </div>
            </motion.div>
          </div>

          {/* Row 3 - Industry Custom Select */}
          <motion.div variants={itemVariants} className="relative group">

            <div 
              className={cn(
                "relative flex items-center bg-white/[0.03] rounded-[20px] border border-white/10 transition-colors duration-300 overflow-visible cursor-pointer",
                isIndustryOpen ? "border-blue-400/50 bg-white/[0.05]" : "hover:border-white/20"
              )}
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
            >
              <div className={cn("pl-4 pr-3 transition-colors", isIndustryOpen ? "text-blue-400" : "text-white/40")}>
                <Building size={18} />
              </div>
              
              <div className="w-full py-4 pr-4 text-sm relative flex items-center justify-between">
                <span className={cn("transition-colors", formData.industry ? "text-white" : "text-white/0")}>
                  {formData.industry || "Industry"}
                </span>
                <ChevronDown size={16} className={cn("text-white/40 transition-transform duration-300", isIndustryOpen && "rotate-180")} />
              </div>

              <label className={cn(
                "absolute left-11 text-white/50 text-sm pointer-events-none transition-all duration-300",
                (isIndustryOpen || formData.industry) ? "text-[10px] -translate-y-3" : "translate-y-0"
              )}>
                Industry
              </label>
            </div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isIndustryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 right-0 mt-2 p-2 bg-[#0a0d1a] border border-white/10 rounded-2xl shadow-2xl z-50 backdrop-blur-xl overflow-hidden"
                >
                  <input 
                    type="text" 
                    placeholder="Search industry..." 
                    value={industrySearch}
                    onChange={(e) => setIndustrySearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500/50 mb-2 placeholder:text-white/30"
                  />
                  <div className="max-h-[200px] overflow-y-auto custom-scrollbar pr-1 space-y-1">
                    {filteredIndustries.map(ind => (
                      <div
                        key={ind}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({ ...prev, industry: ind }));
                          setIsIndustryOpen(false);
                          setIndustrySearch("");
                        }}
                        className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-white/[0.06] cursor-pointer text-sm text-white/80 transition-colors"
                      >
                        {ind}
                        {formData.industry === ind && <Check size={14} className="text-blue-400" />}
                      </div>
                    ))}
                    {filteredIndustries.length === 0 && (
                      <div className="px-4 py-3 text-sm text-white/40 text-center">No industries found</div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Row 4 */}
          <motion.div variants={itemVariants} className="relative group">

            <div className={cn(
              "relative flex bg-white/[0.03] rounded-[20px] border border-white/10 transition-colors duration-300 overflow-hidden",
              focusedField === 'details' ? "border-blue-400/50 bg-white/[0.05]" : "hover:border-white/20"
            )}>
              <div className="pl-4 pr-3 pt-4 text-white/40 group-focus-within:text-blue-400 transition-colors">
                <MessageSquare size={18} />
              </div>
              <div className="relative w-full">
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('details')}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-transparent py-4 pr-4 text-white text-sm outline-none placeholder:text-transparent peer resize-none h-[120px]"
                />
                <label className={cn(
                  "absolute left-0 top-4 text-white/50 text-sm pointer-events-none transition-all duration-300",
                  (focusedField === 'details' || formData.details) ? "text-[10px] -translate-y-3" : "translate-y-0"
                )}>
                  Project Details
                </label>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              className="relative w-full h-[60px] rounded-full group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-90 group-hover:opacity-100 transition-opacity" />
              {/* Button Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-r from-purple-500 to-blue-500 transition-opacity duration-500 -z-10" />
              
              <div className="absolute inset-0 flex items-center justify-center font-medium text-white shadow-inner">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <span className="flex items-center gap-2 text-[15px] tracking-wide">
                    Book Free Consultation
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                )}
              </div>
              
              {/* Ripple / Highlight effect */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>

      {/* Bottom Badges */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-8 flex flex-wrap gap-3 justify-center"
      >
        {badges.map((badge, idx) => (
          <div key={idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Check size={10} className="text-white" strokeWidth={3} />
            </div>
            <span className="text-xs text-white/60 font-medium">{badge}</span>
          </div>
        ))}
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}} />
    </div>
  );
}
