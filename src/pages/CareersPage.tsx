import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, MapPin, Clock, ArrowRight, Upload, 
  Sparkles, CheckCircle2, Zap,
  User, Mail, Phone, Globe, FileText, Send, Building2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  tags: string[];
}

const JOB_POSITIONS: JobPosition[] = [
  {
    id: "fullstack-jr",
    title: "Junior Full Stack Engineer",
    department: "Engineering",
    location: "Remote / India",
    type: "Full-Time",
    experience: "0-2 Years",
    salary: "Competitive SLA",
    description: "Build web applications using React, Next.js, Node.js, and PostgreSQL. Drive core system performance and frontend responsiveness.",
    tags: ["React", "Next.js", "Node.js", "PostgreSQL"]
  },
  {
    id: "flutter-dev",
    title: "Mobile App Developer (Flutter/iOS)",
    department: "Mobile",
    location: "Remote",
    type: "Full-Time",
    experience: "1-3 Years",
    salary: "Competitive SLA",
    description: "Develop high-performance cross-platform mobile applications using Flutter and Swift with offline sync and clean state management.",
    tags: ["Flutter", "Dart", "Swift", "REST APIs"]
  },
  {
    id: "seo-specialist",
    title: "Technical SEO & Growth Marketer",
    department: "Marketing",
    location: "Remote",
    type: "Full-Time",
    experience: "1-2 Years",
    salary: "Competitive SLA",
    description: "Execute technical SEO audits, schema.org structured data, page speed optimization, and organic search ranking growth strategies.",
    tags: ["Technical SEO", "Schema.org", "Analytics", "Growth"]
  }
];

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    portfolioUrl: "",
    experienceLevel: "1-3 years",
    coverLetter: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToApply = (roleTitle: string) => {
    setSelectedRole(roleTitle);
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
        <link rel="canonical" href="https://www.coreslash.com/careers" />
      </Helmet>

      {/* 1. Hero Section with Rich Dark Gradient Glass styling */}
      <section className="relative w-full pt-6 pb-12 md:pt-10 md:pb-16 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto overflow-hidden">
        <div className="relative z-10 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          
          {/* Subtle Background Glow Spheres */}
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
              We are a team of passionate developers, product designers, and cloud architects crafting high-performance software. Discover open roles and elevate your career.
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



      {/* 3. Open Positions Section */}
      <section className="w-full py-16 md:py-20 border-t border-border/40 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-start gap-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-600/10 border-l-4 border-blue-600 text-blue-600 text-xs font-extrabold tracking-wider uppercase">
            OPEN POSITIONS
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">Explore Current Opportunities</h2>
        </div>

        {/* Job Cards */}
        <div className="space-y-5 pt-4">
          <AnimatePresence mode="wait">
            {JOB_POSITIONS.map((job) => (
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
                    <span className="px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-md">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-foreground group-hover:text-blue-600 transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{job.description}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.tags.map(tag => (
                        <span key={tag} className="text-[11px] font-normal px-2.5 py-0.5 rounded bg-muted text-muted-foreground">
                          #{tag}
                        </span>
                      ))}
                    </div>
                </div>

                <Button
                  onClick={() => scrollToApply(job.title)}
                  className="h-12 px-7 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 shrink-0 transition-all duration-300"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Professional Job Application Form Section */}
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
            
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600" />

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
                  onClick={() => { setSubmitted(false); setFileName(""); }}
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
                      placeholder="e.g. Rahul Sharma"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
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
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
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
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  {/* Role Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="selectedRole" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-blue-600" /> Position Applying For *
                    </Label>
                    <select
                      id="selectedRole"
                      name="selectedRole"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      required
                      className="w-full h-12 px-3.5 rounded-xl border border-input bg-background text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500"
                    >
                      <option value="">Select a Position</option>
                      {JOB_POSITIONS.map(j => (
                        <option key={j.id} value={j.title}>{j.title}</option>
                      ))}
                      <option value="Other">Other / General Application</option>
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
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      className="h-12 rounded-xl focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                    />
                  </div>

                  {/* Experience Level */}
                  <div className="space-y-2">
                    <Label htmlFor="experienceLevel" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> Total Experience *
                    </Label>
                    <select
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full h-12 px-3.5 rounded-xl border border-input bg-background text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500"
                    >
                      <option value="Fresh Graduate / 0-1 year">Fresh Graduate / 0-1 year</option>
                      <option value="1-3 years">1-3 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="5+ years">5+ years</option>
                    </select>
                  </div>
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-blue-600" /> Upload Resume / CV (PDF, DOCX) *
                  </Label>
                  <div className="relative border-2 border-dashed border-border hover:border-blue-500 rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer bg-muted/20 hover:bg-muted/40 group">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center gap-2 pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-foreground">
                        {fileName ? `Selected file: ${fileName}` : "Click or drag & drop your resume file here"}
                      </span>
                      <span className="text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX (Max 10MB)</span>
                    </div>
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-2">
                  <Label htmlFor="coverLetter" className="text-xs font-black uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" /> Brief Cover Note / Summary
                  </Label>
                  <Textarea
                    id="coverLetter"
                    name="coverLetter"
                    placeholder="Tell us about your core technical accomplishments, key projects, or why you'd like to join CoreSlash..."
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    className="min-h-[110px] rounded-xl text-sm focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-13 text-base font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Job Application</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
