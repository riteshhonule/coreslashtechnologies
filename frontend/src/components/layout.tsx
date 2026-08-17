import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { PremiumContactForm } from "./PremiumContactForm";
import FooterSection from "./Footer";
import { WhatsAppButton } from "./WhatsAppButton";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function Layout() {
  const { pathname } = useLocation();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col pt-[72px] md:pt-[76px]">
      <Navbar onGetQuoteClick={() => setQuoteModalOpen(true)} />

      <main className="flex-grow">
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

            <div className="relative w-full max-w-[680px] mx-auto z-10 my-4 sm:my-8">
              <button
                onClick={() => {
                  setQuoteModalOpen(false);
                  setQuoteSubmitted(false);
                }}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/80 text-slate-400 hover:text-white transition-colors border border-slate-600/50 z-50 cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <PremiumContactForm onSuccess={() => setQuoteModalOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
