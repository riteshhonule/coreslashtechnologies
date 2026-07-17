import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { CheckCircleIcon, SparklesIcon, CalendarIcon, BriefcaseIcon, AcademicCapIcon, MapPinIcon } from "@heroicons/react/24/outline";

// --- VALIDATION SCHEMAS ---
const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
});

const marketingInquirySchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  college: z.string().min(2, "College/Qualification is required"),
  mode: z.enum(["Work From Home", "Office"]),
  focusAreas: z.array(z.string()).min(1, "Please select at least one focus area"),
  duration: z.string().min(1, "Please select a duration"),
});

type MobileFormValues = z.infer<typeof mobileSchema>;
type MarketingFormValues = z.infer<typeof marketingInquirySchema>;

const FOCUS_AREAS_OPTIONS = [
  "Marketing & Brand Promotion",
  "Lead Generation",
  "Client Communication",
  "Business Development",
  "Digital Marketing",
  "Sales Support"
];

export default function MarketingEnquiryPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [countdown, setCountdown] = useState(6);
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
  } = useForm<MarketingFormValues>({
    resolver: zodResolver(marketingInquirySchema),
    mode: "onChange",
    defaultValues: {
      focusAreas: [],
      mode: "Work From Home",
      duration: "3 Months",
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

  const onMainSubmit = async (data: MarketingFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const { envConfig } = await import("../config/env.config");
      const response = await fetch(`${envConfig.apiUrl}/marketing-inquiries`, {
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
    const colors = ["#2563EB", "#7C3AED", "#14B8A6"];

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

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-4 pb-8 sm:py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl mx-auto mt-2 sm:mt-6 lg:mt-10">
        {/* Form Column */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full bg-white p-8 sm:p-10 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-4">
                    <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
                    <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.2em]">Quick Apply</span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
                    Start Your Application
                  </h2>
                  <p className="text-gray-500 font-medium">
                    Enter your mobile number to begin.
                  </p>
                </div>

                <form onSubmit={handleMobileSubmit(onMobileSubmit)} className="space-y-6">
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-500 font-bold border-r border-gray-200 pr-3">
                      🇮🇳 +91
                    </div>
                    <input
                      type="text"
                      maxLength={10}
                      {...registerMobile("mobile")}
                      placeholder="9876543210"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-[5.5rem] pr-4 text-gray-900 font-bold tracking-widest placeholder:text-gray-450 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                    />
                  </div>
                  {mobileErrors.mobile && (
                    <p className="text-sm font-bold text-red-500 mt-1 pl-1">
                      {mobileErrors.mobile.message}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!isMobileValid}
                    className="w-full py-4 px-6 bg-gradient-to-r from-primary-purple to-secondary-indigo hover:opacity-95 text-white font-bold rounded-2xl shadow-lg shadow-secondary-indigo/20 hover:shadow-xl hover:shadow-secondary-indigo/35 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Proceed
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full bg-white p-8 sm:p-10 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50"
              >
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">
                    Internship Details
                  </h2>
                  <p className="text-gray-500 font-medium">
                    Provide your background and interests.
                  </p>
                </div>

                <form onSubmit={handleMainSubmit(onMainSubmit)} className="space-y-6">
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-150 rounded-2xl text-sm font-bold text-red-600">
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                      <input
                        type="text"
                        {...registerMain("fullName")}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      />
                      {mainErrors.fullName && (
                        <p className="text-xs font-bold text-red-500 pl-1">{mainErrors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                      <input
                        type="email"
                        {...registerMain("email")}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      />
                      {mainErrors.email && (
                        <p className="text-xs font-bold text-red-500 pl-1">{mainErrors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">College & Degree</label>
                      <input
                        type="text"
                        {...registerMain("college")}
                        placeholder="BBA / B.Com / MBA - College Name"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      />
                      {mainErrors.college && (
                        <p className="text-xs font-bold text-red-500 pl-1">{mainErrors.college.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="mode" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Internship Mode</label>
                      <select
                        id="mode"
                        aria-label="Internship Mode"
                        {...registerMain("mode")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-gray-900 font-bold focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      >
                        <option value="Work From Home">Work From Home</option>
                        <option value="Office">Belagavi Office</option>
                      </select>
                      {mainErrors.mode && (
                        <p className="text-xs font-bold text-red-500 pl-1">{mainErrors.mode.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="duration" className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Internship Duration</label>
                      <select
                        id="duration"
                        aria-label="Internship Duration"
                        {...registerMain("duration")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-4 text-gray-900 font-bold focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      >
                        <option value="3 Months">3 Months</option>
                        <option value="6 Months">6 Months</option>
                        <option value="3-6 Months">3–6 Months</option>
                      </select>
                      {mainErrors.duration && (
                        <p className="text-xs font-bold text-red-500 pl-1">{mainErrors.duration.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Mobile Number (Pre-filled)</label>
                      <input
                        type="text"
                        disabled
                        value={`+91 ${mobileNumber}`}
                        className="w-full bg-gray-100 border border-gray-200 rounded-2xl py-3.5 px-4 text-gray-500 font-bold focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1 block">Areas of Interest (Select Focus Areas)</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {FOCUS_AREAS_OPTIONS.map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-2xl cursor-pointer transition-colors"
                        >
                          <Controller
                            name="focusAreas"
                            control={control}
                            render={({ field }) => (
                              <input
                                type="checkbox"
                                checked={field.value.includes(service)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    field.onChange([...field.value, service]);
                                  } else {
                                    field.onChange(field.value.filter((val: string) => val !== service));
                                  }
                                }}
                                className="w-5 h-5 text-primary-purple border-gray-300 rounded focus:ring-primary-purple/20 transition-all"
                              />
                            )}
                          />
                          <span className="text-sm font-semibold text-gray-700">{service}</span>
                        </label>
                      ))}
                    </div>
                    {mainErrors.focusAreas && (
                      <p className="text-xs font-bold text-red-500 pl-1">{mainErrors.focusAreas.message}</p>
                    )}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-4 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-2/3 py-4 px-6 bg-gradient-to-r from-primary-purple to-secondary-indigo hover:opacity-95 text-white font-bold rounded-2xl shadow-lg shadow-secondary-indigo/20 transition-all flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Profile"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full bg-white p-12 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto shadow-md">
                  <CheckCircleIcon className="w-10 h-10" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Application Submitted!</h2>
                  <p className="text-gray-500 font-medium">
                    Thank you for applying to the Marketing Internship Program. We have sent a confirmation email to you.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl text-xs font-semibold text-gray-500">
                  Redirecting you to the Matrix in <span className="text-primary-purple font-black text-sm">{countdown}</span> seconds...
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="py-3 px-8 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-colors"
                >
                  Return Immediately
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
