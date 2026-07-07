import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import confetti from "canvas-confetti";
import SEO from "../components/SEO";
import { CheckCircleIcon, SparklesIcon, DocumentArrowUpIcon, LinkIcon } from "@heroicons/react/24/outline";

// --- VALIDATION SCHEMA ---
const careersSchema = z.object({
  fullName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Please enter a valid email address"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"),
  currentCity: z.string().min(2, "Current City is required"),
  position: z.string().min(1, "Please select a position"),
  experience: z.string().min(1, "Please select your experience level"),
  qualification: z.string().min(1, "Please select your highest qualification"),
  skills: z.string().min(2, "Please list your key skills"),
  resume: z.any()
    .refine((files) => files && files.length > 0, "Resume is mandatory")
    .refine((files) => {
      if (!files || files.length === 0) return false;
      const file = files[0];
      const allowedTypes = [
        "application/pdf", 
        "application/msword", 
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];
      const ext = file.name.split(".").pop().toLowerCase();
      return allowedTypes.includes(file.type) || ["pdf", "doc", "docx"].includes(ext);
    }, "Only PDF, DOC, or DOCX files are allowed")
    .refine((files) => files && files[0] && files[0].size <= 5 * 1024 * 1024, "Maximum file size is 5MB"),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  introduction: z.string().max(300, "Introduction must be under 300 characters").optional(),
  declaration: z.boolean().refine((val) => val === true, "You must agree to the declaration"),
});

type CareersFormValues = z.infer<typeof careersSchema>;

const POSITION_OPTIONS = [
  "Software Developer",
  "Python Developer",
  "React Developer",
  "Full Stack Developer",
  "UI/UX Designer",
  "Digital Marketing",
  "Business Development",
  "HR",
  "Internship",
  "Other"
];

const EXPERIENCE_OPTIONS = [
  "Fresher",
  "0–1 Years",
  "1–3 Years",
  "3–5 Years",
  "5+ Years"
];

const QUALIFICATION_OPTIONS = [
  "Diploma",
  "BCA",
  "B.Sc",
  "B.E/B.Tech",
  "MCA",
  "M.Tech",
  "MBA",
  "Other"
];

export default function CareersPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fileName, setFileName] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CareersFormValues>({
    resolver: zodResolver(careersSchema),
    mode: "onChange",
  });

  const resumeFiles = watch("resume");
  const introText = watch("introduction") || "";

  React.useEffect(() => {
    if (resumeFiles && resumeFiles.length > 0) {
      setFileName(resumeFiles[0].name);
    } else {
      setFileName("");
    }
  }, [resumeFiles]);

  const onSubmit = async (data: CareersFormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const { envConfig } = await import("../config/env.config");
      
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("mobile", data.mobile);
      formData.append("currentCity", data.currentCity);
      formData.append("position", data.position);
      formData.append("experience", data.experience);
      formData.append("qualification", data.qualification);
      formData.append("skills", data.skills);
      formData.append("portfolioUrl", data.portfolioUrl || "");
      formData.append("introduction", data.introduction || "");
      
      if (data.resume && data.resume.length > 0) {
        formData.append("resume", data.resume[0]);
      }

      const response = await fetch(`${envConfig.apiUrl}/candidates`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred during submission.");
      }

      setSubmitSuccess(true);
      triggerConfetti();
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    const end = Date.now() + 4 * 1000;
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
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -25, transition: { duration: 0.3 } },
  };

  return (
    <main className="relative min-h-screen bg-[#F9FAFB] pt-0 overflow-hidden pb-16 text-gray-900">
      <SEO
        title="Careers | Join Our Team"
        description="Join CoreSlash Technologies. Submit your profile and jumpstart your career in software, design, or marketing."
      />
      {/* GLOW DECORATIONS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary-purple/3 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-indigo/2 rounded-full blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative py-16 md:py-24 w-full text-center px-6">
        <motion.div
          initial={{ opacity: 1, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-indigo/5 border border-secondary-indigo/15 mb-6"
        >
          <SparklesIcon className="w-4 h-4 text-secondary-indigo" />
          <span className="text-xs font-bold text-secondary-indigo uppercase tracking-[0.3em]">Talent Pool</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 1, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-5xl md:text-8xl font-black text-gray-900 mb-8 tracking-tight"
        >
          Join Our <span className="text-gradient-purple">Team</span>
        </motion.h1>

        <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          We're always looking for passionate and talented individuals. Submit your profile and we'll contact you when a suitable opportunity becomes available.
        </p>
      </section>

      {/* APPLICATION FORM SECTION */}
      <section className="px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.div
                key="form"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white p-8 md:p-14 rounded-[3rem] border border-gray-200/60 shadow-xl shadow-gray-200/30"
              >
                <div className="border-b border-gray-100 pb-6 mb-10 text-center lg:text-left">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Submit Your Profile</h2>
                  <p className="text-gray-500 font-medium mt-2">Takes less than 3 minutes to complete.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-150 rounded-2xl text-sm font-bold text-red-650">
                      {submitError}
                    </div>
                  )}

                  {/* Field Row 1: Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Full Name *</label>
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder="John Doe"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      />
                      {errors.fullName && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.fullName.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Email Address *</label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="john@example.com"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      />
                      {errors.email && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Field Row 2: Mobile & Current City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Mobile Number *</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-gray-500 font-bold border-r border-gray-200 pr-3 text-sm">
                          🇮🇳 +91
                        </div>
                        <input
                          type="text"
                          maxLength={10}
                          {...register("mobile")}
                          placeholder="9876543210"
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-20 pr-4 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                        />
                      </div>
                      {errors.mobile && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.mobile.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Current City *</label>
                      <input
                        type="text"
                        {...register("currentCity")}
                        placeholder="Belagavi / Hubli"
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      />
                      {errors.currentCity && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.currentCity.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Field Row 3: Position, Experience & Qualification */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Position Applying For *</label>
                      <select
                        {...register("position")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      >
                        <option value="">Select Position</option>
                        {POSITION_OPTIONS.map((pos) => (
                          <option key={pos} value={pos}>{pos}</option>
                        ))}
                      </select>
                      {errors.position && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.position.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Experience *</label>
                      <select
                        {...register("experience")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      >
                        <option value="">Select Experience</option>
                        {EXPERIENCE_OPTIONS.map((exp) => (
                          <option key={exp} value={exp}>{exp}</option>
                        ))}
                      </select>
                      {errors.experience && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.experience.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Highest Qualification *</label>
                      <select
                        {...register("qualification")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                      >
                        <option value="">Select Qualification</option>
                        {QUALIFICATION_OPTIONS.map((q) => (
                          <option key={q} value={q}>{q}</option>
                        ))}
                      </select>
                      {errors.qualification && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.qualification.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Field Row 4: Key Skills */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Key Skills *</label>
                    <input
                      type="text"
                      {...register("skills")}
                      placeholder="React, Node.js, Python, Java"
                      className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                    />
                    {errors.skills && (
                      <p className="text-xs font-bold text-red-500 pl-1">{errors.skills.message}</p>
                    )}
                  </div>

                  {/* Field Row 5: Resume Upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">Resume Upload (PDF, DOC, DOCX up to 5MB) *</label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-3xl cursor-pointer bg-gray-50 hover:bg-gray-100/50 transition-colors relative overflow-hidden group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <DocumentArrowUpIcon className="w-10 h-10 text-gray-400 group-hover:text-primary-purple transition-colors mb-3" />
                          <p className="mb-2 text-sm text-gray-500 font-bold">
                            {fileName ? (
                              <span className="text-primary-purple">{fileName}</span>
                            ) : (
                              <span>Click to upload resume</span>
                            )}
                          </p>
                          <p className="text-xs text-gray-400 font-semibold">PDF, DOC, or DOCX (Max 5MB)</p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          {...register("resume")}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                      </label>
                    </div>
                    {errors.resume && (
                      <p className="text-xs font-bold text-red-500 pl-1">{(errors.resume as any).message}</p>
                    )}
                  </div>

                  {/* Optional Fields: Portfolio & Short Intro */}
                  <div className="space-y-6 pt-4 border-t border-gray-100">
                    <h3 className="font-bold text-gray-800 text-sm tracking-wider uppercase">Optional Profile Info</h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest pl-1">LinkedIn / GitHub / Portfolio URL</label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                          <LinkIcon className="w-5 h-5" />
                        </div>
                        <input
                          type="text"
                          {...register("portfolioUrl")}
                          placeholder="https://github.com/username"
                          className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-5 text-gray-900 font-bold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all"
                        />
                      </div>
                      {errors.portfolioUrl && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.portfolioUrl.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-extrabold text-gray-500 uppercase tracking-widest">Short Introduction</label>
                        <span className="text-[10px] font-bold text-gray-400">{introText.length} / 300</span>
                      </div>
                      <textarea
                        {...register("introduction")}
                        maxLength={300}
                        rows={4}
                        placeholder="Tell us briefly about yourself..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-gray-900 font-semibold placeholder:text-gray-400 focus:outline-none focus:border-primary-purple focus:ring-4 focus:ring-primary-purple/10 transition-all resize-none"
                      />
                      {errors.introduction && (
                        <p className="text-xs font-bold text-red-500 pl-1">{errors.introduction.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Declaration & Submission */}
                  <div className="space-y-6 pt-6 border-t border-gray-100">
                    <label className="flex items-start gap-3.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("declaration")}
                        className="w-5 h-5 text-primary-purple border-gray-300 rounded focus:ring-primary-purple/20 transition-all mt-1"
                      />
                      <span className="text-sm font-semibold text-gray-600 leading-relaxed select-none">
                        I confirm that the information provided is accurate and I agree to be contacted regarding current or future opportunities.
                      </span>
                    </label>
                    {errors.declaration && (
                      <p className="text-xs font-bold text-red-500 pl-1">{errors.declaration.message}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4.5 bg-gradient-to-r from-primary-purple to-secondary-indigo hover:opacity-95 text-white font-bold text-lg rounded-2xl shadow-lg shadow-secondary-indigo/25 hover:shadow-xl hover:shadow-secondary-indigo/35 transition-all flex items-center justify-center gap-3.5"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting Application...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                variants={pageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="bg-white p-12 md:p-16 border border-gray-200/60 rounded-[3rem] shadow-xl text-center space-y-8 max-w-2xl mx-auto"
              >
                <div className="w-24 h-24 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto shadow-md">
                  <CheckCircleIcon className="w-12 h-12 animate-bounce" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">Application Received!</h2>
                  <p className="text-gray-600 font-medium text-lg leading-relaxed">
                    Thank you for your interest in Coreslash Technologies. We've received your application and will contact you if your profile matches future opportunities.
                  </p>
                </div>

                <div className="flex gap-4 justify-center pt-4">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="py-3 px-8 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-colors"
                  >
                    Submit Another
                  </button>
                  <a
                    href="/"
                    className="py-3 px-8 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl transition-colors inline-block"
                  >
                    Return Home
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
