import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuperadmin } from "../../lib/api";
import { motion } from "framer-motion";
import { Lock, User, KeyRound } from "lucide-react";
import SEO from "../../components/SEO";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If already logged in, skip login page
    const token = localStorage.getItem("superadmin_token");
    if (token) {
      navigate("/superadmin/dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await loginSuperadmin({ username, password });
      if (response.data && response.data.token) {
        localStorage.setItem("superadmin_token", response.data.token);
        navigate("/superadmin/dashboard");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 relative bg-neutral-50 overflow-hidden font-sans">
      <SEO title="Superadmin Login | CoreSlash Technologies" noindex={true} />
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-8 md:p-10 rounded-3xl bg-white border border-neutral-200 shadow-xl relative z-10"
      >
        {/* Top Accent line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent" />

        <div className="text-center mb-10">
          <div className="inline-flex p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 mb-4">
            <Lock className="w-8 h-8 text-neutral-900" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-neutral-900 mb-2">
            Superadmin Access
          </h2>
          <p className="text-sm text-neutral-500">
            Sign in to view site databases and contact queries
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] ml-1">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-450">
                <User className="w-4 h-4" />
              </span>
              <input
                type="text"
                required
                placeholder="Enter admin username"
                className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-neutral-400"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] ml-1">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-455">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl text-neutral-900 text-sm font-semibold focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all placeholder:text-neutral-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-neutral-900 text-xs font-semibold bg-neutral-50 border border-neutral-200 px-4 py-3 rounded-xl text-center"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex justify-center items-center shadow-lg hover:shadow-blue-100 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
