import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import FooterSection from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { AnimatePresence, motion } from "framer-motion";
import { 
  Sparkles, X, CheckCircle2, User, Mail, MessageSquare, 
  ArrowRight, ShieldCheck 
} from "lucide-react";

export default function Layout() {
  const { pathname } = useLocation();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">
      <Navbar onGetQuoteClick={() => setQuoteModalOpen(true)} />
      
      <main className="flex-grow pt-[96px]">
        <Outlet />
      </main>

      <FooterSection />
      
      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Global Get Quote Modal */}
      <AnimatePresence>
        {quoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto"
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_60%)] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="relative w-full max-w-xl p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.18)] text-slate-900 dark:text-white backdrop-blur-2xl my-4 sm:my-8 overflow-hidden z-10"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500" />

              <button
                onClick={() => {
                  setQuoteModalOpen(false);
                  setQuoteSubmitted(false);
                }}
                className="absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors border border-slate-200 dark:border-slate-700 z-20 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {!quoteSubmitted ? (
                <div className="space-y-5 text-left pt-2">
                  {/* Header Title */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                      Request CoreSlash <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 dark:from-blue-400 dark:via-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">Project Quote</span>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                      Tell us about your engineering specs. Our technical leads will review your requirements and deliver a custom proposal within 24 hours.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setQuoteSubmitted(true);
                    }}
                    className="space-y-4 pt-1"
                  >
                    {/* Inputs Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Your Name *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Alex Morgan"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white focus:border-blue-600 dark:focus:border-blue-500/80 focus:ring-1 focus:ring-blue-600/30 transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Work Email *
                        </label>
                        <input
                          required
                          type="email"
                          placeholder="alex@company.com"
                          className="w-full h-11 px-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white focus:border-blue-600 dark:focus:border-blue-500/80 focus:ring-1 focus:ring-blue-600/30 transition-all"
                        />
                      </div>
                    </div>

                    {/* Project Scope */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Project Details *
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Describe your software goals, timeline, and key requirements..."
                        className="w-full p-3.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:bg-white focus:border-blue-600 dark:focus:border-blue-500/80 focus:ring-1 focus:ring-blue-600/30 transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>Submit Quote Request</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>100% Confidential • NDA Signed Upon Request</span>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-500/20 border-2 border-blue-600 dark:border-blue-500 flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/25">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Quote Request Received!</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                    Thank you for partnering with CoreSlash. Our solutions architect will analyze your project specs and contact you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setQuoteModalOpen(false);
                      setQuoteSubmitted(false);
                    }}
                    className="mt-2 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs transition-colors border border-slate-700 cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
