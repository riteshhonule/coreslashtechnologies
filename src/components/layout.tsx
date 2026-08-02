import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./ui/navbar";
import FooterSection from "./sections/footer-section";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, CheckCircle2 } from "lucide-react";

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
      
      <main className="flex-grow pt-[80px]">
        <Outlet />
      </main>

      <FooterSection />

      {/* Global Get Quote Modal */}
      <AnimatePresence>
        {quoteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg p-8 rounded-3xl bg-card border border-border shadow-2xl backdrop-blur-2xl"
            >
              <button
                onClick={() => {
                  setQuoteModalOpen(false);
                  setQuoteSubmitted(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-muted text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>

              {!quoteSubmitted ? (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-semibold mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Instant Quote Estimate</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Request CoreSlash Project Quote</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Tell us about your project requirements and our engineering leads will deliver a proposal within 24 hours.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setQuoteSubmitted(true);
                    }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Work Email</label>
                      <input
                        required
                        type="email"
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Scope</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Briefly describe your software or AI project..."
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors duration-200 cursor-pointer shadow-lg shadow-blue-500/20"
                    >
                      Submit Quote Request
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-16 h-16 text-blue-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-2xl font-bold mb-2">Quote Request Received!</h3>
                  <p className="text-muted-foreground text-sm mb-6">
                    Thank you for choosing CoreSlash. Our solutions architect will review your project specs and contact you shortly.
                  </p>
                  <button
                    onClick={() => {
                      setQuoteModalOpen(false);
                      setQuoteSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-muted text-foreground text-sm font-semibold hover:bg-muted/80"
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
