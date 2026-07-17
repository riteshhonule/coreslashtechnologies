import { useForm } from "react-hook-form";
import { submitContact } from "../lib/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  message: string;
};

interface ContactFormProps {
  variant?: "default" | "glass" | "dark";
  onSuccess?: () => void;
  service?: string;
  isSidebar?: boolean;
}

export default function ContactForm({ variant = "default", onSuccess, service, isSidebar }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isDark = variant === "dark";
  const labelColor = isDark ? "text-white/30" : "text-gray-500";
  const optionClass = isDark ? "bg-dark-black text-white" : "bg-white text-gray-900";
  const arrowColor = isDark ? "text-white/30" : "text-gray-400";

  const onSubmit = async (data: ContactFormData) => {
    try {
      setStatus("loading");
      
      // Submit to backend in the background without blocking the UI
      submitContact({ ...data, service }).catch((error) => {
        console.error("Background form submission error:", error);
      });

      // transition immediately to success overlay for instant response feel
      setTimeout(() => {
        setStatus("success");
        reset();
        if (onSuccess) onSuccess();
      }, 150);
    } catch (error: any) {
      setStatus("error");
      setErrorMsg("An error occurred. Please try again.");
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 5000);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-xl z-20 rounded-3xl bg-dark-black/90 border border-accent-cyan/20"
          >
            <div className="p-4 rounded-full mb-4 bg-accent-cyan/10 border border-accent-cyan/20">
              <svg className="w-12 h-12 text-accent-cyan" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Strategy Secured!</h3>
            <p className="text-white/60">We'll reach out within 24 hours.</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <div className={isSidebar ? "space-y-3" : "grid md:grid-cols-2 gap-3"}>
          <div className="space-y-0.5">
            <label htmlFor="name" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Full Name</label>
            <input
              id="name"
              placeholder="Enter Your Name"
              className={`glass-input ${errors.name ? "border-red-500/50 focus:border-red-500 bg-red-500/5" : ""}`}
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" }
              })}
            />
            {errors.name && (
              <span className="text-red-400 text-[10px] font-bold ml-1 block mt-0.5">{errors.name.message}</span>
            )}
          </div>

          <div className="space-y-0.5">
            <label htmlFor="email" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Work Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Your Email"
              className={`glass-input ${errors.email ? "border-red-500/50 focus:border-red-500 bg-red-500/5" : ""}`}
              {...register("email", {
                required: "Work email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email address"
                }
              })}
            />
            {errors.email && (
              <span className="text-red-400 text-[10px] font-bold ml-1 block mt-0.5">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className={isSidebar ? "space-y-3" : "grid md:grid-cols-2 gap-3"}>
          <div className="space-y-0.5">
            <label htmlFor="phone" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Phone Number</label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              placeholder="+91 00000 00000"
              className={`glass-input ${errors.phone ? "border-red-500/50 focus:border-red-500 bg-red-500/5" : ""}`}
              {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 6, message: "Phone number must be at least 6 characters" },
                maxLength: { value: 30, message: "Phone number cannot exceed 30 characters" }
              })}
            />
            {errors.phone && (
              <span className="text-red-400 text-[10px] font-bold ml-1 block mt-0.5">{errors.phone.message}</span>
            )}
          </div>

          <div className="space-y-0.5">
            <label htmlFor="address" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Location</label>
            <input
              id="address"
              placeholder="Enter Your Location"
              className={`glass-input ${errors.address ? "border-red-500/50 focus:border-red-500 bg-red-500/5" : ""}`}
              {...register("address", {
                required: "Location is required",
                minLength: { value: 2, message: "Location must be at least 2 characters" }
              })}
            />
            {errors.address && (
              <span className="text-red-400 text-[10px] font-bold ml-1 block mt-0.5">{errors.address.message}</span>
            )}
          </div>
        </div>

        <div className="space-y-0.5">
          <label htmlFor="businessType" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Select Industry</label>
          <div className="relative">
            <select
              id="businessType"
              aria-label="Select Industry"
              className={`glass-input appearance-none cursor-pointer ${errors.businessType ? "border-red-500/50 focus:border-red-500 bg-red-500/5" : ""}`}
              {...register("businessType", { required: "Please select your industry" })}
              defaultValue=""
            >
              <option value="" disabled className={optionClass}>Choose industry...</option>
              <option value="E-commerce" className={optionClass}>E-commerce</option>
              <option value="Real Estate" className={optionClass}>Real Estate</option>
              <option value="Education" className={optionClass}>Education</option>
              <option value="Healthcare" className={optionClass}>Healthcare</option>
              <option value="Other" className={optionClass}>Other</option>
            </select>
            <div className={`absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none ${arrowColor}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </div>
          </div>
          {errors.businessType && (
            <span className="text-red-400 text-[10px] font-bold ml-1 block mt-0.5">{errors.businessType.message}</span>
          )}
        </div>

        <div className="space-y-0.5">
          <label htmlFor="message" className={`text-[10px] font-bold ${labelColor} uppercase tracking-[0.2em] ml-1`}>Project Details</label>
          <textarea
            id="message"
            rows={2}
            placeholder="Describe your vision and technical requirements..."
            className={`glass-input resize-none ${errors.message ? "border-red-500/50 focus:border-red-500 bg-red-500/5" : ""}`}
            {...register("message", {
              required: "Project details are required",
              minLength: { value: 3, message: "Message must be at least 3 characters" }
            })}
          />
          {errors.message && (
            <span className="text-red-400 text-[10px] font-bold ml-1 block mt-0.5">{errors.message.message}</span>
          )}
        </div>

        <div className="flex justify-center w-full mt-2">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            disabled={status === "loading"}
            className="btn-pill btn-primary-glow text-white text-sm py-2.5 px-10 shadow-2xl"
          >
            {status === "loading" ? "Processing..." : "Submit"}
          </motion.button>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-sm font-bold text-center animate-pulse">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}


