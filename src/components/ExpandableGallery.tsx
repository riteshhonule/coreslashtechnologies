import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import appDevImg from "@/img/Services/App Development Coreslash Technologies.avif";
import websiteDevImg from "@/img/Services/Website Development Coreslash Technologies.avif";
import softwareSysImg from "@/img/Services/Software Systems Coreslash Technologies.avif";
import ecommerceImg from "@/img/Services/E-commerce Coreslash Technologies.avif";
import seoImg from "@/img/Services/SEO Optimization Coreslash technologies.avif";
import digitalMarketingImg from "@/img/Services/Digital Marketing Coreslash Technologies.avif";
import cloudDevopsImg from "@/img/Services/Cloud & DevOps Coreslash Technologies.avif";
import dataAnalyticsImg from "@/img/Services/Data Analytics Coreslash Technologies.avif";
import aiServicesImg from "@/img/Services/Services.avif";

export interface GalleryItem {
  src: string;
  title?: string;
  category?: string;
  description?: string;
}

export interface ExpandableGalleryProps {
  images: (string | GalleryItem)[];
  className?: string;
  rowLayout?: number[];
}

export const NINE_DEMO_IMAGES: GalleryItem[] = [
  {
    src: aiServicesImg,
    title: "Intelligent AI Automation",
    category: "AI & Automation",
    description: "Build AI-powered workflows, chatbots, and intelligent automation solutions that streamline business operations.",
  },
  {
    src: websiteDevImg,
    title: "Modern Web Development",
    category: "Website Development",
    description: "Responsive, high-performance, SEO-friendly websites built for speed, scalability, and business growth.",
  },
  {
    src: appDevImg,
    title: "Mobile App Development",
    category: "App Development",
    description: "Native and cross-platform mobile applications designed for exceptional performance and user experience.",
  },
  {
    src: softwareSysImg,
    title: "Custom Software Systems",
    category: "Software Systems",
    description: "Enterprise-grade software solutions tailored to automate workflows and improve operational efficiency.",
  },
  {
    src: ecommerceImg,
    title: "Scalable E-Commerce Platforms",
    category: "E-Commerce Solutions",
    description: "Secure online stores with payment gateways, inventory management, and conversion-focused experiences.",
  },
  {
    src: seoImg,
    title: "SEO & Search Growth",
    category: "SEO Optimization",
    description: "Technical SEO, on-page optimization, local SEO, and content strategies to improve search rankings.",
  },
  {
    src: digitalMarketingImg,
    title: "Performance Marketing",
    category: "Digital Marketing",
    description: "Google Ads, Meta Ads, social media marketing, and lead generation campaigns that deliver measurable results.",
  },
  {
    src: cloudDevopsImg,
    title: "Cloud & DevOps",
    category: "Cloud Infrastructure",
    description: "Secure cloud hosting, scalable infrastructure, CI/CD pipelines, monitoring, and deployment automation.",
  },
  {
    src: dataAnalyticsImg,
    title: "Business Intelligence",
    category: "Data Analytics",
    description: "Transform business data into actionable insights through dashboards, analytics, and reporting.",
  },
];

const getImageSrc = (item: string | GalleryItem): string =>
  typeof item === 'string' ? item : item.src;

const getItemDetails = (item: string | GalleryItem) => {
  if (typeof item === 'string') {
    return { title: undefined, category: undefined, description: undefined };
  }
  return item;
};

const ExpandableGallery: React.FC<ExpandableGalleryProps> = ({
  images,
  className = '',
  rowLayout,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
  const targetLayout = rowLayout || (images.length === 9 ? [4, 5] : undefined);
  const rows: (string | GalleryItem)[][] = [];
  const rowStartIndices: number[] = [];

  if (targetLayout && targetLayout.length > 0) {
    let currentIdx = 0;
    for (const count of targetLayout) {
      if (currentIdx < images.length) {
        rowStartIndices.push(currentIdx);
        rows.push(images.slice(currentIdx, currentIdx + count));
        currentIdx += count;
      }
    }
    if (currentIdx < images.length) {
      rowStartIndices.push(currentIdx);
      rows.push(images.slice(currentIdx));
    }
  } else {
    const isMultiRow = images.length > 4;
    const rowSize = isMultiRow ? Math.min(3, Math.ceil(images.length / 3)) : images.length;
    for (let i = 0; i < images.length; i += rowSize) {
      rowStartIndices.push(i);
      rows.push(images.slice(i, i + rowSize));
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
        {rows.map((rowItems, rowIndex) => {
          const startOfRow = rowStartIndices[rowIndex];
          const endOfRow = startOfRow + rowItems.length;

          return (
            <div key={rowIndex} className="flex flex-col sm:flex-row gap-3 h-auto sm:h-[400px] lg:h-[420px] w-full">
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
                    className="relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 shadow-md hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all duration-300 min-h-[300px] sm:min-h-0"
                    style={{ flex: 1 }}
                    animate={{ flex: getFlexValue(globalIndex, startOfRow, endOfRow) }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => openImage(globalIndex)}
                  >
                    <img
                      src={src}
                      alt={title || `Gallery card ${globalIndex + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
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
                        <h4 className={`font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-sm transition-all duration-300 break-words ${
                          isHovered 
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
            </div>
          );
        })}
      </div>

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
