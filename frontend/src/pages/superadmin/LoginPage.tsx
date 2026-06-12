import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginSuperadmin } from "../../lib/api";
import { motion } from "framer-motion";

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
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-dark-black">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 1, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 rounded-3xl glass-card relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-3 rounded-2xl bg-primary-purple/15 border border-primary-purple/20 mb-4">
            <svg
              className="w-8 h-8 text-accent-cyan"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white mb-2">
            Superadmin Access
          </h2>
          <p className="text-sm text-white/50">
            Sign in to view site databases and contact queries
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">
              Username
            </label>
            <input
              type="text"
              required
              placeholder="Enter admin username"
              className="glass-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="glass-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 1, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="text-red-400 text-xs font-semibold bg-red-500/10 border border-red-500/25 px-4 py-2.5 rounded-xl text-center"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-pill btn-primary-glow text-white text-base py-3.5 font-bold cursor-pointer"
          >
            {loading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
