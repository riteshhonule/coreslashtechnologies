import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import appDevImg from "@/assets/services/mobile-app-development/coreslash-technologies-mobile-app-development-showcase.avif";
import websiteDevImg from "@/assets/services/web-development/coreslash-technologies-modern-web-development.avif";
import softwareSysImg from "@/assets/services/software-systems/coreslash-technologies-custom-software-systems.avif";
import ecommerceImg from "@/assets/services/ecommerce-solutions/coreslash-technologies-scalable-ecommerce-platforms.avif";
import seoImg from "@/assets/services/seo-solutions/coreslash-technologies-seo-search-growth.avif";
import shopifyDevImg from "@/assets/services/shopify-development/coreslash-technology-shopify-development.png";
import cloudDevopsImg from "@/assets/services/cloud-infrastructure/coreslash-technologies-cloud-devops.avif";
import dataAnalyticsImg from "@/assets/services/data-analytics/coreslash-technologies-business-intelligence-data-analytics.avif";
import aiServicesImg from "@/assets/services/ai-automation/coreslash-technologies-intelligent-ai-automation.avif";

export interface GalleryItem {
  src: string;
  title?: string;
  category?: string;
  description?: string;
  href?: string;
}

export interface ExpandableGalleryProps {
  images: (string | GalleryItem)[];
  className?: string;
  rowLayout?: number[];
}

export const NINE_DEMO_IMAGES: GalleryItem[] = [
  {
    src: aiServicesImg,
    title: "AI Automation Services",
    category: "AI Automation",
    description:
      "Automate business workflows with AI-powered solutions, intelligent chatbots, process automation, and custom AI applications.",
    href: "/services/ai-automation",
  },
  {
    src: websiteDevImg,
    title: "Web Development Services",
    category: "Web Development",
    description:
      "Build fast, responsive, and SEO-friendly websites with modern technologies, scalable architecture, and user-focused experiences.",
    href: "/services/web-development",
  },
  {
    src: appDevImg,
    title: "Mobile App Development",
    category: "App Development",
    description:
      "Develop scalable Android and iOS applications with intuitive user experiences, reliable performance, and modern mobile technologies.",
    href: "/services/app-development",
  },
  {
    src: softwareSysImg,
    title: "Custom Software Development",
    category: "Software Development",
    description:
      "Develop custom software systems that streamline business processes, automate workflows, integrate third-party platforms, and scale with your business.",
    href: "/services/software-systems",
  },
  {
    src: ecommerceImg,
    title: "E-Commerce Development",
    category: "E-Commerce",
    description:
      "Create secure and scalable e-commerce websites with payment gateway integration, product management, inventory systems, and optimized shopping experiences.",
    href: "/services/ecommerce-solutions",
  },
  {
    src: seoImg,
    title: "SEO Services",
    category: "SEO",
    description:
      "Improve organic search visibility with technical SEO, on-page optimization, local SEO, content strategy, and performance improvements.",
    href: "/services/seo-solutions",
  },
  {
    src: shopifyDevImg,
    title: "Shopify Development Services",
    category: "Shopify Development",
    description:
      "Build and customize Shopify stores with tailored themes, Shopify integrations, custom functionality, and conversion-focused e-commerce experiences.",
    href: "/services/shopify-development",
  },
  {
    src: cloudDevopsImg,
    title: "Cloud & DevOps Services",
    category: "Cloud & DevOps",
    description:
      "Deploy and manage scalable cloud infrastructure with secure hosting, CI/CD pipelines, monitoring, deployment automation, and performance optimization.",
    href: "/services/cloud-infrastructure",
  },
  {
    src: dataAnalyticsImg,
    title: "Data Analytics Services",
    category: "Data Analytics",
    description:
      "Turn business data into actionable insights with analytics dashboards, reporting systems, data visualization, and performance tracking.",
    href: "/services/data-analytics",
  },
];

const getImageSrc = (item: string | GalleryItem): string =>
  typeof item === 'string' ? item : item.src;

const getItemDetails = (item: string | GalleryItem) => {
  if (typeof item === 'string') {
    return { title: undefined, category: undefined, description: undefined, href: undefined };
  }
  return item;
};

const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({
  images,
  className = '',
  rowLayout,
}) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openImage = (index: number) => {
    setSelectedIndex(index);
  };

  const closeImage = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const goToNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  const goToPrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length]);

  // Keyboard navigation for modal view
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') closeImage();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeImage, goToNext, goToPrev]);

  // Determine row distribution (Default: 4 cards in Row 1 and 5 cards in Row 2 for 9 items)
  const displayedImages = isMobile && !isExpanded ? images.slice(0, 4) : images;
  const targetLayout = rowLayout || (images.length === 9 ? [4, 5] : undefined);
  const rows: (string | GalleryItem)[][] = [];
  const rowStartIndices: number[] = [];

  if (targetLayout && targetLayout.length > 0) {
    let currentIdx = 0;
    for (const count of targetLayout) {
      if (currentIdx < displayedImages.length) {
        rowStartIndices.push(currentIdx);
        rows.push(displayedImages.slice(currentIdx, currentIdx + count));
        currentIdx += count;
      }
    }
    if (currentIdx < displayedImages.length) {
      rowStartIndices.push(currentIdx);
      rows.push(displayedImages.slice(currentIdx));
    }
  } else {
    const isMultiRow = displayedImages.length > 4;
    const rowSize = isMultiRow ? Math.min(3, Math.ceil(displayedImages.length / 3)) : displayedImages.length;
    for (let i = 0; i < displayedImages.length; i += rowSize) {
      rowStartIndices.push(i);
      rows.push(displayedImages.slice(i, i + rowSize));
    }
  }

  const getFlexValue = (globalIndex: number, startOfRow: number, endOfRow: number) => {
    if (hoveredIndex === null) return 1;
    // If hovering within the same row
    if (hoveredIndex >= startOfRow && hoveredIndex < endOfRow) {
      return hoveredIndex === globalIndex ? 2.2 : 0.6;
    }
    return 1;
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 9-Card / Multi-Row Expandable Gallery Grid */}
      <div className="flex flex-col gap-4 w-full">
        <AnimatePresence initial={false}>
          {rows.map((rowItems, rowIndex) => {
            const startOfRow = rowStartIndices[rowIndex];
            const endOfRow = startOfRow + rowItems.length;

            return (
              <motion.div
                key={startOfRow}
                initial={isMobile ? { opacity: 0, height: 0, overflow: 'hidden', marginTop: -16 } : false}
                animate={isMobile ? { opacity: 1, height: 'auto', overflow: 'visible', marginTop: 0 } : { opacity: 1 }}
                exit={isMobile ? { opacity: 0, height: 0, overflow: 'hidden', marginTop: -16 } : {}}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3 h-auto sm:h-[400px] lg:h-[420px] w-full"
                style={!isMobile ? { height: "", overflow: "" } : undefined}
              >
                {rowItems.map((item, indexInRow) => {
                  const globalIndex = startOfRow + indexInRow;
                  const isHovered = hoveredIndex === globalIndex;
                  const isRowHovered = hoveredIndex !== null && hoveredIndex >= startOfRow && hoveredIndex < endOfRow;
                  const isCollapsed = isRowHovered && !isHovered;

                  const src = getImageSrc(item);
                  const { title, category } = getItemDetails(item);

                  return (
                    <motion.div
                      key={globalIndex}
                      className="relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 min-h-[380px] w-[calc(100%+1.5rem)] -ml-3 sm:min-h-0 sm:w-auto sm:ml-0"
                      style={{ flex: 1 }}
                      animate={{ flex: getFlexValue(globalIndex, startOfRow, endOfRow) }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={() => setHoveredIndex(globalIndex)}
                      onClick={() => {
                        const itemDetails = getItemDetails(item);
                        if (itemDetails.href) {
                          navigate(itemDetails.href);
                        } else {
                          openImage(globalIndex);
                        }
                      }}
                    >
                      <img
                        src={src}
                        alt={title ? `${title} by CoreSlash Technologies` : `Gallery card ${globalIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                        loading="lazy"
                      />

                      {/* Subtle Gradient Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.85)] via-[rgba(0,0,0,0.45)] to-transparent"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: isHovered ? 1 : 0.8 }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Card Content & Badge */}
                      <div className="absolute inset-0 p-4 sm:p-5 flex flex-col justify-between z-10 pointer-events-none">
                        <div className="flex justify-between items-start">
                          <span className={`px-3 py-1 font-semibold rounded-full bg-blue-900 text-white border border-blue-500 shadow-md transition-all duration-300 truncate max-w-full ${isCollapsed ? 'text-[10px]' : 'text-xs'
                            }`}>
                            {category || `Card ${globalIndex + 1}`}
                          </span>
                        </div>

                        <motion.div
                          className={`w-full rounded-2xl border border-[rgba(255,255,255,0.12)] bg-[rgba(0,0,0,0.25)] backdrop-blur-[12px] shadow-lg transition-all duration-300 ${isCollapsed ? 'p-2.5 sm:p-3' : 'p-4 sm:p-5'
                            }`}
                          animate={{ y: isHovered ? -8 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <h4 className={`font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-sm transition-all duration-300 break-words ${isHovered
                            ? 'text-xl sm:text-2xl lg:text-3xl'
                            : isCollapsed
                              ? 'text-sm sm:text-base line-clamp-2'
                              : 'text-base sm:text-lg lg:text-xl line-clamp-3'
                            }`}>
                            {title || `Gallery Item ${globalIndex + 1}`}
                          </h4>
                          {/* <p className={`text-gray-300 leading-relaxed drop-shadow-sm transition-all duration-300 ${isHovered ? 'text-[13px] sm:text-[14px] line-clamp-none' :
                          isCollapsed ? 'text-[11px] sm:text-[12px] line-clamp-2' :
                            'text-[13px] sm:text-[14px] line-clamp-2'
                          }`}>
                          {typeof item !== 'string' && item.description
                            ? item.description
                            : 'Click to expand view in full screen resolution.'}
                        </p> */}
                          <p
                            className={`text-gray-300 leading-relaxed drop-shadow-sm transition-all duration-300 ${isHovered
                              ? 'text-[12px] sm:text-[13px] line-clamp-none'
                              : isCollapsed
                                ? 'text-[9px] sm:text-[10px] line-clamp-2'
                                : 'text-[11px] sm:text-[12px] line-clamp-2'
                              }`}
                          >
                            {typeof item !== 'string' && item.description
                              ? item.description
                              : 'Click to expand view in full screen resolution.'}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile Read More / Read Less Toggle */}
      {isMobile && images.length > 4 && (
        <div className="w-full flex justify-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 rounded-full bg-slate-900 border border-border text-white text-sm font-semibold shadow-[0_4px_20px_-4px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Expanded View Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            onClick={closeImage}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-200 cursor-pointer"
              onClick={closeImage}
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-200 cursor-pointer"
                onClick={goToPrev}
                aria-label="Previous image"
              >
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}

            {/* Modal Image + Details */}
            <motion.div
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedIndex}
                src={getImageSrc(images[selectedIndex])}
                alt={`Gallery image ${selectedIndex + 1}`}
                className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />

              {/* Caption Overlay in Modal */}
              {getItemDetails(images[selectedIndex]).title && (
                <div className="mt-4 text-center text-white">
                  <h3 className="text-xl font-bold">
                    {getItemDetails(images[selectedIndex]).title}
                  </h3>
                  {getItemDetails(images[selectedIndex]).description && (
                    <p className="text-sm text-gray-300 mt-1 max-w-lg mx-auto">
                      {getItemDetails(images[selectedIndex]).description}
                    </p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all duration-200 cursor-pointer"
                onClick={goToNext}
                aria-label="Next image"
              >
                <svg
                  className="w-7 h-7 sm:w-8 sm:h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/15">
              {selectedIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpandableGallery;

// Example Usage Component with 9 Cards
export function Component() {
  return (
    <div className="min-h-screen dark:bg-black bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">9-Card Expandable Gallery</h2>
        <ExpandableGallery images={NINE_DEMO_IMAGES} />
      </div>
    </div>
  );
}
