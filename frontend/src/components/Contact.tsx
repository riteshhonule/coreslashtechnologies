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
} from "@heroicons/react/24/outline";

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  address: string;
  businessType: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>();

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (data: ContactForm) => {
    try {
      setStatus("loading");
      await submitContact(data);
      setStatus("success");
      reset();
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="relative py-12 bg-transparent">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Send us a Message
          </h2>
          <p className="text-gray-600">
            Have a specific inquiry? Fill out the form below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-xl rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >

          {/* Success Animation Overlay */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg rounded-3xl z-20 border border-green-100"
              >
                <div className="p-4 rounded-full bg-green-100 mb-4">
                  <svg
                    className="w-12 h-12 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="relative group">
                <UserIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  placeholder="Your Name"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  {...register("name", { required: true })}
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  {...register("email", { required: true })}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="relative group">
                <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                <input
                  placeholder="Phone Number"
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                  {...register("phone", { required: true })}
                />
              </div>

              {/* Business Type */}
              <div className="relative group">
                <BriefcaseIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-indigo-600 transition-colors" />
                <select
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                  {...register("businessType", { required: true })}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-white">Select Industry</option>
                  <option value="E-commerce" className="bg-white text-gray-900">E-commerce</option>
                  <option value="Real Estate" className="bg-white text-gray-900">Real Estate</option>
                  <option value="Education" className="bg-white text-gray-900">Education</option>
                  <option value="Healthcare" className="bg-white text-gray-900">Healthcare</option>
                  <option value="Other" className="bg-white text-gray-900">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="relative group">
              <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400 absolute left-4 top-5 group-focus-within:text-indigo-600 transition-colors" />
              <textarea
                rows={4}
                placeholder="Tell us about your project"
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                {...register("message", { required: true })}
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
