import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

// --- VALIDATION SCHEMAS ---
const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
});

const inquirySchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  organization: z.string().optional(),
  services: z.array(z.string()).min(1, "Please select at least one service"),
});

type MobileFormValues = z.infer<typeof mobileSchema>;
type InquiryFormValues = z.infer<typeof inquirySchema>;

const SERVICES_OPTIONS = [
  "AI & Automation",
  "Custom Software Solutions",
  "Cloud Infrastructure",
  "Mobile Applications",
  "UI/UX Design",
  "Web Solutions",
];

export default function EnquiryFormPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  // Mobile Form
  const {
    register: registerMobile,
    handleSubmit: handleMobileSubmit,
    formState: { errors: mobileErrors, isValid: isMobileValid },
    watch: watchMobile,
  } = useForm<MobileFormValues>({
    resolver: zodResolver(mobileSchema),
    mode: "onChange",
  });

  const mobileValue = watchMobile("mobile");

  // Main Form
  const {
    register: registerMain,
    handleSubmit: handleMainSubmit,
    control,
    setValue: setMainValue,
    formState: { errors: mainErrors },
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    mode: "onChange",
    defaultValues: {
      services: [],
    },
  });

  // Pre-fill mobile number when moving to step 2
  useEffect(() => {
    if (step === 2) {
      setMainValue("mobile", mobileNumber);
    }
  }, [step, mobileNumber, setMainValue]);

  // Countdown and redirect logic for step 3
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (step === 3 && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (step === 3 && countdown === 0) {
      navigate("/");
    }
    return () => clearTimeout(timer);
  }, [step, countdown, navigate]);

  const onMobileSubmit = (data: MobileFormValues) => {
    setMobileNumber(data.mobile);
    setStep(2);
  };

  const onMainSubmit = async (data: InquiryFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const { envConfig } = await import("../config/env.config");
      const response = await fetch(`${envConfig.apiUrl}/inquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      setStep(3);
      triggerConfetti();
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#22D3EE", "#8B5CF6", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Close functionality just navigates back to Home since it's a page
  const handleClose = () => {
    navigate("/");
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-dark-black/60 backdrop-blur-md p-4">
      {/* Background click listener */}
      <div className="absolute inset-0" onClick={handleClose}></div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md p-8 glass border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="text-center mb-8 mt-2">
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                Let's Get Started
              </h2>
              <p className="text-white/60 font-medium">
                Enter your mobile number to continue.
              </p>
            </div>

            <form onSubmit={handleMobileSubmit(onMobileSubmit)} className="space-y-6">
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-white/50 font-bold border-r border-white/10 pr-3">
                  🇮🇳 +91
                </div>
                <input
                  type="text"
                  maxLength={10}
                  {...registerMobile("mobile")}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-[5.5rem] pr-4 text-white font-bold tracking-widest placeholder:text-white/20 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                  placeholder="00000 00000"
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                  }}
                />
                {mobileErrors.mobile && (
                  <p className="absolute -bottom-6 left-2 text-red-400 text-xs font-medium">
                    {mobileErrors.mobile.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!isMobileValid || (mobileValue?.length || 0) < 10}
                className="w-full py-4 bg-white text-dark-black rounded-2xl font-black text-lg tracking-wide hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-50 disabled:hover:bg-white disabled:hover:shadow-none transition-all duration-300 mt-4"
              >
                Proceed &rarr;
              </button>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-2xl p-6 sm:p-10 glass border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="mb-8">
              <h2 className="text-3xl font-black text-white tracking-tight mb-2">
                Project Details
              </h2>
              <p className="text-white/60 font-medium">
                Tell us a bit about you and what you're looking for.
              </p>
            </div>

            {submitError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                {submitError}
              </div>
            )}

            <form onSubmit={handleMainSubmit(onMainSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Full Name <span className="text-accent-cyan">*</span>
                  </label>
                  <input
                    type="text"
                    {...registerMain("fullName")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                    placeholder="John Doe"
                  />
                  {mainErrors.fullName && (
                    <p className="text-red-400 text-xs font-medium mt-1">
                      {mainErrors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Mobile Number (Prefilled) */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Mobile Number <span className="text-accent-cyan">*</span>
                  </label>
                  <div className="flex">
                    <div className="bg-white/5 border border-white/10 border-r-0 rounded-l-xl py-3 px-3 text-white/50 font-bold flex items-center justify-center">
                      +91
                    </div>
                    <input
                      type="text"
                      readOnly
                      {...registerMain("mobile")}
                      className="w-full bg-white/10 border border-white/10 rounded-r-xl py-3 px-4 text-white/70 font-bold tracking-widest focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Email Address <span className="text-accent-cyan">*</span>
                  </label>
                  <input
                    type="email"
                    {...registerMain("email")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                    placeholder="john@example.com"
                  />
                  {mainErrors.email && (
                    <p className="text-red-400 text-xs font-medium mt-1">
                      {mainErrors.email.message}
                    </p>
                  )}
                </div>

                {/* Organization */}
                <div className="relative">
                  <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-2">
                    Company / College
                  </label>
                  <input
                    type="text"
                    {...registerMain("organization")}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent-cyan/50 focus:ring-1 focus:ring-accent-cyan/50 transition-all"
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Services Checkboxes */}
              <div className="pt-4 border-t border-white/10">
                <label className="block text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
                  What service are you looking for? <span className="text-accent-cyan">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Controller
                    name="services"
                    control={control}
                    render={({ field }) => (
                      <>
                        {SERVICES_OPTIONS.map((service) => {
                          const isChecked = field.value.includes(service);
                          return (
                            <label
                              key={service}
                              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                isChecked
                                  ? "bg-accent-cyan/10 border-accent-cyan/50 shadow-[0_0_15px_rgba(34,211,238,0.15)]"
                                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  isChecked
                                    ? "bg-accent-cyan border-accent-cyan text-dark-black"
                                    : "border-white/30 bg-transparent"
                                }`}
                              >
                                {isChecked && <CheckCircleIcon className="w-4 h-4" />}
                              </div>
                              <span className={`font-medium ${isChecked ? "text-white" : "text-white/70"}`}>
                                {service}
                              </span>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={isChecked}
                                onChange={(e) => {
                                  const newValue = e.target.checked
                                    ? [...field.value, service]
                                    : field.value.filter((v) => v !== service);
                                  field.onChange(newValue);
                                }}
                              />
                            </label>
                          );
                        })}
                      </>
                    )}
                  />
                </div>
                {mainErrors.services && (
                  <p className="text-red-400 text-xs font-medium mt-2">
                    {mainErrors.services.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-white text-dark-black rounded-2xl font-black text-lg tracking-wide hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] disabled:opacity-70 disabled:hover:bg-white disabled:hover:shadow-none transition-all duration-300 mt-8 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-dark-black/30 border-t-dark-black rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </form>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-md p-10 glass border border-white/10 rounded-[2rem] shadow-[0_0_50px_rgba(34,211,238,0.15)] flex flex-col items-center justify-center text-center overflow-hidden"
          >
            {/* Animated Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/10 to-transparent opacity-50" />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" as const, damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 rounded-full bg-accent-cyan/20 border border-accent-cyan/50 flex items-center justify-center mb-6 relative z-10"
            >
              <CheckCircleIcon className="w-12 h-12 text-accent-cyan" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-black text-white tracking-tight mb-4 relative z-10"
            >
              🎉 Thank You!
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/70 font-medium mb-8 relative z-10"
            >
              Our team has successfully received your inquiry.
              We will get back to you shortly.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8 w-full relative z-10"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                Redirecting to Home in
              </p>
              <div className="text-5xl font-black text-accent-cyan tabular-nums tracking-tighter">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={countdown}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    {countdown}
                  </motion.span>
                </AnimatePresence>
                <span className="text-xl text-white/30 ml-2">sec</span>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={() => navigate("/")}
              className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold tracking-wide border border-white/10 hover:border-white/30 transition-all duration-300 relative z-10"
            >
              OK
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
