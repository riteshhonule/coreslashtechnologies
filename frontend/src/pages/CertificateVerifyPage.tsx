import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCertificate } from "../lib/api";
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
  Loader2
} from "lucide-react";

interface CertificateData {
  certificateId: string;
  studentName: string;
  courseName: string;
  issueDate: string;
  status: "VALID" | "REVOKED" | "EXPIRED";
}

export default function CertificateVerifyPage() {
  const { certificateId } = useParams<{ certificateId: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CertificateData | null>(null);

  useEffect(() => {
    if (!certificateId) {
      setError("No certificate ID provided.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    getCertificate(certificateId)
      .then((res) => {
        if (res.data && res.data.success) {
          setData(res.data.data);
        } else {
          setError(res.data.message || "Failed to retrieve certificate details.");
        }
      })
      .catch((err) => {
        console.error(err);
        const errMsg = err.response?.data?.message || "Certificate verification failed.";
        setError(errMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [certificateId]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center py-12 px-4 relative bg-gray-50/50">
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

        {!loading && error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 rounded-3xl border-t-4 border-t-rose-500 overflow-hidden relative"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100 mb-6">
                <XCircle className="w-9 h-9" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Certificate Not Found
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto mb-8">
                The Certificate ID <span className="font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100 font-bold">{certificateId}</span> could not be verified. It may be invalid, revoked, or not yet registered.
              </p>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 text-left">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2 pl-0.5">Need Assistance?</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  If you are checking an official CoreSlash Technologies credential and believe this is an error, please reach out to our team at <a href="mailto:contact@coreslashtechnologies.com" className="text-secondary-indigo hover:underline font-bold">contact@coreslashtechnologies.com</a>.
                </p>
              </div>

              <div className="pt-2 border-t border-gray-100 flex justify-center">
                <Link
                  to="/"
                  className="btn-pill btn-glass text-secondary-indigo hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return Home
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {!loading && data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 md:p-10 rounded-3xl border-t-4 border-t-emerald-500 overflow-hidden relative"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 mb-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Certificate Verified</h3>
              <p className="text-emerald-600 text-xs font-bold uppercase tracking-[0.2em] mt-1">Official CoreSlash Credential</p>
            </div>

            <div className="space-y-4 bg-gray-50/50 border border-gray-100 p-6 rounded-2xl mb-8">
              {/* Recipient */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <User className="w-3.5 h-3.5 text-secondary-indigo" />
                  Recipient Name
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">{data.studentName}</span>
              </div>

              {/* Course */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-secondary-indigo" />
                  Program/Course
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">{data.courseName}</span>
              </div>

              {/* ID */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Hash className="w-3.5 h-3.5 text-secondary-indigo" />
                  Certificate ID
                </div>
                <span className="font-mono font-bold text-secondary-indigo text-sm sm:text-base">{data.certificateId}</span>
              </div>

              {/* Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-secondary-indigo" />
                  Issued Date
                </div>
                <span className="font-bold text-gray-800 text-sm sm:text-base">
                  {new Date(data.issueDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  })}
                </span>
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-secondary-indigo" />
                  Status
                </div>
                <span className="inline-flex px-3.5 py-1 text-xs font-bold uppercase rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 tracking-wider">
                  {data.status}
                </span>
              </div>
            </div>

            <div className="text-center pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/"
                className="w-full sm:w-auto btn-pill btn-glass text-secondary-indigo hover:text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider"
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
