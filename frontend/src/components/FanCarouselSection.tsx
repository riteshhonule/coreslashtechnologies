import React from "react";
import SocialCards from "@/components/CardFanCarousel";
import type { CardItem } from "@/components/CardFanCarousel";
import { Sparkles } from "lucide-react";

import stripeImg from "@/assets/payment-gateways/coreslash_stripe_logo.svg";
import paypalImg from "@/assets/payment-gateways/coreslash_paypal_logo.svg";
import phonepeImg from "@/assets/payment-gateways/coreslash_phonepe_logo.svg";
import razorpayImg from "@/assets/payment-gateways/coreslash_razorpay_logo.svg";
import paytmImg from "@/assets/payment-gateways/coreslash_paytm_logo.svg";
import cashfreeImg from "@/assets/payment-gateways/coreslash_cashfree_logo.svg";
import instamojoImg from "@/assets/payment-gateways/coreslash_instamojo_logo.svg";

export const PAYMENT_GATEWAYS: CardItem[] = [
  {
    id: "stripe",
    name: "Stripe",
    subtitle: "Global Infrastructure",
    gradient: "from-[#635BFF] to-[#7C3AED]",
    glowColor: "rgba(124,58,237,0.6)",
    logoUrl: stripeImg,
  },
  {
    id: "paypal",
    name: "PayPal",
    subtitle: "International Payments",
    gradient: "from-[#003087] to-[#009CDE]",
    glowColor: "rgba(0,156,222,0.6)",
    logoUrl: paypalImg,
  },
  {
    id: "phonepe",
    name: "PhonePe",
    subtitle: "UPI & Wallets",
    gradient: "from-[#5F259F] to-[#8B5CF6]",
    glowColor: "rgba(139,92,246,0.6)",
    logoUrl: phonepeImg,
  },
  {
    id: "razorpay",
    name: "Razorpay",
    subtitle: "India's Payment Solution",
    gradient: "from-[#072AC8] to-[#2563EB]",
    glowColor: "rgba(37,99,235,0.6)",
    logoUrl: razorpayImg,
  },
  {
    id: "paytm",
    name: "Paytm",
    subtitle: "Fast Digital Wallet",
    gradient: "from-[#00BAF2] to-[#0070E0]",
    glowColor: "rgba(0,112,224,0.6)",
    logoUrl: paytmImg,
  },
  {
    id: "cashfree",
    name: "Cashfree",
    subtitle: "API Banking & Payments",
    gradient: "from-[#FF6B35] to-[#FF8A3D]",
    glowColor: "rgba(255,138,61,0.6)",
    logoUrl: cashfreeImg,
  },
  {
    id: "instamojo",
    name: "Instamojo",
    subtitle: "Quick Payment Links",
    gradient: "from-[#FF4D8D] to-[#7C3AED]",
    glowColor: "rgba(255,77,141,0.6)",
    logoUrl: instamojoImg,
  },
];

export const FanCarouselSection: React.FC = () => {
  return (
    <section
      id="fanned-showcase"
      className="py-16 px-6 md:px-12 max-w-[1400px] mx-auto border-t border-border/40 overflow-hidden"
    >
      <div className="text-center max-w-2xl mx-auto mb-4">
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white text-sm font-semibold shadow-[0_8px_30px_rgba(79,70,229,0.35)] hover:scale-105 hover:shadow-[0_12px_40px_rgba(79,70,229,0.45)] transition-all duration-300">
            <Sparkles className="w-4 h-4 text-white" />
            <span>Global Integrations</span>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          <span className="whitespace-nowrap">
            Payment Gateways
            <br className="md:hidden" />
            <span className="hidden md:inline"> </span>
            We Work With
          </span>
        </h2>

        <p className="mt-2 text-muted-foreground text-sm md:text-base">
          Secure, reliable, and globally trusted payment gateways integrated to provide seamless online transactions for your business.
        </p>
      </div>

      <div className="-mt-6">
        <SocialCards cards={PAYMENT_GATEWAYS} />
      </div>
    </section>
  );
};

export default FanCarouselSection;