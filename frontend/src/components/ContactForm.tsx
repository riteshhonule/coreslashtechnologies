import { useForm } from "react-hook-form";
import { submitContact } from "../lib/api";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BriefcaseIcon,
  ChatBubbleLeftRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  message: string;
};

interface ContactFormProps {
  variant?: "default" | "glass";
  onSuccess?: () => void;
}

export default function ContactForm({ variant = "default", onSuccess }: ContactFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    try {
      setStatus("loading");
      await submitContact(data);
      setStatus("success");
      reset();
      if (onSuccess) onSuccess();
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error: any) {
      setStatus("error");
      const apiMessage = error.response?.data?.message;
      const displayMessage = Array.isArray(apiMessage) ? apiMessage[0] : apiMessage || "An error occurred. Please try again.";
      setErrorMsg(displayMessage);
      setTimeout(() => {
        setStatus("idle");
        setErrorMsg(null);
      }, 5000);
    }
  };

  const inputClasses = variant === "glass" 
    ? "w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
    : "w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none";

  const iconClasses = variant === "glass" ? "hidden" : "w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors";
  const textareaIconClasses = variant === "glass" ? "hidden" : "w-5 h-5 text-gray-400 absolute left-4 top-5 group-focus-within:text-indigo-600 transition-colors";

  return (
    <div className="relative overflow-hidden">
      {/* Success Animation Overlay */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-lg z-20 rounded-3xl ${variant === 'glass' ? 'bg-black/80 border border-white/10' : 'bg-white/95 border border-green-100'}`}
          >
            <div className={`p-4 rounded-full mb-4 ${variant === 'glass' ? 'bg-green-500/20' : 'bg-green-100'}`}>
              <svg className={`w-12 h-12 ${variant === 'glass' ? 'text-green-400' : 'text-green-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${variant === 'glass' ? 'text-white' : 'text-gray-900'}`}>Message Sent!</h3>
            <p className={variant === 'glass' ? 'text-gray-400' : 'text-gray-600'}>We'll get back to you shortly.</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Animation Overlay */}
      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-lg z-20 rounded-3xl ${variant === 'glass' ? 'bg-black/80 border border-white/10' : 'bg-white/95 border border-red-100'}`}
          >
            <div className={`p-4 rounded-full mb-4 ${variant === 'glass' ? 'bg-red-500/20' : 'bg-red-100'}`}>
              <svg className={`w-12 h-12 ${variant === 'glass' ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className={`text-2xl font-bold mb-2 ${variant === 'glass' ? 'text-white' : 'text-gray-900'}`}>Error!</h3>
            <p className={`font-medium text-center px-6 ${variant === 'glass' ? 'text-red-400' : 'text-red-600'}`}>{errorMsg}</p>
            <button
              type="button"
              onClick={() => { setStatus("idle"); setErrorMsg(null); }}
              className={`mt-6 px-6 py-2 rounded-full text-sm font-semibold transition-colors ${variant === 'glass' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Name */}
          <div className="relative group">
            <UserIcon className={iconClasses} />
            <input
              placeholder="Your Name"
              className={inputClasses}
              {...register("name", { required: true })}
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <EnvelopeIcon className={iconClasses} />
            <input
              type="email"
              placeholder="Your Email"
              className={inputClasses}
              {...register("email", { required: true })}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {/* Phone */}
          <div className="relative group">
            <PhoneIcon className={iconClasses} />
            <input
              placeholder="Phone Number"
              className={inputClasses}
              {...register("phone", { required: true })}
            />
          </div>

          {/* Address */}
          <div className="relative group">
            <MapPinIcon className={iconClasses} />
            <input
              placeholder="Address"
              className={inputClasses}
              {...register("address", { required: true })}
            />
          </div>
        </div>

        {/* Industry */}
        <div className="relative group">
          <BriefcaseIcon className={iconClasses} />
          <select
            className={`${inputClasses} ${variant === 'glass' ? 'appearance-none' : 'appearance-none cursor-pointer'}`}
            {...register("businessType", { required: true })}
            defaultValue=""
          >
            <option value="" disabled className={variant === 'glass' ? 'bg-slate-900' : 'bg-white'}>Select Industry</option>
            <option value="E-commerce" className={variant === 'glass' ? 'bg-slate-900' : 'bg-white text-gray-900'}>E-commerce</option>
            <option value="Real Estate" className={variant === 'glass' ? 'bg-slate-900' : 'bg-white text-gray-900'}>Real Estate</option>
            <option value="Education" className={variant === 'glass' ? 'bg-slate-900' : 'bg-white text-gray-900'}>Education</option>
            <option value="Healthcare" className={variant === 'glass' ? 'bg-slate-900' : 'bg-white text-gray-900'}>Healthcare</option>
            <option value="Other" className={variant === 'glass' ? 'bg-slate-900' : 'bg-white text-gray-900'}>Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="relative group">
          <ChatBubbleLeftRightIcon className={textareaIconClasses} />
          <textarea
            rows={variant === 'glass' ? 3 : 4}
            placeholder="Tell us about your project"
            className={`${inputClasses} resize-none ${variant === 'glass' ? '' : 'pl-12'}`}
            {...register("message", { required: true })}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform hover:-translate-y-1 ${variant === 'glass' 
            ? 'bg-gradient-to-r from-orange-600 to-amber-500 hover:shadow-orange-600/40 shadow-lg' 
            : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30'}`}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
