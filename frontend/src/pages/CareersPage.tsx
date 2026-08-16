import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, MapPin, Clock, ArrowRight, Upload,
  Sparkles, CheckCircle2, Zap, AlertCircle, Loader2,
  User, Mail, Phone, Globe, FileText, Send, Building2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface CareerPosition {
  id: number;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employmentType: string;
  experience: string | null;
  salary: string | null;
  description: string;
  requirements: any;
  status: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<CareerPosition[]>([]);
  const [isLoadingCareers, setIsLoadingCareers] = useState<boolean>(true);
  const [careersFetchError, _setCareersFetchError] = useState<string | null>(null);

  const [selectedCareerId, setSelectedCareerId] = useState<number | "">("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formFields, setFormFields] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    coverLetter: "",
  });

  // Mock careers since backend only handles form submissions
  useEffect(() => {
    setIsLoadingCareers(false);
    setCareers([
      { id: 1, title: 'Senior Frontend Developer', slug: 'senior-frontend-developer', department: 'Engineering', location: 'Remote', employmentType: 'Full-time', experience: '3+ years', salary: null, description: 'Join our team to build scalable UIs.', requirements: ['React', 'TypeScript'], status: 'OPEN' },
      { id: 2, title: 'Backend Node.js Developer', slug: 'backend-nodejs-developer', department: 'Engineering', location: 'Remote', employmentType: 'Full-time', experience: '3+ years', salary: null, description: 'Design and build high performance APIs.', requirements: ['Node.js', 'NestJS'], status: 'OPEN' },
      { id: 3, title: 'DevOps Engineer', slug: 'devops-engineer', department: 'Infrastructure', location: 'Remote', employmentType: 'Full-time', experience: '4+ years', salary: null, description: 'Maintain and scale our cloud infrastructure.', requirements: ['AWS', 'Docker', 'Kubernetes'], status: 'OPEN' },
    ]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormFields(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitError(null);

    if (!selectedCareerId) {
      setSubmitError("Please select an open position to apply for.");
      return;
    }

    if (!resumeFile) {
      setSubmitError("Please upload your resume file (PDF or DOCX).");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const selectedJob = careers.find(c => c.id === selectedCareerId);
      formData.append('position', selectedJob ? selectedJob.title : String(selectedCareerId));
      formData.append('fullName', formFields.fullName.trim());
      formData.append('email', formFields.email.trim());
      formData.append('phone', formFields.phone.trim());

      let fullCover = formFields.coverLetter ? formFields.coverLetter.trim() : '';
      if (formFields.portfolioUrl) {
        formData.append('portfolioUrl', formFields.portfolioUrl.trim());
      }
      if (fullCover) {
        formData.append('coverNote', fullCover);
      }

      formData.append('resume', resumeFile);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/jobs/apply`, {
        method: 'POST',
        body: formData,
      });

      const resData = await res.json().catch(() => ({}));

      if (res.ok && (res.status === 201 || res.status === 200)) {
        setSubmitted(true);
        setFormFields({
          fullName: "",
          email: "",
          phone: "",
          portfolioUrl: "",
          coverLetter: "",
        });
        setSelectedCareerId("");
        setResumeFile(null);
        setFileName("");
      } else {
        const errorMsg = resData.message || (Array.isArray(resData.errors) ? resData.errors.join(', ') : 'Application submission failed');
        setSubmitError(`Submission Error (${res.status}): ${errorMsg}`);
      }
    } catch (err: any) {
      console.error('Career application submission error:', err);
      setSubmitError('Unable to connect to career server. Please ensure backend is online.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToApply = (careerId: number) => {
    setSelectedCareerId(careerId);
    const formElement = document.getElementById("application-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Helmet>
        <title>Careers & Opportunities | CoreSlash Technologies</title>
        <meta
          name="description"
          content="Join CoreSlash Technologies. Work with cutting-edge technologies, remote freedom, and high-impact engineering teams."
        />
        <link rel="canonical" href="https://coreslashtechnologies.com/careers" />
      </Helmet>

      {/* 1. Hero Section */}
      <section className="relative w-full pt-6 pb-12 md:pt-10 md:pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative z-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">

          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 text-xs font-black tracking-widest uppercase shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>CAREERS AT CORESLASH</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
              Build The Future Of <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">Digital Engineering</span> With Us
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              CoreSlash is a team of passionate developers, product designers, and cloud architects crafting high-performance software. Discover open roles and elevate your career.
            </p>

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs sm:text-sm font-semibold text-slate-300">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>100% Remote-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Global Client Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>High-Impact Engineering</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Open Positions Section */}
      <section className="w-full py-16 md:py-20 border-t border-border/40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-start gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-extrabold tracking-wider uppercase">
            OPEN POSITIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Explore Current Opportunities</h2>
        </div>

        {/* Loading / Error / Content */}
        {isLoadingCareers ? (
          <div className="flex items-center justify-center p-12 bg-muted/20 rounded-2xl border border-border/60">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin mr-3" />
            <span className="text-sm font-semibold text-muted-foreground">Loading active career openings from server...</span>
          </div>
        ) : careersFetchError ? (
          <div className="p-6 rounded-2xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{careersFetchError}</span>
          </div>
        ) : careers.length === 0 ? (
          <div className="p-12 text-center bg-muted/20 rounded-2xl border border-border/60 space-y-3">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-foreground">No Open Roles At This Moment</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              We currently do not have active job openings posted. Feel free to submit a general application below.
            </p>
          </div>
        ) : (
          <div className="space-y-5 pt-4">
            <AnimatePresence mode="wait">
              {careers.map((job) => {
                const reqTags = Array.isArray(job.requirements)
                  ? job.requirements
                  : typeof job.requirements === 'string'
                    ? [job.requirements]
                    : [];

                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="group relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-border/70 border-l-4 border-l-blue-600 shadow-sm hover:shadow-2xl hover:border-blue-500 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-3.5 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {job.department && (
                          <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
                            {job.department}
                          </span>
                        )}
                        {job.location && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> {job.location}
                          </span>
                        )}
                        {job.employmentType && (
                          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                            <Clock className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> {job.employmentType.replace('_', ' ')}
                          </span>
                        )}
                        {job.experience && (
                          <span className="text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-200/50 dark:border-slate-700/50">
                            Exp: {job.experience}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-foreground dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground dark:text-slate-300 text-sm leading-relaxed">{job.description}</p>

                      {reqTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {reqTags.map((tag: string) => (
                            <span key={tag} className="text-[11px] font-normal px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/40 dark:border-slate-700/40">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <Button
                      onClick={() => scrollToApply(job.id)}
                      className="h-12 px-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 shrink-0 transition-all duration-300"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </section>

      {/* 3. Job Application Form Section */}
      <section id="application-form-section" className="w-full py-20 border-t border-border/40 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-[950px] mx-auto px-6 md:px-12">

          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-extrabold tracking-wider uppercase">
              APPLICATION PORTAL
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Submit Your Application</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Ready to take the next step? Fill out the details below and attach your resume.
            </p>
          </div>

          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-border/80 shadow-2xl p-6 sm:p-12 overflow-hidden">

            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />

            {submitError && (
              <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-5"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-black text-foreground tracking-tight">Application Received!</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed font-medium">
                  Thank you for applying to CoreSlash Technologies. Our talent acquisition team will review your CV and contact you shortly.
                </p>
                <Button
                  onClick={() => { setSubmitted(false); setFileName(""); setResumeFile(null); }}
                  variant="outline"
                  className="mt-4 rounded-xl font-extrabold px-6"
                >
                  Submit Another Application
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" /> Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formFields.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Jane Doe"
                      className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" /> Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formFields.email}
                      onChange={handleInputChange}
                      required
                      placeholder="jane.doe@example.com"
                      className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-blue-600" /> Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formFields.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 9876543210"
                      className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  {/* Role Selection (Dynamic from DB API) */}
                  <div className="space-y-2">
                    <Label htmlFor="selectedCareerId" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Position Applying For *
                    </Label>
                    <select
                      id="selectedCareerId"
                      name="selectedCareerId"
                      value={selectedCareerId}
                      onChange={(e) => setSelectedCareerId(e.target.value ? Number(e.target.value) : "")}
                      required
                      className="w-full h-12 px-3.5 rounded-xl border border-input bg-background text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500"
                    >
                      <option value="">Select an Open Position</option>
                      {careers.map(j => (
                        <option key={j.id} value={j.id}>{j.title} ({j.department || 'General'})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Portfolio/LinkedIn */}
                  <div className="space-y-2">
                    <Label htmlFor="portfolioUrl" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" /> Portfolio / LinkedIn / GitHub URL
                    </Label>
                    <Input
                      id="portfolioUrl"
                      name="portfolioUrl"
                      value={formFields.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://github.com/username"
                      className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5 text-blue-600" /> Upload Resume / CV (PDF, DOCX) *
                    </Label>
                    <div className="relative border-2 border-dashed border-border hover:border-blue-500 rounded-2xl p-4 text-center transition-all duration-300 cursor-pointer bg-muted/20 hover:bg-muted/40 group">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center gap-1.5 pointer-events-none">
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs sm:text-sm font-extrabold text-foreground">
                          {fileName ? `Selected: ${fileName}` : "Click or drag & drop resume file"}
                        </span>
                        <span className="text-[11px] text-muted-foreground">Formats: PDF, DOC, DOCX (Max 10MB)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label htmlFor="coverLetter" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Cover Note / Project Summary
                  </Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    value={formFields.coverLetter}
                    onChange={handleInputChange}
                    placeholder="Brief intro or relevant experience details..."
                    className="min-h-[100px] rounded-xl text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-13 text-base font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Job Application</span>
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
