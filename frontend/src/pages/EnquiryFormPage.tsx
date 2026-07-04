import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto my-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight mb-4">
            CoreSlash <span className="text-primary-purple">Technologies</span>
          </h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl mx-auto">
            Building Digital Solutions That Drive Innovation & Growth.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-md w-full mx-auto bg-white p-8 sm:p-10 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">
                  Welcome
                </h2>
                <p className="text-gray-500 font-medium">
                  Enter your mobile number to get started.
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
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-[5.5rem] pr-4 text-gray-900 font-bold tracking-widest placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                    placeholder="00000 00000"
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                    }}
                  />
                  {mobileErrors.mobile && (
                    <p className="absolute top-full mt-1 left-2 text-red-500 text-sm font-medium">
                      {mobileErrors.mobile.message}
                    </p>
                  )}
                </div>
                <div className="pt-4">

                  <button
                    type="submit"
                    disabled={!isMobileValid || (mobileValue?.length || 0) < 10}
                    className="w-full py-4 bg-secondary-indigo text-white rounded-2xl font-bold text-lg tracking-wide hover:bg-primary-purple shadow-lg shadow-secondary-indigo/20 hover:shadow-primary-purple/30 disabled:opacity-50 disabled:shadow-none disabled:hover:bg-secondary-indigo transition-all duration-300 mt-4"
                  >
                    Proceed &rarr;
                  </button>
                </div>
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
              className="max-w-3xl w-full mx-auto bg-white p-8 sm:p-12 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50"
            >
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-3">
                  Project Details
                </h2>
                <p className="text-gray-500 font-medium">
                  Tell us a bit about you and what you're looking for.
                </p>
              </div>

              {submitError && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm font-medium flex items-center">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleMainSubmit(onMainSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Full Name */}
                  <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Full Name <span className="text-primary-purple">*</span>
                    </label>
                    <input
                      type="text"
                      {...registerMain("fullName")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium"
                      placeholder="John Doe"
                    />
                    {mainErrors.fullName && (
                      <p className="text-red-500 text-xs font-medium mt-2">
                        {mainErrors.fullName.message}
                      </p>
                    )}
                  </div>

                  {/* Mobile Number (Prefilled) */}
                  <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Mobile Number <span className="text-primary-purple">*</span>
                    </label>
                    <div className="flex">
                      <div className="bg-gray-100 border border-gray-200 border-r-0 rounded-l-xl py-3 px-4 text-gray-500 font-bold flex items-center justify-center">
                        +91
                      </div>
                      <input
                        type="text"
                        readOnly
                        {...registerMain("mobile")}
                        className="w-full bg-gray-100 border border-gray-200 rounded-r-xl py-3 px-4 text-gray-600 font-bold tracking-widest focus:outline-none cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Email Address <span className="text-primary-purple">*</span>
                    </label>
                    <input
                      type="email"
                      {...registerMain("email")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium"
                      placeholder="john@example.com"
                    />
                    {mainErrors.email && (
                      <p className="text-red-500 text-xs font-medium mt-2">
                        {mainErrors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Organization */}
                  <div className="relative">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                      Company / College
                    </label>
                    <input
                      type="text"
                      {...registerMain("organization")}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all font-medium"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Services Checkboxes */}
                <div className="pt-6 border-t border-gray-100">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-5">
                    What service are you looking for? <span className="text-primary-purple">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${isChecked
                                  ? "bg-secondary-indigo/5 border-secondary-indigo text-secondary-indigo shadow-md shadow-secondary-indigo/10"
                                  : "bg-white border-gray-100 hover:border-gray-300 hover:bg-gray-50 text-gray-700"
                                  }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked
                                    ? "bg-secondary-indigo border-secondary-indigo text-white"
                                    : "border-gray-300 bg-white"
                                    }`}
                                >
                                  {isChecked && <CheckCircleIcon className="w-4 h-4" strokeWidth={3} />}
                                </div>
                                <span className="font-medium text-sm">
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
                    <p className="text-red-500 text-sm font-medium mt-3">
                      {mainErrors.services.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-secondary-indigo text-white rounded-2xl font-bold text-lg tracking-wide hover:bg-primary-purple shadow-lg shadow-secondary-indigo/20 hover:shadow-primary-purple/30 disabled:opacity-70 disabled:shadow-none transition-all duration-300 mt-10 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
              variants={pageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="max-w-lg w-full mx-auto bg-white p-12 border border-gray-100 rounded-3xl shadow-xl shadow-gray-200/50 flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              {/* Soft decorative background element */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-secondary-indigo/5 to-transparent" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-green-50 border-2 border-green-100 flex items-center justify-center mb-6 relative z-10"
              >
                <CheckCircleIcon className="w-12 h-12 text-green-500" strokeWidth={2} />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl font-black text-gray-900 tracking-tight mb-4 relative z-10"
              >
                🎉 Thank You!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 font-medium mb-10 relative z-10 text-lg leading-relaxed"
              >
                Our team has successfully received your inquiry.
                We will get back to you shortly.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-10 w-full relative z-10"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  Redirecting to Home in
                </p>
                <div className="text-5xl font-black text-primary-purple tabular-nums tracking-tighter">
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
                  <span className="text-xl text-gray-300 ml-2 font-medium">sec</span>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={() => navigate("/")}
                className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-2xl font-bold tracking-wide border border-gray-200 transition-all duration-300 relative z-10"
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
