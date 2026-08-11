import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

// CVA for card variants
const cardVariants = cva(
  "relative flex flex-col justify-between w-full p-6 sm:p-7 overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-xl",
  {
    variants: {
      variant: {
        default: "bg-white text-slate-900 border border-slate-200/80 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-800",
        red: "bg-red-500/90 text-white",
        blue: "bg-blue-600/90 text-white",
        gray: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ServiceCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * The main title of the card.
   */
  title: string;
  /**
   * Optional description for the card.
   */
  description?: string;
  /**
   * The URL the card's link should point to.
   */
  href: string;
  /**
   * The source URL for the decorative image.
   */
  imgSrc: string;
  /**
   * The alt text for the decorative image, for accessibility.
   */
  imgAlt: string;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, description, href, imgSrc, imgAlt }, ref) => {
    
    // Animation variants for Framer Motion
    const cardAnimation = {
      hover: {
        scale: 1.02,
        transition: { duration: 0.3 },
      },
    };

    const imageAnimation = {
      hover: {
        scale: 1.1,
        rotate: 3,
        x: 10,
        transition: { duration: 0.4 },
      },
    };
    
    const arrowAnimation = {
      hover: {
        x: 5,
        transition: { duration: 0.3, repeat: Infinity, repeatType: "reverse" as const },
      }
    };

    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
      >
        <div className="relative z-10 flex flex-col h-full">
          <h3 className="text-2xl font-bold tracking-tight mb-2">{title}</h3>
          {description && (
            <p className="text-sm font-medium opacity-90 leading-relaxed max-w-[82%] mb-6">{description}</p>
          )}
          <a
            href={href}
            aria-label={`Learn more about ${title}`}
            className="mt-auto flex items-center text-sm font-bold tracking-wider uppercase group-hover:underline"
          >
            LEARN MORE
            <motion.div variants={arrowAnimation}>
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </a>
        </div>
        
        <motion.img
          src={imgSrc}
          alt={imgAlt}
          className="absolute -right-8 -bottom-8 w-40 h-40 object-contain opacity-90 group-hover:opacity-100 pointer-events-none"
          variants={imageAnimation}
        />
      </motion.div>
    );
  }
);

ServiceCard.displayName = "ServiceCard";

export { ServiceCard };
