import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { verifyCertificate } from "../lib/api";
import { envConfig } from "../config/env.config";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  Award,
  Calendar,
  User,
  BookOpen,
  Hash,
  ArrowLeft,
  Loader2,
  FileText
} from "lucide-react";
import SEO from "../components/SEO";

interface CertificateData {
  certificateNumber: string;
  candidateName: string;
  courseName: string;
  issueDate: string;
  completionDate?: string | null;
  grade?: string | null;
  status: "Verified" | "Revoked" | "Expired";
  certificateUrl?: string | null;
}

export default function CertificateVerifyPage() {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [data, setData] = useState<CertificateData | null>(null);
  const [certificateNumberInput, setCertificateNumberInput] = useState("");
  const [showForm, setShowForm] = useState(!certificateId);

  const getCertificateUrl = (url: string) => {
    const base = envConfig.apiUrl.replace(/\/api$/, "");
    return url.startsWith("http") ? url : `${base}${url}`;
  };

  const performVerification = (num: string) => {
    setLoading(true);
    setError(null);
    setValidationError(null);
    setData(null);

    verifyCertificate(num)
      .then((res) => {
        if (res.data && res.data.success) {
          setData(res.data.data);
          setShowForm(false);
        } else {
          setError(res.data.message || "Certificate Not Found");
          setShowForm(false);
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 400) {
          const msg = err.response?.data?.message;
          const errorText = Array.isArray(msg) ? msg.join(" ") : msg || "Invalid input parameters.";
          setValidationError(errorText);
        } else {
          const errMsg = err.response?.data?.message || "An error occurred during certificate verification.";
          setError(errMsg);
          setShowForm(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (certificateId) {
      setShowForm(false);
      performVerification(certificateId);
    } else {
      setShowForm(true);
      setLoading(false);
    }
  }, [certificateId]);

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateNumberInput.trim()) {
      setValidationError("Certificate number is required.");
      return;
    }
    performVerification(certificateNumberInput);
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Verified":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Expired":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Revoked":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 relative bg-gray-50/50">
      <SEO
        title="Verify Professional Certification | CoreSlash Technologies"
        description="Verify the authenticity and details of internship and professional training certificates issued by CoreSlash Technologies."
      />
      {/* Decorative Glows matching Home page */}
      <div className="hidden md:block absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-secondary-indigo/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="hidden md:block absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/2 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-xl relative z-10">
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 rounded-3xl text-center flex flex-col items-center space-y-6"
          >
            <Loader2 className="w-12 h-12 text-secondary-indigo animate-spin" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Querying Secure Ledger</h3>
              <p className="text-gray-500 text-sm">Verifying credential signature and status...</p>
            </div>
          </motion.div>
        )}

        {!loading && showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 rounded-3xl border-t-4 border-t-secondary-indigo overflow-hidden relative shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 text-secondary-indigo rounded-2xl border border-indigo-100 mb-4 shadow-sm">
                <Award className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Verify Certification</h3>
              <p className="text-gray-500 text-sm mt-1">Confirm the validity of professional credentials issued by CoreSlash.</p>
            </div>

            <form onSubmit={handleManualVerify} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="cert-number" className="block text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">
                  Certificate Registration Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
                    <Hash className="w-5 h-5" />
                  </span>
                  <input
                    id="cert-number"
                    type="text"
                    required
                    disabled={loading}
                    value={certificateNumberInput}
                    onChange={(e) => {
                      setCertificateNumberInput(e.target.value);
                      if (validationError) setValidationError(null);
                    }}
                    placeholder="e.g. CS-2026-0001"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl text-gray-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-secondary-indigo/20 focus:border-secondary-indigo transition-all disabled:opacity-50"
                  />
                </div>
                {validationError && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-500 text-xs font-semibold mt-1.5 pl-1"
                  >
                    {validationError}
                  </motion.p>
                )}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto flex-1 btn-pill bg-secondary-indigo text-white hover:bg-secondary-indigo/90 px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Verify Certificate
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto btn-pill btn-glass text-secondary-indigo hover:text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return Home
                </Link>
              </div>
            </form>
          </motion.div>
        )}

        {!loading && !showForm && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 rounded-3xl border-t-4 border-t-rose-500 overflow-hidden relative shadow-xl"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 mb-6">
                <XCircle className="w-9 h-9" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                ❌ Certificate Not Found
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-8">
                Please check the certificate number and try again.
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 text-left">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 pl-0.5">Need Assistance?</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  If you are checking an official CoreSlash Technologies credential and believe this is an error, please reach out to our team at <a href="mailto:contact@coreslashtechnologies.com" className="text-secondary-indigo hover:underline font-bold">contact@coreslashtechnologies.com</a>.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => {
                    setShowForm(true);
                    setError(null);
                    setData(null);
                  }}
                  className="w-full sm:w-auto btn-pill bg-secondary-indigo text-white hover:bg-secondary-indigo/90 px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  Try Another Search
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto btn-pill btn-glass text-secondary-indigo hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && !showForm && data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 rounded-3xl border-t-4 border-t-emerald-500 overflow-hidden relative shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 mb-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">✓ Certificate Verified</h3>
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mt-1">Official CoreSlash Credential</p>
            </div>

            <div className="space-y-4 bg-gray-50/50 border border-gray-100 p-6 rounded-2xl mb-8">
              {/* Recipient */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-secondary-indigo" />
                  Candidate Name
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">{data.candidateName}</span>
              </div>

              {/* Course */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-secondary-indigo" />
                  Course Name
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">{data.courseName}</span>
              </div>

              {/* ID */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Hash className="w-3.5 h-3.5 text-secondary-indigo" />
                  Certificate Number
                </div>
                <span className="font-mono font-bold text-secondary-indigo text-sm sm:text-base">{data.certificateNumber}</span>
              </div>

              {/* Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-secondary-indigo" />
                  Issue Date
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">
                  {new Date(data.issueDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>

              {/* Completion Date */}
              {data.completionDate && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <Calendar className="w-3.5 h-3.5 text-secondary-indigo" />
                    Completion Date
                  </div>
                  <span className="font-bold text-gray-800 text-sm sm:text-base">
                    {new Date(data.completionDate).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                  </span>
                </div>
              )}

              {/* Grade */}
              {data.grade && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-secondary-indigo" />
                    Grade Achieved
                  </div>
                  <span className="font-bold text-gray-800 text-sm sm:text-base">{data.grade}</span>
                </div>
              )}

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-secondary-indigo" />
                  Status
                </div>
                <span className={`inline-flex px-3.5 py-1 text-xs font-bold uppercase rounded-full border tracking-wider ${getStatusStyles(data.status)}`}>
                  {data.status}
                </span>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
              {data.certificateUrl && (
                <a
                  href={getCertificateUrl(data.certificateUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto btn-pill bg-secondary-indigo text-white hover:bg-secondary-indigo/90 px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <FileText className="w-4 h-4" />
                  View Original PDF
                </a>
              )}
              <button
                onClick={() => {
                  setShowForm(true);
                  setData(null);
                  setError(null);
                  setCertificateNumberInput("");
                }}
                className="w-full sm:w-auto btn-pill btn-glass text-secondary-indigo hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Verify Another
              </button>
              <Link
                to="/"
                className="w-full sm:w-auto btn-pill btn-glass text-secondary-indigo hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Return Home
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
