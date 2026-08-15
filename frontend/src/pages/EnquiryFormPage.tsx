import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { PremiumContactForm } from "@/components/PremiumContactForm";

const CONFETTI_COLORS = ["#818cf8", "#c084fc", "#38bdf8", "#34d399", "#f472b6", "#a78bfa"];

function ConfettiEffect() {
  const pieces = Array.from({ length: 75 });
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((_, i) => {
        const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
        const randomX = Math.random() * 100;
        const randomY = Math.random() * -50;
        const randomRotation = Math.random() * 720;
        const randomScale = 0.5 + Math.random() * 0.7;
        const randomDelay = Math.random() * 0.4;
        const randomDuration = 2.5 + Math.random() * 2;

        return (
          <motion.div
            key={i}
            initial={{
              x: `${randomX}vw`,
              y: `${randomY}vh`,
              opacity: 1,
              rotate: 0,
              scale: randomScale,
            }}
            animate={{
              y: ["0vh", "115vh"],
              rotate: randomRotation,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: randomDuration,
              ease: "easeOut",
              delay: randomDelay,
              repeat: Infinity,
              repeatDelay: Math.random() * 1.5,
            }}
            style={{
              position: "absolute",
              width: i % 2 === 0 ? "10px" : "6px",
              height: i % 3 === 0 ? "14px" : "7px",
              backgroundColor: color,
              borderRadius: i % 4 === 0 ? "50%" : "2px",
            }}
          />
        );
      })}
    </div>
  );
}

export default function EnquiryFormPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1: Phone State
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

  // Automatic 5-second redirect countdown after successful submission
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSubmitted && countdown === 0) {
      navigate("/");
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isSubmitted, countdown, navigate]);

  // Clean and format Indian phone number
  const formatIndianPhone = (rawPhone: string): string => {
    const digits = rawPhone.replace(/\D/g, "");
    if (digits.startsWith("91") && digits.length === 12) return digits.slice(2);
    if (digits.length === 10) return digits;
    return digits;
  };

  const validatePhone = (rawPhone: string): boolean => {
    const cleaned = formatIndianPhone(rawPhone);
    return /^[6-9]\d{9}$/.test(cleaned);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);

    if (!phone.trim()) {
      setPhoneError("Mobile number is required.");
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setStep(2);
  };

  const formattedPhoneString = `+91 ${formatIndianPhone(phone)}`;

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-[#f8fafc] text-slate-900 py-8 px-4 relative overflow-hidden">
      <Helmet>
        <title>Quick Enquiry | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Submit a quick project enquiry to CoreSlash Technologies. Get a custom quote for AI automation, web development, app development, or software solutions."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/enquiry-form" />
      </Helmet>

      {/* Confetti Animation when Submitted */}
      {isSubmitted && <ConfettiEffect />}

      {/* Main Header Matching CoreSlash Branding */}
      <div className="text-center mb-6 max-w-xl mx-auto z-10">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
          CoreSlash <span className="text-[#6366f1]">Technologies</span>
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-2.5 font-medium">
          Building Digital Solutions That Drive Innovation & Growth.
        </p>
      </div>

      {/* Success Screen Matching Screenshot Exactly */}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-[480px] bg-white rounded-[28px] p-8 sm:p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100/90 z-30"
        >
          {/* Green Check Circle Icon */}
          <div className="w-20 h-20 rounded-full bg-[#e6fcf5] text-[#22c55e] flex items-center justify-center mx-auto mb-6 shadow-sm border border-[#bbf7d0]">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Party Title */}
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3 flex items-center justify-center gap-2">
            <span>🎉</span> Thank You!
          </h2>

          {/* Subtitle */}
          <p className="text-slate-500 text-xs sm:text-sm md:text-base font-medium leading-relaxed max-w-xs sm:max-w-sm mx-auto mb-8">
            Our team has successfully received your inquiry.<br />
            We will get back to you shortly.
          </p>

          {/* Countdown Display */}
          <div className="mb-8 space-y-2">
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-400 block">
              REDIRECTING TO HOME IN
            </span>
            
            <div className="flex items-baseline justify-center gap-1 font-black">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={countdown}
                  initial={{ opacity: 0, y: -12, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.85 }}
                  transition={{ duration: 0.2 }}
                  className="text-5xl sm:text-6xl font-black text-[#818cf8] tracking-tighter"
                >
                  {countdown}
                </motion.span>
              </AnimatePresence>
              <span className="text-xs sm:text-sm font-bold text-slate-400 ml-1">sec</span>
            </div>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="w-full py-3.5 rounded-2xl bg-[#f8fafc] hover:bg-slate-100 active:scale-[0.99] border border-slate-200 text-slate-700 font-extrabold text-sm sm:text-base transition-all shadow-sm cursor-pointer"
          >
            Back to Home
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Welcome & Phone Input Card */}
          {step === 1 && (
            <motion.div
              key="step1-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-[480px] bg-white rounded-[28px] p-6 sm:p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100/80 z-10"
            >
              <form onSubmit={handlePhoneSubmit} className="space-y-5">
                <div className="text-center space-y-1 mb-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome</h2>
                  <p className="text-slate-500 text-xs sm:text-sm">Enter your mobile number to get started.</p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center bg-[#f8fafc] border border-slate-200/90 rounded-2xl px-4 py-3.5 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
                    <span className="text-xs sm:text-sm font-extrabold text-slate-600 mr-3 select-none flex items-center gap-1.5 border-r border-slate-300 pr-3 whitespace-nowrap shrink-0">
                      IN +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneError) setPhoneError(null);
                      }}
                      placeholder="00000 00000"
                      autoFocus
                      required
                      className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 font-bold text-sm sm:text-base outline-none tracking-wide"
                    />
                  </div>

                  {phoneError && (
                    <p className="text-xs font-bold text-red-500 flex items-center gap-1 pt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {phoneError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 active:scale-[0.99] text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Proceed →</span>
                </button>
              </form>
            </motion.div>
          )}

          {/* STEP 2: Website Contact Form (PremiumContactForm) */}
          {step === 2 && (
            <motion.div
              key="step2-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-[720px] z-10"
            >
              <PremiumContactForm
                initialPhone={formattedPhoneString}
                onBack={() => setStep(1)}
                onSuccess={() => {
                  setIsSubmitted(true);
                  setCountdown(5);
                }}
                source="qr_enquiry_form"
              />
            </motion.div>
          )}

        </AnimatePresence>
      )}

    </div>
  );
}
